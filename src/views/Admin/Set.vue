<template>
	<div class="list">
		<div class="title">账户资料</div>
		<div class="content">
			<el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="80px">
				<el-form-item label="用户名" prop="username">
					<el-input disabled v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="form.fullname"></el-input>
				</el-form-item>
				<el-form-item label="角色" prop="role">
					<el-select v-model="form.role_name" placeholder="请选择角色">
						<el-option v-for="item in options_1st" :key="item.id" :label="item.name" placeholder="请选择角色" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="form.email"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="avatar">
					<!-- element UI规定data 绑定其他属性 -->
					<el-upload class="avatar-uploader" action="http://localhost:3000/upload/common" :headers="headers" :data="{type:'avatar'}"
					 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="form.avatar" :src="form.avatar" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<!-- <div class="cover" v-show="isShow">
						<i class="el-icon-delete-solid" @click="deleteHandle(form.avatar)"></i>
					</div> -->
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="updateInfo">保存修改</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { Admin, Category } from '@/api/index.js'
	// import { mapState } from 'vuex'
	import { createNamespacedHelpers } from 'vuex'
	let { mapState, mapActions } = createNamespacedHelpers('Admin')

	export default {
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				isShow: false,
				options_1st: [],
				form: {
					username: '',
					fullname: '',
					role: '',
					sex: '',
					tel: '',
					email: '',
					avatar: '',
					cate_1st: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入标题',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: '长度在 1 到 50 个字符',
							trigger: 'blur'
						}
					],
					nickname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 50,
							message: '长度在 1 到 50 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}, {
						min: 11,
						type: 'string',
						pattern: /^1[3456789]\d{9}$/,
						message: '长度为 11 个字符',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}, {
						type: 'string',
						pattern: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,
						trigger: 'blur'
					}],
				}
			}
		},
		created() {
			this.loadList(0);
			// this.loadInfo().then(user => {
			// 	// 对象引用数据类型，如果直接赋值就会一起更改，以为指向的是相同的堆内存，此时使用{}扩展字符串保证表单数据编辑但为点击修改时不会同步到导航栏
			// 	this.form = { ...user };
			// });
			// 技巧：去除userInfo的响应式
			this.form = { ...this.userInfo }
		},
		methods: {
			// 在Admin模块中查找
			// 取消二次请求ajax，使用插件在localStorage中进行保存
			// ...mapActions(['loadInfo']),
			async updateInfo() {
				// 解构msg， 添加消息提示
				let { status, msg } = await this.$store.dispatch('Admin/updateInfo', { ...this.form });
				if (status) {
					this.$message.success(msg);
				} else {
					this.$message.error(msg);
				}
			},
			async loadList(id) {
				let { status, data } = await Category.subCate({ id });
				if (status) {
					this.options_1st = data;
				}
				if (this.form.avatar != null) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.isShow = false;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 上传成功
			handleAvatarSuccess(res, file) {
				this.form.avatar = res.data;
				this.isShow = true;
				console.log(res, file);
			},
			async deleteHandle(src) {
				console.log(src)
				src = src.substr(1);
				let { status, msg } = await Admin.delImg({ src });
				if (status) {
					this.$message({
						message: '删除成功',
						type: 'success',
						duration: 1000,
					});
					this.form.avatar = '';
					this.isShow = false;
				} else {
					this.$message.error(msg);
					this.isShow = true;
				}
			},

		},
		computed: {
			...mapState(['userInfo']),
			// 给他return出新的对象，对象引用数据类型，此时保证表单数据编辑但为点击修改时不会同步到导航栏
			// ...mapState({
			// 	form: state => { return { ...state.userInfo } }
			// }),
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

		.content {
			padding: 0 15px;
		}

		.item {
			font-size: 16px;
			padding: 10px 15px;
		}
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.cover {
		width: 178px;
		height: 178px;
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		bottom: 11px;
		left: 50%;
		margin-top: -50%;
		margin-left: -50%;

		i {
			width: 150px;
			height: 150px;
			position: absolute;
			top: 120px;
			bottom: 0;
			left: 80px;
			right: 0;
			margin: auto;
			color: white;
		}
	}
</style>
