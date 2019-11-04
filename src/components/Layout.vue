<template>
	<div>
		<!-- 头部 -->
		<NavBar></NavBar>
		<!-- container -->
		<div class="container">
			<!-- 侧边栏 -->
			<SideBar></SideBar>
			<!-- 内容 -->
			<div class="main">
				<router-view></router-view>
			</div>
		</div>
	</div>
	
</template>

<script>
		import NavBar from '@/components/NavBar.vue'
		import SideBar from '@/components/SideBar.vue'
		
		export default {
			components:{
				NavBar,
				SideBar,
			}
		}
</script>

<style>
</style>
