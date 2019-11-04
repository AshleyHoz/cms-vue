<template>
	<div class="model">
		<ul class="start">
			<li v-for="(item,index) in lists" @mouseover="mouseHandle(index)">
				<a href="javascript:;" :title='item.id'>
					<i class="icon icondark"></i>
					<i class="icon iconlight" v-show="item.isShow"></i>
				</a>
			</li>
		</ul>
		<ul>
			<li v-for="(item,index) in describes">
				<p v-show="item.isOpen">{{item.txt}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data:function () {
			return {
				describes:[
					{txt:"非常差，回去再练练",isOpen:false},
					{txt:"真的是差，都不忍心说你了",isOpen:false},
					{txt:"一般，还过得去吧",isOpen:false},
					{txt:"很好，是我想要的东西",isOpen:false},
					{txt:"太棒了，此物只应天上有，人间哪得几回闻",isOpen:false},
				],
				lists:[
					{id:1,isShow:false,},
					{id:2,isShow:false,},
					{id:3,isShow:false,},
					{id:4,isShow:false,},
					{id:5,isShow:false,},
				]
			}
		},
		methods: {
			mouseHandle:function (i) {
				this.lists.forEach((item,index)=> {
					if(index<=i){
						this.lists[index].isShow = true;
					}else{
						this.lists[index].isShow = false
					}
					if(index == i){
						this.describes[index].isOpen = true;
					}else{
						this.describes[index].isOpen = false;
					}
				})
			}
		}
	}
</script>

<style>
	.icon {
		background: url(../assets/123.png) no-repeat;
		display: inline-block;
	}
	
	.icondark {
		background-position: 0 0;
		width: 21px;
		height: 21px;
	}
	
	.iconlight {
		background-position: 0 -25px;
		width: 21px;
		height: 21px;
	}
	
	.model {
		padding: 50px;
		margin: 0 auto;
		text-align: center;
		border: 1px solid #333;
		width: 500px;
		min-height: 100px;
	}
	
	.start {
		width: 100%;
		height: 21px;
		padding: 20px 0;
		display: flex;
		justify-content: center;
	}
	.model ul li{
		list-style: none;
		
	}
	.start a {
		display: inline-block;
		width: 21px;
		height: 21px;
		position: relative;
	}
	
	.start a i {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
