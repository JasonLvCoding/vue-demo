<template>
    <div  @touchstart="startScroll" @touchmove="tryScroll" @touchend="endScroll">
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
            data: {
                type:Array,
                default:[]
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
        mounted (){
            console.log(this.value);
            this.init();
            
        },
        methods: {
            init(){
                this.selectItem(this.value);
            },
            setItem(selectedItem){
                this.values[0] = selectedItem;
                console.log(this.values);
            },
            startScroll(e){
                this.index = 0;
                this.firstScrollVal = e.touches[0].screenY; //初始位置
                console.log(this.firstScrollVal);
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
                console.log('start at', startPos);       
                console.log('end at ', this.scroll);

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
                this.$emit('change', value);
            },
            selectItem(value){
                if(!value) {
                    return ;
                }
                this.selectedIndex = this.data.findIndex((item)=>item[this.valueField] == value);
                this.scroll = this._scroll =  -this.selectedIndex*this.height;
                this.scrollTo(this.scroll);
            }
        }
    }
</script>

<style>

</style>