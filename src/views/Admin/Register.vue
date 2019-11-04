<template>
	<div class="register">
		<div class="register-box">
			<div class="title">
				<span>注册</span>
			</div>
			<el-form class="form-box" :rules="rules" ref="formLabelAlign" :label-position="labelPosition" label-width="80px"
			 :model="formLabelAlign">
				<el-form-item label="账户" prop="username">
					<el-input v-model="formLabelAlign.username" placeholder="请输入登录用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="nickname">
					<el-input v-model="formLabelAlign.nickname" placeholder="请输入真实姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="formLabelAlign.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model="formLabelAlign.tel" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				<el-form-item prop="type">
					<el-checkbox-group v-model="formLabelAlign.type">
						<el-checkbox label="请同意本站用户协议" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button class="btn" @click="registerHandle">注册</el-button>
				</el-form-item>
				<el-form-item>
					<router-link to="/login" class="account">登录账户</router-link>
					<router-link to="/login" class="forget">忘记密码？</router-link>
				</el-form-item>
			</el-form>
		</div>

	</div>

</template>

<script>
	import {
		Admin
	} from '@/api/index.js'
	export default {
		data() {
			return {
				labelPosition: 'top',
				formLabelAlign: {
					username: '',
					password: '',
					nickname: '',
					sex: '',
					tel: '',
					type: []
				},
				rules: {
					name: [{
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
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, {
						type: 'string',
						pattern: /^[A-z|0-9]{2,18}$/,
						message: '长度在 2 到 18 个字符',
						trigger: 'blur'
					}],
					nickname: [{
						required: true,
						message: '请输入真实姓名',
						trigger: 'blur'
					}, {
						type: 'string',
						pattern: /^[A-z|\u4e00-\u9fa5]{2,20}$/,
						message: '长度在 2 到 20 个字符',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
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
					type: [{
						type: 'array',
						required: true,
						message: '请同意用户协议',
						trigger: 'change'
					}],
				}
			}
		},
		methods: {
			async registerHandle() {
				// this.$refs[formName].validate((valid) => {
				// 	if (valid) {
				// 		alert('submit!');
				// 	} else {
				// 		console.log('error submit!!');
				// 		return false;
				// 	}
				// });
				// 提取数据
				let data = { ...this.formLabelAlign };
				console.log(data);
				this.$refs.formLabelAlign.validate(async (valid) => {
					console.log(valid)
					if (valid) {
						let { status, msg } = await Admin.register(data);
						if (status) {
							this.$message({
								message: '注册成功！',
								type: 'success',
								duration: 2000,
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

<style>
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
		margin-bottom: 5px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.register {
		height: 100vh;
		width: 100%;
		background-size: cover;
		background: url(../../assets/login-bg.jpg) center no-repeat;
	}

	.register-box {
		position: absolute;
		top: 70px;
		right: 60px;
		background-color: white;
		border-radius: 5px;
	}

	.title {
		width: 100%;
		background-color: #d9edf7;
		border-bottom: 1px solid #bce8f1;
		border-radius: 5px;
	}

	.title span {
		padding: 20px 20px;
		line-height: 40px;
		font-size: 14px;
		color: #31708f;
	}

	.form-box {
		padding: 20px;
		width: 300px;
		font-weight: bold;
	}

	.el-form-item .el-form-item__label {
		width: 50px;
	}

	.btn {
		width: 300px;
		font-size: 18px;
		background-color: #337ab7;
		text-decoration: none;
		color: white;
		border-radius: 5px;
		padding: 10px 130px;
	}

	.account {
		font-size: 12px;
		float: left;
		color: #337ab7;
		text-decoration: none;
		border: 1px solid transparent;
	}

	.forget {
		font-size: 12px;
		float: right;
		color: #337ab7;
		text-decoration: none;
		border: 1px solid transparent;
	}
</style>
