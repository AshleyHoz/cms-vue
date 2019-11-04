module.exports = {
    devServer: {
		proxy: {
			'/admin': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
			'/images': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
			'/upload': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
			'/category': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
			'/article': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
			'/role': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
			'/user': {
				target: 'http://127.0.0.1:3000',
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
			},
		}
	},

    publicPath: '/admin/'
}
