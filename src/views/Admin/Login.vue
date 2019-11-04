<template>
	<div class="login">
		<div class="login-box">
			<div class="title">
				<span>登录</span>
			</div>
			<el-form class="form-box" :rules="rules" ref="formLabelAlign" :label-position="labelPosition" label-width="80px"
			 :model="formLabelAlign">
				<el-form-item label="账户" prop="username">
					<el-input v-model="formLabelAlign.username" placeholder="请输入登录用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="btn" @click="loginHandle">登录</el-button>
					<!-- <router-link to="/user/list" class="btn" @click="loginHandle">登录</router-link> -->
				</el-form-item>
				<el-form-item>
					<!-- <el-link type="primary" :href="location">主要链接</el-link> -->
					<router-link to="/register" class="account">注册账户</router-link>
					<router-link to="/register" class="forget">忘记密码？</router-link>
				</el-form-item>
			</el-form>
		</div>

	</div>

</template>

<script>
	// 总结：
	// 如何解决跨域？  网络代理
	// 如何封装API？  见axios index admin ajax三个文件
	// vue生命周期  总结背过
	// element UI表单验证


	// 一 直接引入axios
	// import axios from '@/plugins/axios.js'


	// 二 封装
	// 一般起名：$ajax 或者 $http
	// import $ajax from '@/plugins/ajax.js'
	// $ajax == {
	// 	post
	// }

	// 三 二次封装
	import { Admin } from '@/api/index.js'

	export default {
		data() {
			return {
				labelPosition: 'top',
				formLabelAlign: {
					username: '',
					password: '',
				},
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
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, {
						type: 'string',
						pattern: /^[0-9]{3,}$/,
						message: '密码至少三位数字',
						trigger: 'blur'
					}]
				}
			};
		},
		created() {
			console.log(this.$router.query);
		},
		methods: {
			async loginHandle() {
				// 提取数据
				let formData = { ...this.formLabelAlign };
				// console.log(data);
				// console.log(this.$refs.formLabelAlign);
				this.$refs.formLabelAlign.validate(async (valid) => {
					console.log(valid);
					if (valid) {
						let { status, msg, data } = await Admin.login(formData);
						if (status) {
							// 登陆成功，储存token和id，临时保存
							sessionStorage.token = data.token;
							sessionStorage.id = data.id;
							this.$message({
								message: '登陆成功',
								type: 'success',
								duration: 2000,
								// 一定要用箭头函数，不用的话this指向有问题，组件内部可以使用this.$router拿到router实例，组件外部需要引入
								onClose: () => {
									// 重定向
									let { redirect } = this.$route.query;
									if (redirect) {
										this.$router.push(redirect);
										return;
									}
									// 默认跳转
									this.$router.push('/admin/list');
								}
							});
						} else {
							this.$message.error(msg);
						}
					} else {
						return false;
					}
				});

				// 一 直接引入axios
				// axios.post('/admin/login',data).then(function (res) {
				// 	console.log(res.data.status);
				// 	if(res.data.status){
				// 		console.log(res.data.status);
				// 	}else{
				// 		alert(res.data.msg)
				// 	}
				// })


				// 二 封装axios到ajax后引入
				// $ajax.post('/admin/login', data).then(function(res) {
				// 	console.log(res);
				// 	// if(res.data.status){
				// 	// 	console.log(res.data.status);
				// 	// }else{
				// 	// 	alert(res.data.msg)
				// 	// }
				// })

				// 二 async对象的方法
				// let { status,msg } = await $ajax.post('/admin/login', data);
				// if (status) {
				// 	console.log(msg);
				// } else {
				// 	alert(msg)
				// }

				// 三 二次封装后
				// let { status,msg } = await Admin.login(data);
				// if (status) {
				// 	console.log(msg);
				// } else {
				// 	alert(msg)
				// }
			},
		}
	}
</script>

<style lang="scss">
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

	.login {
		height: 100vh;
		width: 100%;
		background: url(../../assets/login-bg.jpg) center no-repeat;
		background-size: cover;
		position: relative;
	}

	.login-box {
		position: absolute;
		top: 160px;
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
