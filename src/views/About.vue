<template>
	<div class="about">
		<h1>This is an about page</h1>
		<button type="button" @click="isShow=true">确定</button>
		<alert :show="isShow" @close="closeAlert" content="">
			<template v-slot:title>
				<h3>alert标题</h3>
			</template>
			<template v-slot:content>
				<ul>
					<li>黄小米</li>
					<li>黄渤</li>
					<li>张艺兴</li>
					<li>黄磊</li>
				</ul>
			</template>
		</alert>
	</div>
</template>

<script>
	import alert from '@/components/alert.vue'
	export default {
		name: 'about',
		data() {
			return {
				isShow: false
			}
		},
		components: {
			alert
		},
		methods: {
			closeAlert() {
				this.isShow = false;
			}
		}
	}
</script>

<!-- /* 如果好几个页面都对一个标签进行了统一定义，,可以通过在style标签上添加scoped属性使样式只对本页面生效 */ -->
<style scoped>
	h1 {
		color: blue;
	}
</style>
