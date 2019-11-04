<template>
	<form class="forms">
		<div class="account">
			<label>用户名：</label>
			<input type="text" class="username" placeholder="请输入用户名" :class="{error:isError,yes:isYes}" v-model="username"
			 @input="userHandle" @blur="userblurHandle">
			<span style="margin-left: 10px;font-size: 12px;" class="text-box">{{docs}}</span>
		</div>
		<div class="code">
			<label>密码：</label>
			<input type="password" class="passsword" placeholder="请输入密码" :class="{error:isNot}" v-model="password" @input="wordHandle"
			 @blur="wordblurHandle">
			<span style="margin-left: 10px;font-size: 12px;" class="text-box" :class="{red:isRed, yellow:isYellow, green:isGreen}">{{texts}}</span>
		</div>
		<div class="msg">
			<label>验证码：</label>
			<input class="verify" placeholder="请输入验证码" type="text" v-model="verify" @blur="verifyblurHandle">
			<button class="get" @click="getNumHandle" :disabled="isDisabled">{{getNum}}</button><br>
		</div>
		<div class="agree">
			<input type="checkbox" @click="checkHandle" v-model="isChecked">我已阅读网站用户协议
			<span style="margin-left: 10px;font-size: 12px;" class="text-box">{{checkAlert}}</span>
		</div>
		<button type="submit" class="btn" @click="registerHandle($event)" :disabled="isDisa">注册</button><br>
	</form>
</template>


<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				verify:'',
				getNum: '获取验证码',
				num: 60,
				checkAlert:'',
				isError: false,
				isYes: false,
				isRed: false,
				isYellow: false,
				isGreen: false,
				isNot: false,
				isChecked: true,
				isDisabled: false,
				isDisa:true,
				docs: '',
				texts: ''
			}
		},
		methods: {
			userHandle() {
				var reg = /^[\w\u4e00-\u9fa5]{2,}$/;
				var username = this.username;
				if (reg.test(username)) {
					this.docs = '√';
					this.isYes = true;
					this.isError = false;
				} else {
					this.docs = '请输入2位以上用户名'
					this.isError = true;
					this.isYes = false;
				}
			},
			userblurHandle() {
				var username = this.username;
				if (username == '') {
					this.docs = '请输入用户名';
					this.isError = true;
				}else{
					this.error = false;
				}
			},
			wordHandle() {
				var regWord = /[A-z]/g;
				var regNum = /[0-9]/g;
				var regSign = /!|@|#|%|_|&|~/g;
				var password = this.password;
				var flagWord = regWord.test(password);
				var flagNum = regNum.test(password);
				var flagSign = regSign.test(password);
				if (password.length >= 6) {
					if (flagWord && flagNum && flagSign) {
						this.texts = '密码强度高';
						this.isRed = false;
						this.isYellow = false;
						this.isGreen = true;
						return;
					} else if ((flagWord && flagNum) || (flagNum && flagSign) || (flagWord && flagSign)) {
						this.texts = '密码强度中等';
						this.isRed = false;
						this.isYellow = true;
						this.isGreen = false;
						return;
					} else {
						this.texts = '密码强度低';
						this.isRed = true;
						this.isYellow = false;
						this.isGreen = false;
						return;
					}
				} else {
					// 密码长度小于6
					this.texts = '密码强度低';
					this.isRed = true;
					this.isYellow = false;
					this.isGreen = false;
				}
			},
			wordblurHandle() {
				var password = this.password;
				if (password == '') {
					this.texts = '请输入密码';
					this.isNot = true;
				}else{
					this.isNot = false;
				}
			},
			verifyblurHandle(){
				var verify = this.verify;
				if (verify == '') {
					alert('请输入6位验证码');
					this.isDisa = true;
				}else{
					this.isDisa = false;
				}
			},
			getNumHandle() {
				this.isDisabled = true;
				var timeId = this.getNum;
				timeId = setInterval(() => {
					this.getNum = this.num + "s后重新发送";
					this.num--;
					if (this.num < 0) {
						clearInterval(timeId);
						this.isDisabled = false;
						this.getNum = '获取验证码';
					}
				}, 1000)
				
			},
			checkHandle() {
				if (this.isChecked) {
					this.checkAlert = '请同意用户协议';
				}else{
					this.checkAlert = '';
				}
				return this.isChecked;
			},
			registerHandle(event) {
				console.log(this.userblurHandle());
				if (this.username != '' & this.password !='' & this.verify != '') {
						alert('注册成功！');
						this.username = '';
						this.password = '';
						this.verify = '';
						this.docs = '';
						this.texts = '';
						this.isDisa = false;
						this.isYes = false;
				}else{
					event.preventDefault();
				}
			}
		},
		computed:{
			
		}
	}
</script>

<style scoped>
	.forms {
		width: 400px;
		margin: 50px auto;
		font-size: 16px;
		padding: 20px;
		border: 1px solid #E3E3E3;
		box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
	}

	label {
		display: inline-block;
		width: 100px;
		text-align: center;
	}

	input {
		outline: none;
	}

	.account,
	.code,
	.agree,
	.msg {
		margin-bottom: 10px;
	}

	.username,
	.passsword,
	.verify {
		width: 150px;
	}

	.get {
		margin-left: 10px;
		background-color: white;
		border: 1px solid #333333;
		border-radius: 3px;
		outline: none;
	}

	.agree {
		margin-left: 15px;
	}

	.btn {
		width: 100%;
		font-size: 18px;
		padding: 5px 0;
		background-color: white;
		border: 1px solid #333333;
		border-radius: 3px;
		outline: none;
	}

	.yes {
		border: 1px solid greenyellow;
	}

	.error {
		border: 1px solid crimson;
	}

	.text {
		display: block;
	}

	.red {
		color: red;
	}

	.yellow {
		color: yellow;
	}

	.green {
		color: green;
	}
</style>
