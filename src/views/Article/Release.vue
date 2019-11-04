<template>
	<div id="app">
		<div class="list">
			<div class="title">发布文章</div>
			<div class="content">
				<el-form ref="form" :rules="rules" :model="form" label-width="80px">
					<el-form-item label="标题" prop="title">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="描述" prop="description">
						<el-input type="textarea" v-model="form.description"></el-input>
					</el-form-item>
					<el-form-item label="版块" prop="id">
						<el-select v-model="form.cate_1st" placeholder="请选择版块">
							<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
						<el-select v-model="form.cate_2nd" placeholder="请选择版块">
							<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
						<el-select v-model="form.cate_3th" placeholder="请选择版块">
							<el-option v-for="item in options_3th" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="头像" prop="main_photo">
						<!-- element UI规定data 绑定其他属性 -->
						<el-upload class="avatar-uploader" action="/upload/common/" :headers="header" :data="{type:'avatar'}" :show-file-list="false"
						 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="form.main_photo" :src="form.main_photo" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<div class="cover" v-show="isShow">
							<i class="el-icon-delete-solid" @click="deleteHandle(form.main_photo)"></i>
						</div>
					</el-form-item>
					<el-form-item label="内容" class="editor" prop="content">
						<editor v-model="form.content"></editor>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="releaseHandle">发布文章</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import Editor from '../../components/EditorBar.vue'
	import { Category } from '@/api/index.js'
	import { Article } from '@/api/index.js'

	export default {
		data() {
			return {
				header:{
					Authorization:`Bearer ${sessionStorage.token}`
				},
				isShow: false,
				form: {
					id: '',
					title: '',
					description: '',
					content: '',
					create_date:'',
					main_photo: '',
					cate_1st: '',
					cate_2nd: '',
					cate_3th: ''
				},
				options_1st: [],
				options_2nd: [],
				options_3th: [],
				rules: {
					title: [{
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
					description: [{
							required: true,
							message: '请输入描述',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 500,
							message: '长度在 1 到 500 个字符',
							trigger: 'blur'
						}
					],
					content: [{
							required: true,
							message: '请输入内容',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 2000,
							message: '长度在 1 到 2000 个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		components: {
			Editor
		},
		created() {
			this.loadCate_1st(0);
		},
		// 侦听器  watch主要用于ajax时刻监听数据变化
		// 省市区  三级联动
		watch: {
			// 套一层的写法,不能直接用
			"form.cate_1st": function(newValue, oldValue) {
				console.log(newValue, oldValue)
				this.loadCate_2nd(newValue)
			},
			"form.cate_2nd": function(newValue, oldValue) {
				console.log(newValue, oldValue)
				this.loadCate_3th(newValue)
			}
		},
		methods: {
			async loadCate_1st(id) {
				console.log(id)
				let { status, data } = await Category.subCate({ id });
				console.log(data)
				if (status) {
					if (data.length > 0) {
						this.form.cate_1st = data[0].id;
					}
					if (data.length == 0) {
						this.form.cate_1st = '';
					}
					this.options_1st = data;
				}
			},
			async loadCate_2nd(id) {
				let { status, data } = await Category.subCate({ id });
				if (status) {
					if (data.length > 0) {
						this.form.cate_2nd = data[0].id;
					}
					if (data.length == 0) {
						this.form.cate_2nd = '';
					}
					this.options_2nd = data;
				}
			},
			async loadCate_3th(id) {
				let { status, data } = await Category.subCate({ id });
				if (status) {
					if (data.length > 0) {
						this.form.cate_3th = data[0].id;
					}
					if (data.length == 0) {
						this.form.cate_3th = '';
					}
					this.options_3th = data;
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
				this.form.main_photo = res.data;
				this.isShow = true;
				console.log(res, file);
			},
			async deleteHandle(src) {
				console.log(src)
				src = src.substr(1);
				let { status, msg } = await Article.delImg({ src });
				if (status) {
					this.$message({
						message: '删除成功',
						type: 'success',
						duration: 1000,
					});
					this.form.main_photo = '';
					this.isShow = false;
				} else {
					this.$message.error(msg);
					this.isShow = true;
				}
			},
			// 发布文章
			async releaseHandle() {
				let data = { ...this.form };
				console.log(data)
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Article.add(data);
						if (status) {
							this.$message({
								message: '发布成功',
								type: 'success',
								duration: 1000,
								onClose: () => {
									this.$router.push('/article/list');
								}
							});
						} else {
							this.$message.error(msg);
						}
					} else {
						return false;
					}
				})
			}
		},
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

		.content {
			margin-top: 20px;
			padding-left: 100px;
		}

		.pic {
			border: 1px solid #E3E3E3;
			background-color: white;
			border-radius: 3px;
			outline: none;
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
