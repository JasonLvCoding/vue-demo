<template>
	<div class="flex" v-show="display" >
		<div class="item" @touchstart="startScroll" @touchmove="tryScroll" @touchend="endScroll">
			<ul id="test">
				<li v-for="(item, index) in dataList" :index="index">{{item[displayField]}}</li>
			</ul>
		</div>
		<div class="item" v-for="(val, childIndex) in values" v-if="childIndex < values.length-1" @touchstart="startScroll" @touchmove="tryScroll" @touchend="endScroll">
			<ul>
				<li v-for="item in getChild(val)">{{item[displayField]}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name: 'picker',
	data(){
		return {
			dataList: [{
				text: 'level1', 
				valueCode: '1', 
				children: [{
					text: 'level11', 
					valueCode: '11', 
					children: [{
						text: 'level111', 
						valueCode: '111'
					}]
				}]
			},{
				text: 'level2', 
				valueCode: '2', 
				children: [{
					text: 'level22', 
					valueCode: '22', 
					children: [{
						text: 'level222', 
						valueCode: '222'
					}]
				}]
			},{
				text: 'level3', 
				valueCode: '3', 
				children: [{
					text: 'level33', 
					valueCode: '33', 
					children: [{
						text: 'level333', 
						valueCode: '333'
					}]
				}]
			}],
			displayField: 'text',
			valueField: 'value',
			childField: 'children',
			split: '-',
			values: [],
			depth: 3,
			value: '',
			display: false,
			height: 30
		}
	},
	created(){
		//this.setValue(this.value);
	},
	methods:{
		startScroll(e){
			this.index = 0;
			this.firstScrollVal = e.touches[0].screenY; //初始位置
  			console.log(this.firstScrollVal);
			e.preventDefault();
			
		},
		tryScroll(e){
			let val = e.touches[0].screenY;
      		this.scrollY = val - this.firstScrollVal ; //拖动距离
      		
      		$(e.currentTarget).find('ul').css('transform','translateY('+ this.scrollY+'px)')
			e.preventDefault();
			
		},
		endScroll(e){
			console.log(this.scrollY);
			if(Math.abs(this.scrollY) > this.height/2){
				setTimeout(()=>{
	      			$(e.currentTarget).find('ul').css('transform','translateY(-30px)')
	      		}, 0);
				
			}else{
				//this.go(this.index + Math.ceil(this.scrollY/this.height));
			}
			
			 if (this.scrollY < 0 ) {
		        // 上滚事件
		        
		      } else {
		        // 下滚事件
		        
		      }
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
			var i = 0, values = value, source = this.dataList, currentItem;
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
		border: 1px solid #ccc;
		height: 100px;
		overflow: hidden;

	}

	.flex .item {
		flex: 1;
		height: 80px;
		border: 1px solid #ccc;
		border-width: 1px 0;
		margin-top: 10px;
		overflow: hidden;
	}

	.flex .item ul li {
		list-style: none;
		line-height: 200%;
	}
</style>