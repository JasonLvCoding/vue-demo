<template>
 <div class="modal-picker" v-show="display" >
   
    <div class="bottomFix">
        <div class="top-fix"><span class="cancle"  @click.prevent="closeModal">取消</span><span class="btn-fix"  @click.prevent="confirm">确定</span></div>
        <div class="flex"  >
            <picker-item ref="pickerItem" class="item" :data="source" :depth="index" v-model="values[index]" v-for="(source,index) in sources" @sourcechange="handleChange"></picker-item>
            <div class="focus-frame"></div>
        </div>
    </div>
    </div>
</template>
<script>
// import cityData from '@/utils/cityData.js'
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
    		type: String,
    		default(){
    			return '';
    		}
    	},
        depth: {
            type: Number,
            default:3
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data(){
        return {
            data: [],
            displayField: 'text',
            valueField: 'valueCode',
            childField: 'children',
            split: '-',
            values: [],
            sources: [],
            height: 30,
            display: false  
        }
    },
    mounted(){
        this.setValue(this.value);
    },
    watch: {
        value: function(value){
            this.setValue(value);
        },
        values: function(val){
        	console.info('values changed', val);
        }
    },
    methods:{
        showModal(){
          this.display = true; 
          console.log(this.$refs);
          setTimeout(()=>{
            this.$refs.pickerItem.forEach((pickerItem)=>{
                pickerItem.init();
            })
          }, 0)
          
        },
        closeModal(){
           this.display = false;
        },
        confirm(){
            var result;
        	if(this.valueProps.length > 0){
                result = {}
        		this.valueProps.forEach((prop, index)=>{
        			result[prop] = this.values[index];
        		});
        	}else{
        		result = this.values.join(this.split);
        	}
            this.$emit('change', result);
            this.closeModal();
        },
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
            console.log(typeof value);
            if(typeof value == 'string'){
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
                //无数据情况
                source = currentItem && currentItem[this.childField];
                this.values[i] = currentItem　&&　currentItem[this.valueField];
                i++;
            }
            
        }
    }
}
</script>
<style>
    .modal-picker{
        z-index: 10000;
        position: fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background: rgba(0,0,0,0.7);
        transition: opacity .15s linear;
        opacity: 1;
    }
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
        z-index: 10006;
    }
    .flex .item ul{ 
        margin-top: 0px;
    }
    .flex .item ul li {
        list-style: none;
        line-height: 200%;
        color: #ccc;
        height: 30px;
        text-overflow: ellipsis;
        overflow: hidden
    }
    .focus-frame {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        border: 1px solid #ccc;
        border-width: 1px 0;
        height: 30px;
        z-index: 10005;
    }
    .flex .item ul li.selected {
        font-size:18px;
        color:#000;
        
    }
    .bottomFix {
        padding:0 8px;
        box-sizing:border-box;
        bottom:0;
        left:0;
        right:0;
        width:100%;
        max-width: 750px;
        height: 240px;
        background-color:#fff;
        position: absolute;
    }
    .top-fix {
        overflow:hidden;
    }
    .top-fix span {
        display:inline-block;
        z-index: 10006;
    }
    .btn-fix {
        
        float:right;
    }
    .cancle {
        float:left;
    }
</style>