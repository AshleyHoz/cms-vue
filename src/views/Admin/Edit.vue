<template>
	<div class="list">
		<div class="title">编辑管理员</div>ID:{{$route.params.id}}<!-- //获取ID测试 -->
		<div class="content">
			<el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="80px">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="form.fullname"></el-input>
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
					<el-upload class="avatar-uploader" action="/upload/common/" :headers="header" :data="{type:'avatar',imgForm:'imgForm'}"
					 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="form.avatar" :src="form.avatar" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="cover" v-show="isShow">
						<i class="el-icon-delete-solid" @click="deleteHandle(form.avatar)"></i>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitHandle">保存修改</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { Admin } from '@/api/index.js'
	import axios from 'axios'
	
	export default {
		props: ['id'],
		data() {
			return {
				header:{
					Authorization:`Bearer ${sessionStorage.token}`
				},
				isShow: false,
				form: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					email: '',
					avatar: ''
				},
				// imgForm: {
				// 	token: '',
				// 	key: ''
				// },
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 8,
							message: '长度在 3 到 8 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}, {
						min: 3,
						max: 8,
						message: '长度在 3 到 8 个字符',
						trigger: 'blur'
					}],
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
			let id = this.$route.params.id;
			console.log(id)
			// 路由传参
			this.loadInfo(id);
		},
		methods: {
			// ajax传数据
			async loadInfo(id) {
				// ***问题1：返回的data中没有email字段
				let { status, data } = await Admin.info({ id: this.id });
				console.log(data)
				if (status) {
					this.form = data;
					this.loading = false;
					// 图片传过来时avatar若不为空，应显示删除按钮
					if (data.avatar != null) {
						this.isShow = true;
					} else {
						this.isShow = false;
					}
				}
			},
			// 图片格式
			async beforeAvatarUpload(file) {
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

				// let fileType = file.type == 'image/jpeg' ? 'jpg' : 'png'; //获取拓展名
				// let res = await this.axios.get(`http://localhost:3000/api/`) //后台控制器位置
				// this.imgForm = {
				// 	ket: `${uuidv1()}.${fileType}`, //文件名
				// 	token: res.data
				// }

			},
			// 上传成功
			handleAvatarSuccess(res, file) {
				this.form.avatar = res.data;
				this.isShow = true;
				console.log(res, file);
			},
			async deleteHandle(src) {
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
			submitHandle() {
				// 提取数据
				let data = { ...this.form };
				// 插入id
				data.id = this.id;
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Admin.infos(data);
						if (status) {
							this.form = data;
							this.$message({
								message: '修改成功',
								type: 'success',
								duration: 1000,
								onClose: () => {
									this.$router.push('/admin/list');
								}
							});
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
		width: 15%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		bottom: 0;
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
