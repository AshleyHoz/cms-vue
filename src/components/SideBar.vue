<template>
	<div class="side-bar">
		<el-row class="tac">
			<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
				<el-submenu class="item" index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>信息面板</span>
					</template>
				</el-submenu>
				<el-submenu class="item" index="2">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>文章管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item class="" index="2-1">
							<router-link to="/article/list" style="text-decoration: none;color: black;">文章列表</router-link>
						</el-menu-item>
						<el-menu-item index="2-2">
							<router-link to="/article/release" style="text-decoration: none;color: black;">发布文章</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu class="item" index="3">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>分类管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="3-1">
							<router-link to="/category/list" style="text-decoration: none;color: black;">分类列表</router-link>
						</el-menu-item>
						<el-menu-item index="3-2">
							<router-link to="" style="text-decoration: none;color: black;">添加分类</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu class="item" index="4">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>公告管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="4-1">公告列表</el-menu-item>
						<el-menu-item index="4-2">发布公告</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu class="item" index="5">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>评论管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="5-1">评论列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu class="item" index="6">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>管理员管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="6-1">
							<router-link to="/admin/list" style="text-decoration: none;color: black;">管理员列表</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu class="item" index="7">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>用户管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="7-1">
							<router-link to="/user/list" style="text-decoration: none;color: black;">用户列表</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu class="item" index="8">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>权限管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="8-1">
							<router-link to="/role/list" style="none;color: black;">权限角色</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu class="item" index="9">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>账户设置</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="9-1">
							<router-link to="/admin/set" style="color: black;">账户设置</router-link>
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>

			<!-- <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
				  <el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>信息面板</span>
					</template>
				    <el-menu-item-group>
				      <span slot="title">分组一</span>
				      <el-menu-item index="1-1">选项1</el-menu-item>
				      <el-menu-item index="1-2">选项2</el-menu-item>
				    </el-menu-item-group>
				    <el-menu-item-group title="分组2">
				      <el-menu-item index="1-3">选项3</el-menu-item>
				    </el-menu-item-group>
				    <el-submenu index="1-4">
				      <span slot="title">选项4</span>
				      <el-menu-item index="1-4-1">选项1</el-menu-item>
				    </el-submenu>
				  </el-submenu>
				  <el-menu-item index="2">
				    <i class="el-icon-menu"></i>
				    <span slot="title">导航二</span>
				  </el-menu-item>
				  <el-menu-item index="3" disabled>
				    <i class="el-icon-document"></i>
				    <span slot="title">导航三</span>
				  </el-menu-item>
				  <el-menu-item index="4">
				    <i class="el-icon-setting"></i>
				    <span slot="title">导航四</span>
				  </el-menu-item>
				</el-menu> -->
		</el-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
		},
		// computed: {
		// 	isCollapse() {
		// 		return this.$store.state.isCollapse;
		// 	}
		// }
		// 使用mapState简化:
		computed: mapState('Menu',['isCollapse'])
	}
</script>

<style lang="scss">
	.side-bar {
		width: 230px;
		margin-right: 10px;
		color: white;
		min-height: calc(100vh - 40px);

		.item {
			width: 230px;
			border-radius: 5px;
			margin-bottom: 5px;
			border: 1px solid #ddd;
			background-color: #f5f5f5;

			.router-link-active {
				color: rgb(255, 208, 75);
			}
		}
	}
</style>
