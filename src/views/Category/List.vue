<template>

	<div class="list">
		<div class="title">分类列表</div>
		<div class="content">
			<!-- <span>分类列表</span> -->
			<el-tree lazy :load="loadNode" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<!-- 点击时发现触发多层，事件冒泡的原因，用.stop修饰符阻止事件冒泡 -->
						<el-button type="text" size="mini" icon="el-icon-edit" @click.stop="() => openEditModal(data)">
							编辑
						</el-button>
						<el-button type="text" size="mini" icon="el-icon-circle-plus" @click.stop="() => openInsertModal(data)">
							添加
						</el-button>
						<el-button type="text" size="mini" icon="el-icon-delete" @click.stop="() => openRemoveModal(data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>

			<!-- 添加、删除，使用模态框 -->
			<!-- 添加弹窗 -->
			<el-dialog title="添加分类" :visible.sync="insertModalShow">
				<el-form ref="insertForm" :rules="rules" :model="insertForm">
					<el-form-item label="分类名称" label-width="120px" prop="name">
						<el-input v-model="insertForm.name" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="insertModalShow = false">取 消</el-button>
					<el-button type="primary" @click="append">添 加</el-button>
				</div>
			</el-dialog>

			<!-- 编辑弹窗 -->
			<el-dialog title="编辑分类" :visible.sync="editModalShow">
				<el-form ref="editForm" :rules="rules" :model="editForm">
					<el-form-item label="分类名称" label-width="120px" prop="name">
						<el-input v-model="editForm.name" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="editModalShow = false">取 消</el-button>
					<el-button type="primary" @click="appendEdit">修 改</el-button>
				</div>
			</el-dialog>

			<!-- 删除弹窗 -->
			<el-dialog title="提示" :visible.sync="delModalShow">
				<span>您确定删除此分类？</span>
				<span slot="footer" class="dialog-footer">
					<el-button @click="delModalShow = false">取 消</el-button>
					<el-button type="primary" @click="remove">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import { Category } from '@/api/index.js'
	export default {
		data() {
			return {
				defaultProps: {
					children: 'son',
					label: 'name'
				},
				nodeData: '', //节点数据
				insertModalShow: false,
				editModalShow: false,
				delModalShow: false,
				insertForm: {
					name: '',
					parent_id: ''
				},
				editForm: {
					id: '',
					name: '',
					parent_id: '',
				},
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
				}
			};
		},
		methods: {
			//树形结构懒加载
			// 获取各级子分类
			async loadNode(node, resolve) {
				// console.log(node)
				if (node.level == 0) {
					// 根节点
					return resolve([{
						category_id: 0,
						name: '全部分类',
					}])
				}
				if (node.level > 0) {
					// 请求数据
					console.log(node)
					// 原写法
					// let id = node.data.category_id;
					// // 传参请求子分类
					// let { status, data } = await Category.subCate({ id });
					// resolve(data);

					// 修改后
					if (node.data.category_id == 0) {
						let id = node.data.category_id;
						// 传参请求子分类
						let { status, data } = await Category.subCate({ id });
						resolve(data);
					} else if (node.data.id > 0) {
						let id = node.data.id;
						// 传参请求子分类
						let { status, data } = await Category.subCate({ id });
						resolve(data);
					}
				}
			},

			// 打开添加模态框
			openInsertModal(data) { //可将data解构，只用需要的category_id
				console.log(data)
				// 转存节点数据
				this.nodeData = data;
				if (data.category_id == 0) {
					this.insertForm.parent_id = data.category_id;
				}
				if (data.id > 0) {
					this.insertForm.parent_id = data.id;
				}
				this.insertModalShow = true;
			},

			// 添加子节点
			append() {
				this.$refs.insertForm.validate(async (valid) => {
					if (valid) {
						console.log(this.nodeData)
						// 使用扩展运算符将两个参数直接传进去
						let { status, data, msg } = await Category.insert({ ...this.insertForm });
						if (status) {
							if (!this.nodeData.children) {
								this.$set(this.nodeData, 'children', [])
							}
							if (this.nodeData.category_id == 0) {
								let category_id = data.id;
								// 插入数据到子节点
								this.nodeData.children.push({ ...this.insertForm, category_id })
							} else if (this.nodeData.id > 0) {
								let id = data.id;
								// 插入数据到子节点
								this.nodeData.children.push({ ...this.insertForm, id })
							}

							// 添加到尾部  使用append就不需要上面的子节点判断
							// this.$refs.tree.append({...this.insertForm,category_id},this.node)
							// 提示插入成功
							this.$message({
								message: '插入成功',
								type: 'success',
								duration: 1000,
							});
							// 关闭模态框
							this.insertModalShow = false;
						} else {
							this.$message.error(msg);
						}
					} else {
						return false;
					}
				})
			},

			// 打开编辑模态框
			openEditModal(data) {
				this.nodeData = data;
				this.editForm.name = this.nodeData.name;
				if (data.category_id == 0) {
					// edit需要id字段，在此处添加至表单对象
					this.editForm.id = data.category_id;
					// edit需要parent_id字段，在此处添加至表单对象
					this.editForm.parent_id = data.category_id;
				}
				if (data.id > 0) {
					this.editForm.id = data.id;
					this.editForm.parent_id = data.parent_id;
				}
				// 法二  不必刷新界面
				// this.node = data;
				// this.editForm = {...data,id:data.category_id}
				this.editModalShow = true;
			},

			// 编辑节点
			appendEdit() {
				this.$refs.editForm.validate(async (valid) => {
					if (valid) {
						let { status, data, msg } = await Category.edit({ ...this.editForm });
						if (status) {
							this.nodeData.name = this.editForm.name;
							// this.node = this.editForm
							this.$message({
								message: '修改成功',
								type: 'success',
								duration: 1000,
							});
							this.editModalShow = false;
						} else {
							this.$message.error(msg);
						}
					} else {
						return false;
					}
				})
			},

			// 打开删除模态框
			openRemoveModal(data) {
				this.nodeData = data;
				this.delModalShow = true;

				// node删除  不必刷新界面
				// remove(node,data){
				// 	this.$msgbox({
				// 		type:'warning',
				// 		title:'',
				// 		message:"删除"
				// 	}).then(()=>{
				// 		Category.remove({id:data.id}).then(res => {
				// 			if(res.status){
				// 				node.remove();
				// 				this.$message.success('删除成功')
				// 			}
				// 		})
				// 	})
				// }
			},

			// 注意：删除指定id分类,如果其拥有子级分类不允许删除，必须清空子分类才可删除。
			// 删除节点
			async remove() {
				let id = this.nodeData.id;
				// 获取请求子分类
				let { status, data } = await Category.subCate({ id });
				if (data.length == 0) {
					let { status, data, msg } = await Category.del({ id });
					if (status) {
						this.$message({
							message: '删除成功',
							type: 'success',
							duration: 1000,
						});
						this.delModalShow = false;
					} else {
						this.$message.error(msg)
					}
				} else {
					alert('该分类下含有子分类，无法删除，请先清空子分类！');
				}
			},
		}
	};
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

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
