<template>
	<div class="list">
		<div class="title">
			<div class="fl">管理员角色</div>
			<div class="fr">
				<el-button @click="add">
					<i class="el-icon-circle-plus-outline"></i>
					添加角色
				</el-button>
			</div>
			<div class="clear"></div>
		</div>
		<div class="content">
			<!-- v-loading="loading"  loading效果 -->
			<el-table class="item" :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#" width="400">
				</el-table-column>
				<el-table-column prop="name" label="分类" width="400">
				</el-table-column>
				<el-table-column label="操作" width="400">
					<template slot-scope="scope">
						<el-button @click="edit(scope.row.id,scope.row.name)">编辑</el-button>
						<el-button type="danger" size="mini" @click="open(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog title="编辑角色" :visible.sync="show">
			<el-form :model="tableData" ref="tableData" :rules="rules">
				<el-form-item prop="name" label="角色名称" label-width="300">
					<el-input v-model="tableData.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="show = false">取 消</el-button>
				<el-button type="primary" @click="submit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Role } from '@/api/index.js'

	export default {
		data() {
			return {
				tableData: [{
					name: ''
				}],
				rules: {
					name: [{
							required: true,
							message: '请输入分类名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
				},
				show: false,
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, data } = await Role.list();
				if (status) {
					this.tableData = data;
					this.loading = false;
				}
			},
			open(id) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					console.log(id);
					let { status, msg } = await Role.del({ id: id });
					if (status) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.loadList();
						this.loading = false;
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			add() {
				this.$prompt('请输入角色名称', '添加角色', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^[\u4e00-\u9fa5_a-zA-Z]+$/,
					inputErrorMessage: '角色格式不正确'
				}).then(async ({ value }) => {
					let name = value;
					let { status, data } = await Role.add({ name: name });
					if (status) {
						this.$message({
							type: 'success',
							message: '角色添加成功'
						});
						this.loadList();
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消添加'
					});
				});

			},
			edit(id, name) {
				this.show = true;
				this.tableData.name = name;
			},
			submit() {
				this.$refs.tableData.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Role.update({ id: id, name: this.tableData.name });
						if (status) {
							this.tableData.name = name;
							this.$message({
								type: 'success',
								message: '编辑成功!'
							});
							this.loadList();
							this.loading = false;
							this.show = false;
						} else {
							this.$message.error(msg);
						}
					} else {
						return false;
					}
				})
			},
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

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.clear {
		clear: both;
	}
</style>
