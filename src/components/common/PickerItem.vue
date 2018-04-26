<template>
    <div  @touchstart.prevent="startScroll" @touchmove.prevent="tryScroll" @touchend.prevent="endScroll">
        <ul>
            <li v-for="(item, index) in data" :class="{'selected':selectedIndex==index}">{{item[displayField]}}</li>
        </ul>
    </div>
</template>
<script>

    export default {
        name:'pickerItem',
        components:{

        },
        data(){
            return {
                selectedIndex: 0,
                scroll: 0,
                _scroll: 0
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props:{
            depth: Number,
            data: {
                type:Array,
                default(){
                    return [];
                }
             },
             displayField:{
                 type: String,
                 default: 'text'
             },
             valueField:{
                 type: String,
                 default: 'valueCode'
             },
            childField:{
                type: String,
                default: 'children'
            },
            height: {
                type:Number,
                default:30
            },
            value: String
        },
        watch:{
            value(newVal, oldVal){
                if(newVal == oldVal) return;
                this.selectItem(newVal);
            }
        },
        methods: {
            init(){
                this.selectItem(this.value);
            },
            startScroll(e){
                this.firstScrollVal = e.touches[0].screenY; //初始位置
                e.preventDefault();
            },
            tryScroll(e){
                let val = e.touches[0].screenY, element = $(e.currentTarget).find('ul');
                this.scroll = val - this.firstScrollVal + this.getScroll(); //拖动距离
                this.scrollTo(this.scroll);
                e.preventDefault();
                
            },
            getScroll(){
                return this._scroll;
            },
            scrollTo(top){
                $(this.$el).find('ul').css('transform', 'translateY(' + top + 'px)')

            },
            endScroll(e){
                var element = $(this.$el).find('ul'), 
                startPos = this.getScroll(),
                offset = this.scroll-startPos;
                
                if(Math.abs(offset) > this.height/2){
                    
                    this.scroll = startPos + Math.ceil(offset/this.height)* this.height;
                }else{
                    this.scroll = startPos;
                }
                if(this.scroll>0){
                    
                    this.scroll=0;
                }

                if(this.scroll < -element.height() + this.height ){
                    this.scroll = -element.height()+ this.height;
                }
                this.selectedIndex = Math.abs(this.scroll/this.height);
               
                this.scrollTo(this.scroll);
                this._scroll = this.scroll;
                this.notify();
                this.scroll = 0;
                
            },
            getFirst(source){
                if(!source || source.length == 0) return null;
                return source[0];
            },
            notify(){
                var item = this.data[this.selectedIndex],
                    value = item && item[this.valueField];
                if(value == this.value) return;
                this.$emit('change', value);
                this.$emit('sourcechange', this.depth);
            },
            selectItem(value){
                if(!value) {
                    this._scroll = this.scroll = 0;
                    return ;
                }
                console.log(value);
                this.selectedIndex = this.data.findIndex((item)=>item[this.valueField] == value);
                this.scroll = this._scroll =  -this.selectedIndex*this.height;
                this.scrollTo(this.scroll);
            }
        }
    }
</script>

<style>

</style>