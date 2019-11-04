<template>
	<div class="counter-box">
	<button class="btn left" type="button" @click="reduceHandle" :disabled="count==1" > - </button>
	<input class="num" type="text" v-model="count"/>
	<button class="btn right" type="button" @click='count++'> + </button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				count: 1
			}
		},
		methods: {
			reduceHandle() {
				if (this.count > 1) {
					this.count--;
				}
			}
		}
	}
</script>

<style>
	.left {
		border: 1px solid #e3e3e3;
		background-color: transparent;
		width: 50px;
		border-top-left-radius: 3px;
		border-bottom-left-radius: 3px;
		font-size: 14px;
		border-right: 0px solid transparent;
	}
	
	.right {
		border: 1px solid #e3e3e3;
		background-color: transparent;
		width: 50px;
		border-top-right-radius: 3px;
		border-bottom-right-radius: 3px;
		width: 50px;
		border-left: 0px solid transparent;
	}
	
	.num {
		max-width: 60px;
		text-align: center;
		font-size: 14px;
		outline: none;
	}
	
	.counter-box {
		display: flex;
	}
	
</style>
