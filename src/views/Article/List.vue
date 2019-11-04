<template>
	<div id="app">
		<div class="alert">
			<div class="title">注意</div>
			<div class="txt">暂时显示全部文章，不区分版块</div>
		</div>
		<div class="list">
			<div class="title">文章列表</div>
			<div class="content">
				<template>
					<el-table :data="tableData" border style="width: 100%">
						<el-table-column prop="id" label="#" width="50">
						</el-table-column>
						<el-table-column prop="category_name" label="版块" width="140">
						</el-table-column>
						<el-table-column label="主图" prop="main_photo" width="150">
							<template slot-scope="scope">
								<el-image style="width: 100px; height: 100px" :src="scope.row.main_photo"></el-image>
							</template>
						</el-table-column>
						<el-table-column prop="title" label="标题" width="200">
						</el-table-column>
						<el-table-column prop="description" label="描述" width="200">
						</el-table-column>
						<el-table-column prop="create_time" label="发布日期" width="180">
						</el-table-column>
						<el-table-column prop="update_time" label="更新日期" width="180">
						</el-table-column>
						<el-table-column prop="operation" label="操作" width="150">
							<!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
							<!-- template slot-scope="scope"  所有自定义属性必须写到这里边路由Id才会生效 -->
							<template slot-scope="scope">
								<!-- 法一 -->
								<router-link :to="{name:'ArticleEdit',params:{id:scope.row.id}}">
									<el-button>编辑</el-button>
								</router-link>
								<!-- 法二 -->
								<!-- <el-link :href="`#/user/edit/${scope.row.id}`">
									<el-button>编辑</el-button>
								</el-link> -->
								<el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
								<!-- @click="handleDelete(scope.row.id)" -->
							</template>
						</el-table-column>
					</el-table>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import { Article } from "@/api/index.js"
	export default {
		data() {
			return {
				pagesize: 10,
				pageindex: 1,
				tableData: [],
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, data } = await Article.list({pagesize:this.pagesize, pageindex:this.pageindex});
				if (status) {
					this.tableData = data;
					this.loading = false;
				}
			},
			del(id) {
				console.log(id);
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					console.log(id);
					let { status, msg } = await Article.del({ id });
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
			},
		}
	}
</script>

<style lang="scss" scoped>
	.alert {
		width: 1240px;
		border: 1px solid transparent;
		border-radius: 4px;
		background-color: #d9edf7;
		padding: 15px;
		margin-bottom: 20px;

		.title {
			font-size: 24px;
			margin-bottom: 10px;
		}
	}

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
	}
</style>
