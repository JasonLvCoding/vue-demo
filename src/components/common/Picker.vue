<template>
    <div class="flex" v-show="display" >
        <!--<div class="item" @touchstart="startScroll" @touchmove="tryScroll" @touchend="endScroll">
            <ul id="test">
                <li v-for="(item, index) in data" :class="{'selected':selectedIndex==index}">{{item[displayField]}}</li>
            </ul>
        </div>-->
        <picker-item class="item" :data="source" :depth="index" v-model="values[index]" v-for="(source,index) in sources" @sourcechange="handleChange"></picker-item>
       
        <div class="focus-frame"></div>
    </div>
</template>
<script>
import cityData from '@/utils/cityData.js'
import pickerItem from '@/components/common/PickerItem.vue'
export default {
    components:{
        pickerItem
    },
    name: 'picker',
    props: {
    	valueProps: {
    		type: Array,
    		default(){
    			return [];
    		}
    	},
    	value: {
    		type: Object,
    		default(){
    			return {};
    		}
    	}
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data(){
        return {
            data: cityData,
            displayField: 'text',
            valueField: 'valueCode',
            childField: 'children',
            split: '-',
            values: [],
            sources: [],
            depth: 3,
            display: false,
            height: 30       
        }
    },
    created(){
        this.setValue(this.value);
    },
    watch: {
        values: function(val){
        	var result = {};
        	if(this.valueProps.length > 0){
        		this.valueProps.forEach((prop, index)=>{
        			result[prop] = val[index];
        		});
        	}else{
        		result.value = val.join(this.split);
        	}
            this.$emit('change', result);
        }
    },
    methods:{
    	handleChange(depth){
    		var currentItem, source;
    		while(depth < this.depth){
    			source =  this.sources[depth];
    			currentItem = source.find(item=>item[this.valueField]==this.values[depth]);
    			if(currentItem == null){
    				currentItem = this.getFirst(source);
    				this.values[depth] = currentItem[this.valueField];
    			}
    			depth++;
    			if(depth < this.depth){
    				this.sources[depth] = this.getChild(currentItem);
    			}
    		}	
    	},
        show(){
            this.setValue(this.value, true);
            this.display = true;
        },
        getChild(item){
            if(item == null) return [];
            return item[this.childField];
        },
        getItem(source, value){
            if(!value) return null; 
            if(!source || source.length == 0) return null;
            return source.find(item=>item[this.valueField]==value);
        },
        getFirst(source){
            if(!source || source.length == 0) return null;
            return source[0];
        },
        setValue(value){
            var i = 0, values = value, source = this.data, currentItem;
            if(typeof value == 'String'){
                values = value.split(this.split);
            }
            while(i < this.depth){
            	if(!source) break;
            	if(!this.sources[i] && i==0 || i > 0){
            		this.sources[i] = source;
            	}
            	
                currentItem = this.getItem(source, values[i]);
                if(currentItem == null){
                    currentItem = this.getFirst(source);
                }
                source = currentItem[this.childField];
                this.values[i] = currentItem[this.valueField];
                i++;
            }
            console.log(this.values);
        }
    }
}
</script>
<style>
    .flex {
        display: flex;
        justify-content: space-around;
        border: none;
        height: 100%;
        overflow: hidden;
        padding: 0;
    }

    .flex .item {
        flex: 1;
        height: auto;
        margin-top: 100px;
        z-index: 1001
    }

    .flex .item ul{ 
        margin-top: 0px;
    }
    .flex .item ul li {
        list-style: none;
        line-height: 200%;
        color: #ccc;
        height: 30px;
    }

    .focus-frame {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        border: 1px solid #ccc;
        border-width: 1px 0;
        height: 30px;
        z-index: 1000;
    }
    .flex .item ul li.selected {
        font-size:18px;
        color:#000;
    }

</style>