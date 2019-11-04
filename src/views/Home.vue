<template>
	<div class="home">
		<div class="banner"></div>
		<img alt="Vue logo" src="../assets/logo.png">
		<counter></counter>
		<hr>
		<forms></forms>
		<hr>
		<stars></stars>
	</div>
</template>

<script>
	// 此处可以写ES6代码，babel会自动转换成ES5
	// @ is an alias to /src  @是src的缩写
	import counter from '@/components/counter.vue';
	import forms from '@/components/forms.vue';
	import stars from '@/components/stars.vue'
	
	export default {
		name: 'home',
		// 挂载
		components: {
			// 局部注册
			counter,
			forms,
			stars
		}
	}
	
</script>
<!-- /* 如果好几个页面都对一个标签进行了统一定义，,可以通过在style标签上添加scoped属性使样式只对本页面生效 */ -->
<style scoped>
	.banner {
		background: url(../assets/logo.png);
		height: 200px;
	}
	h1 {
		font-size: 56px;
		color: red;
	}
</style>