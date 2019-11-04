<template>
	<div class="nav-bar">
		<div class="admin">
			<div class="title">
				CMS管理系统
			</div>
			<i class="el-icon-s-grid" @click="toggle" style="float: left;margin-left: 10px;line-height: 24px;"></i>
			<el-dropdown class="self">
				<span class="el-dropdown-link" @click="acountHandle">
					{{userInfo.fullname}}
					<span>▼</span>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item class="item">
						<router-link to="/admin/set" style="text-decoration: none;">账户设置</router-link>
					</el-dropdown-item>
					<el-dropdown-item>
						<router-link to="" style="text-decoration: none;">收到的评论</router-link>
					</el-dropdown-item>
					<el-dropdown-item>
						<router-link to="" style="text-decoration: none;">退出账户</router-link>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-avatar :src="userInfo.avatar" style="float: right;"></el-avatar>
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapState, mapActions } from 'vuex'

	export default {
		data() {
			return {
				isShow: false,
			}
		},
		created() {
			this.loadInfo().then(user => {
				this.$message({
					message: `欢迎${user.role_name}: ${user.username}`,
					type: 'success',
					duration: 2000,
				})
			});
		},
		methods: {
			acountHandle() {
				this.isShow = !this.isShow;
			},

			// toggle() {
			// 	this.$store.commit('collapseMenu');
			// },
			// 使用对象展开运算符+mapMutations方法简化：
			...mapMutations('Menu', {
				toggle: 'collapseMenu'
			}),
			// ...mapMutations('Menu',['collapseMenu']),

			// 获取右上角用户头像、用户名
			// async loadInfo() {
			// 	// 获取用户数据
			// 	this.$store.dispatch('loadInfo')
			// },
			// 使用对象展开运算符+mapActions方法简化：
			...mapActions('Admin', ['loadInfo']),
		},
		computed: {
			isCollapse() {
				return this.$store.state.isCollapse;
			},
			// ...mapState('Menu',['isCollapse']),
			// 调用mapState方法将仓库中的userInfo拿出来当做对象使用
			...mapState('Admin', ['userInfo']),

		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		height: 40px;
		background-color: black;
		color: #9d9d9d;
		font-size: 18px;
		padding: 10px 10px 0;
		cursor: pointer;
		margin-bottom: 2px;

		.title {
			float: left;

			&:hover {
				color: white;
			}
		}

		.self {
			float: right;
			font-size: 16px;
			line-height: 32px;
			padding-left: 10px;

			.el-dropdown-link {
				cursor: pointer;

				&:hover {
					color: white;
				}

				.el-icon-arrow-down {
					font-size: 14px;
					color: black;
				}
			}
		}
	}
</style>
