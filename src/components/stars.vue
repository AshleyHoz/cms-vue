<template>
	<div class="star-box">
		<!-- n数量 -->
		<div v-for="(item,index) in star" :class="{'on':hover>=index}" @mouseenter="enterHandle(index)" @mouseleave="leaveHandle"
		 @click="downHandle(index)" :title="item"></div>
		 <p class="description">{{description}}</p>
		 
		 <!-- <li v-for="(item,index) in des">
			<p class="description" v-show="item.show"></p>
		 </li> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				hover: -1,
				flag: false, //鼠标点击后变成true，鼠标进入进出事件就不会改变背景图
				star: [1,2,3,4,5],
					// {
					// 	id:1,
					// 	open:false
					// },
					//  {
					//  	id:2,
					//  	open:false
					//  },
					//   {
					//   	id:3,
					//   	open:false
					//   },
					//   {
					//   	id:4,
					//   	open:false
					//   },
					//   {
					//   	id:5,
					//   	open:false
					//   }
				description: '',
				// des: [{
				// 		id: 1,
				// 		text: "非常差，回去再练练",
				// 		show: false
				// 	},
				// 	{
				// 		id: 2,
				// 		text: "真的是差，都不忍心说你了",
				// 		show: false
				// 	},
				// 	{
				// 		id: 3,
				// 		text: "一般，还过得去吧",
				// 		show: false
				// 	},
				// 	{
				// 		id: 4,
				// 		text: "很好，是我想要的东西",
				// 		show: false
				// 	},
				// 	{
				// 		id: 5,
				// 		text: "太完美了，此物只得天上有，人间哪得几回闻!",
				// 		show: false
				// 	}
				// ],
			}
		},
		methods: {
			enterHandle(i) {
				if (!this.flag) {
					this.hover = i;
					console.log(i)
					if (i == 0) {
						this.description = "非常差，回去再练练";
					} else if (i == 1) {
						this.description = "真的是差，都不忍心说你了";
					} else if (i == 2) {
						this.description = "一般，还过得去吧";
					} else if (i == 3) {
						this.description = "很好，是我想要的东西";
					} else if (i == 4) {
						this.description = "太完美了，此物只得天上有，人间哪得几回闻!";
					}
					// this.star.forEach((item,index) => {
					// 	// if(index<=i){
					// 	// 	this.star[index].isShow = true;
					// 	// }else{
					// 	// 	this.star[index].isShow = false
					// 	// }
					// 	if(index == i){
					// 		this.description[index].show = true;
					// 	}else{
					// 		this.description[index].show = false;
					// 	}
					// })
				}
			},
			leaveHandle() {
				if (!this.flag) {
					this.hover = -1;
					this.description = '';
				}
			},
			downHandle(i) {
				this.flag = true;
				this.hover = i;
				if (i == 0) {
					this.description = "当前您的评价为：非常差，回去再练练";
				} else if (i == 1) {
					this.description = "当前您的评价为：真的是差，都不忍心说你了";
				} else if (i == 2) {
					this.description = "当前您的评价为：一般，还过得去吧";
				} else if (i == 3) {
					this.description = "当前您的评价为：很好，是我想要的东西";
				} else if (i == 4) {
					this.description = "当前您的评价为：太完美了，此物只得天上有，人间哪得几回闻!";
				}
			}
		}
	}
</script>

<style>
	.star-box {
		width: 300px;
		height: 100px;
		margin: 80px auto;
		border: 1px solid #E3E3E3;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
		text-align: center;
	}

	.star-box div {
		width: 25px;
		height: 20px;
		/* float: left; */
		display: inline-block;
		margin-top: 20px;
		background: url(../assets/123.png) no-repeat;
	}

	div.on {
		background: url(../assets/123.png) 0 -25px no-repeat;
	}

	p {
		font-size: 14px;
	}

	/* .stars {
		width: 80px;
		height: 20px;
		position: relative;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: 0 auto;
		background: url(../assets/123.png) repeat-x;
		cursor: pointer;
	} */

	/* li a {
		display: block;
		position: absolute;
		width: 24px;
		height: 20px;
		z-index: 10;
		overflow: hidden;
	}

	li a:hover {
		background: url(../assets/123.png) 0 -25px repeat-x;
		left: 0;
		/* ！！划重点：此处hover的层必须比a的层低，这样才能够实现划入划出的切换，如果层级一样或者层级比a高或者此处不设置，都会导致只能划入不能划出 */
	/* 	z-index: 5;
	}

	.star_1st {
		left: 0;
	}

	.star_1st:hover {
		width: 24px;
	}

	.star_nd {
		left: 24px;
	}

	.star_nd:hover {
		width: 48px;
	}

	.star_thd {
		left: 48px;
	}

	.star_thd:hover {
		width: 72px;
	}

	.star_fth {
		left: 72px;
	}

	.star_fth:hover {
		width: 96px;
	}

	.star_fith {
		left: 96px;
	}

	.star_fith:hover {
		width: 120px;
	}

	.description {
		bottom: 0;
		margin-bottom: 10px;
	} */
</style>
