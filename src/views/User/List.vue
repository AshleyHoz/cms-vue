<template>
	<div class="list">
		<div class="title">用户列表</div>
		<div class="content">
			<!-- v-loading="loading"  loading效果 -->
			<el-table class="item" :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#" width="150">
				</el-table-column>
				<el-table-column prop="username" label="姓名" width="150">
				</el-table-column>
				<el-table-column prop="nickname" label="昵称" width="150">
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="150">
				</el-table-column>
				<el-table-column prop="tel" label="手机" width="150">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<!-- *****属性绑定问题：动态数据应用属性绑定的方法进行绑定，前面加 ： 
					死数据直接写属性就可以，不用加 ：-->
					<!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
					<!-- template slot-scope="scope"  所有自定义属性必须写到这里边路由Id才会生效 -->
					<template slot-scope="scope">
						<!-- 法一 -->
						<router-link :to="{name:'UserEdit',params:{id:scope.row.id}}">
							<el-button>编辑</el-button>
						</router-link>
						<!-- 法二 -->
						<!-- <el-link :href="`#/user/edit/${scope.row.id}`">
							<el-button>编辑</el-button>
						</el-link> -->

						<el-button type="danger" size="mini" @click="open(scope.row.id)">删除</el-button>
						<!-- @click="handleDelete(scope.row.id)" -->
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import { User } from '@/api/index.js'

	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, data } = await User.list();
				if (status) {
					this.tableData = data;
					this.loading = false;
				}
			},
			open(id) {
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					console.log(id);
					let { status, msg } = await User.del({ id });
					if (status) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.loading = false;
						this.loadList();
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		width: 1250px;
		border: 1px solid #337ab7;
		border-radius: 5px;

		.title {
			font-size: 16px;
			width: 1220px;
			color: white;
			background-color: #337ab7;
			padding: 10px 15px;
		}

		.item {
			font-size: 16px;
			padding: 10px 15px;
		}
	}
</style>
