<template>
    <div class="flex" v-show="display" >
        <!--<div class="item" @touchstart="startScroll" @touchmove="tryScroll" @touchend="endScroll">
            <ul id="test">
                <li v-for="(item, index) in data" :class="{'selected':selectedIndex==index}">{{item[displayField]}}</li>
            </ul>
        </div>-->
        <picker-item class="item" :data="data" v-model="valueObj[prop]" v-for="(prop,propIndex) in valueProps"></picker-item>
        <div class="item" v-for="(val, childIndex) in values" v-if="childIndex < values.length-1" @touchstart="startScroll" @touchmove="tryScroll" @touchend="endScroll">
            <ul>
                <li v-for="item in getChild(val)">{{item[displayField]}}</li>
            </ul>
        </div>
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
    data(){
        return {
            data: cityData,
            displayField: 'text',
            valueField: 'value',
            childField: 'children',
            split: '-',
            values: [],
            depth: 2,
            value: '',
            display: false,
            height: 30,
            selectedIndex:0,
            valueProps: ['province', 'city', 'dist'],
            valueObj:{
                province: '3',
                city: '3',
                dist: '3'
            },
            
        }
    },
    created(){
        this.setValue(this.value, true);
    },
    watch: {
        'valueObj.province': function(val){
            console.info('value changed', val);
        }
    },
    methods:{
        startScroll(e){
            this.index = 0;
            this.firstScrollVal = e.touches[0].screenY; //初始位置
            console.log(this.firstScrollVal);
            e.preventDefault();
            
        },
        tryScroll(e){
            let val = e.touches[0].screenY, element = $(e.currentTarget).find('ul');
            this.scrollY = val - this.firstScrollVal + this.getScroll(element); //拖动距离
            this.scrollTo(element, this.scrollY);
            e.preventDefault();
            
        },
        getScroll(element){
            return element.data('top') || 0;
        },
        scrollTo(element, top){
            element.css('transform', 'translateY(' + top + 'px)')

        },
        endScroll(e){
            var element = $(e.currentTarget).find('ul'), 
              startPos = this.getScroll(element),
              offset = this.scrollY-startPos;
            
            if(Math.abs(offset) > this.height/2){
                
                this.scrollY = startPos + Math.ceil(offset/this.height)* this.height;
            }else{
                this.scrollY = startPos;
            }
            if(this.scrollY>0){
                
                this.scrollY=0;
            }

            if(this.scrollY < -element.height() + this.height ){
                this.scrollY = -element.height()+ this.height;
            }
            console.log('start at', startPos);       
            console.log('end at ', this.scrollY);

            this.selectedIndex = Math.abs(this.scrollY/this.height);
            this.setItem(this.data[this.selectedIndex])
            this.scrollTo(element, this.scrollY);
            element.data('top', this.scrollY)
            this.scrollY = 0;
        },



        go(){

        },
        show(){
            this.setValue(this.value, true);
            this.display = true;
        },
        isArray(value){
            return typeof value == 'object' 
            && Object.prototype.toString.apply(value) == '[object Array]';

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
        setValue(value, autoFill){
            var i = 0, values = value, source = this.data, currentItem;
            if(typeof value == 'String'){
                values = value.split(this.split);
            }
            while(i < this.depth){
                currentItem = this.getItem(source, values[i]);
                if(currentItem == null && autoFill){
                    currentItem = this.getFirst(source);
                }
                source = currentItem[this.childField];
                this.values.push(currentItem);
                console.log(currentItem);
                i++;
            }
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