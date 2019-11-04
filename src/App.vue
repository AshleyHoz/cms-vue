<template>
	<div id="app">
		<!-- <div class="container">
			<div class="nav" id="nav"> -->
				<!-- to 表示跳转到哪个路由 -->
				<!-- exact 表示激活当前连接时，其他的路径不会被匹配，不会添加router-link-active类名 -->
				<!-- <router-link to="/" exact>Home</router-link> |
				<router-link to="/about" exact>About</router-link> |
				<router-link to="/form" exact>Form</router-link> |
				<router-link to="/star" exact>Star</router-link> |
				<router-link to="/login" exact>Login</router-link>
			</div>
			<router-view />
		</div> -->
		<!-- 头部 -->
		<!-- <NavBar></NavBar> -->
		<!-- container -->
		<!-- <div class="container"> -->
			<!-- 侧边栏 -->
			<!-- <SideBar></SideBar> -->
			<!-- 内容 -->
			<!-- <div class="main"> -->
				<router-view></router-view>
			<!-- </div> -->
		<!-- </div> --> 
		<!-- 登录页问题*** -->
		<!-- 将刚刚写的内容独立出去到layout页面中，app.vue只放router-view标签 -->
	</div>
</template>

<script>
	import NavBar from '@/components/NavBar.vue'
	import SideBar from '@/components/SideBar.vue'
	import Layout from '@/components/Layout.vue'
	
	export default {
		components:{
			NavBar,
			SideBar,
			Layout
		}
	}
</script>

<!-- 使用SASS style标签上加lang="scss" -->
<style lang="scss">
	/* 公共类 */
	body {
		margin: 0;
	}
	.container {
		// width: 1200px;
		// margin: 0 auto;
		
		display: flex;
		.main {
			// 自适应
			flex: 1;
		}
	}

	// .nav {
	// 	text-align: center;
	// 	padding: 20px 0;
	// 	a {
	// 		color: #333;
	// 		text-decoration: none;
	// 		// 链接激活时发生的变化
	// 		&.router-link-active{
	// 			color: #0000FF;
	// 		}
	// 	}
	// }
	
	// h1 {
	// 	font-size: 28px;
	// 	color: #333333;
	// }
</style>
