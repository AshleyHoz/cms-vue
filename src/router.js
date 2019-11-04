import Vue from 'vue'
import Router from 'vue-router'
// 页面级组件
import Home from './views/Home.vue'
// import Forms from './views/Forms.vue'
// import Star from './views/Stars.vue'
import Layout from './components/Layout.vue'
import Element from 'element-ui';
// 消息提示service
import { Message } from 'element-ui';

Vue.use(Router)
Vue.use(Element, { size: 'small' });

// 写法一
// 先定义router实例
let router = new Router({
	routes: [{
			path: '/',
			name: 'home',
			redirect: '/login',
			component: Home
		},
		{
			path: '/login',
			// 重定向  进入页面必须先进入登录页，登陆之后才可以
			// redirect: '/',
			name: 'Login',
			component: () => import('./views/Admin/Login.vue')
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import('./views/Admin/Register.vue')
		},
		// 管理员模块
		{
			path: '/admin/',
			name: 'Admin',
			component: Layout,
			meta: { auth: true }, //任何进入这个地址的都需要权限
			children: [{
					path: 'list',
					name: 'AdminList',
					component: () => import('./views/Admin/List.vue'),
				},
				{
					path: 'edit/:id',
					name: 'AdminEdit',
					props: true,
					component: () => import('./views/Admin/Edit.vue'),
				},
				{
					path: 'set',
					name: 'AdminSet',
					props: true,
					component: () => import('./views/Admin/Set.vue'),
				}
			]
		},
		// 文章模块
		{
			path: '/article/',
			name: 'Article',
			component: Layout,
			meta: { auth: true }, //任何进入这个地址的都需要权限
			children: [{
					path: 'list',
					name: 'ArticleList',
					component: () => import('./views/Article/List.vue'),
				},
				{
					path: 'edit/:id',
					name: 'ArticleEdit',
					component: () => import('./views/Article/Edit.vue'),
				},
				{
					path: 'release',
					name: 'ArticleRelease',
					component: () => import('./views/Article/Release.vue'),
				},
			]
		},
		// 列表模块
		{
			path: '/category/',
			name: 'Category',
			component: Layout,
			meta: { auth: true }, //任何进入这个地址的都需要权限
			children: [{
				path: 'list',
				name: 'CategoryList',
				component: () => import('./views/Category/List.vue'),
			}, ]
		},
		// 角色模块
		{
			path: '/role/',
			name: 'Role',
			component: Layout,
			meta: { auth: true }, //任何进入这个地址的都需要权限
			children: [{
				path: 'list',
				name: 'RoleList',
				component: () => import('./views/Role/List.vue'),
			}, ]
		},
		// 用户模块
		{
			path: '/user/',
			name: 'User',
			component: Layout,
			meta: { auth: true }, //任何进入这个地址的都需要权限
			children: [{
					path: 'list',
					name: 'UserList',
					component: () => import('./views/User/List.vue'),
				},
				{
					path: 'edit/:id',
					name: 'UserEdit',
					props: true,
					component: () => import('./views/User/Edit.vue'),
				},
			]
		},
		// cart
		{
			path: '/cart/',
			name: 'Cart',
			component: Layout,
			meta: { auth: true }, //任何进入这个地址的都需要权限
			children: [{
					path: 'list',
					name: 'Cart',
					component: () => import('./views/Cart.vue'),
				},
			]
		}
	]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
	// console.log(to)
	// 判断匹配的路由是否需要权限，只要有一个路由需要权限，则需要登陆
	let isAuth = to.matched.some((item) => item.meta.auth)
	// isAuth是true,无token => 跳转登录
	// isAuth是true,有token => next()放行
	// isAuth是false,有/无token => next()放行
	if (!isAuth) {
		next();
		return;
	}
	if (sessionStorage.token) {
		next();
		return;
	}
	// 消息提示用户
	// 作用二：防止用户分享链接时，其他用户打开链接需要再次验证登录权限，不能随意登陆
	Message.error({
		message: 'token失效，请重新登陆！',
		onClose: () => {
			// 跳转登陆
			next({
				path: '/login',
				// redirect重定向，在用户登陆成功之后再跳转到用户登录之前想要去的页面
				// 使用query传参可正确区分地址和参数，params是/表示的参数，因此使用params会导致地址参数分不清
				query: { redirect: to.fullPath }
			})
		}
	});
	
	
	// if (to.path == '/login' || to.path == '/register') {
	// 	next();
	// } else {
	// 	// 中止跳转next(false);

	// }
	
	// console.log(from);
	// console.log(next);
	// next();
})

// 再输出
export default router;

// 写法二
// 将实例直接export
// export default new Router({
// 	routes: [{
// 			path: '/',
// 			name: 'home',
// 			redirect: '/login',
// 			component: Home
// 		}, {
// 			path: '/login',
// 			// 重定向  进入页面必须先进入登录页，登陆之后才可以
// 			// redirect: '/',
// 			name: 'Login',
// 			component: () => import('./views/Admin/Login.vue')
// 		},
// 		{
// 			path: '/register',
// 			name: 'Register',
// 			component: () => import('./views/Admin/Register.vue')
// 		},
// 		// 管理员模块
// 		{
// 			path: '/admin/',
// 			name: 'Layout',
// 			component: Layout,
// 			children: [{
// 					path: 'list',
// 					name: 'AdminList',
// 					component: () => import('./views/Admin/List.vue'),
// 				},
// 				{
// 					path: 'edit/:id',
// 					name: 'AdminEdit',
// 					props: true,
// 					component: () => import('./views/Admin/Edit.vue'),
// 				}
// 			]
// 		},
// 		// 文章模块
// 		{
// 			path: '/article/',
// 			name: 'Layout',
// 			component: Layout,
// 			children: [{
// 					path: 'list',
// 					name: 'ArticleList',
// 					component: () => import('./views/Article/List.vue'),
// 				},
// 				{
// 					path: 'edit/:id',
// 					name: 'ArticleEdit',
// 					component: () => import('./views/Article/Edit.vue'),
// 				},
// 				{
// 					path: 'release',
// 					name: 'ArticleRelease',
// 					component: () => import('./views/Article/Release.vue'),
// 				},
// 			]
// 		},
// 		// 列表模块
// 		{
// 			path: '/category/',
// 			name: 'Layout',
// 			component: Layout,
// 			children: [{
// 				path: 'list',
// 				name: 'CategoryList',
// 				component: () => import('./views/Category/List.vue'),
// 			}, ]
// 		},
// 		// 角色模块
// 		{
// 			path: '/role/',
// 			name: 'Layout',
// 			component: Layout,
// 			children: [{
// 				path: 'list',
// 				name: 'RoleList',
// 				component: () => import('./views/Role/List.vue'),
// 			}, ]
// 		},
// 		// 角色模块
// 		{
// 			path: '/user/',
// 			name: 'Layout',
// 			component: Layout,
// 			children: [{
// 				path: 'list',
// 				name: 'UserList',
// 				component: () => import('./views/User/List.vue'),
// 			}, 
// 			{
// 				path: 'edit/:id',
// 				name: 'UserEdit',
// 				props: true,
// 				component: () => import('./views/User/Edit.vue'),
// 			},
// 			{
// 				path: 'set',
// 				name: 'UserSet',
// 				props: true,
// 				component: () => import('./views/User/Set.vue'),
// 			}]
// 		},
// 图片模块
// {
// 	path: '/layout',
// 	name: 'layout',
// 	// 别名
// 	alias: '/index',
// 	component: Layout,
// 	children: [{
// 			path: '/home',
// 			// 重定向
// 			// redirect: '/about',
// 			name: 'home',
// 			component: () => import('./views/Home.vue')
// 		},
// 		{
// 			path: '/about',
// 			name: 'about',
// 			component: () => import('./views/About.vue')
// 		},
// 	]
// },
// {
// 	path: '/star',
// 	name: 'star',
// 	component: Star
// },
// {
// 	path: '/form',
// 	name: 'form',
// 	component: Forms
// },

// {
// 	path: '/',
// 	name: 'home',
// 	component: Home
// },
// {
// 	path: '/about',
// 	name: 'about',
// 	// route level code-splitting
// 	// this generates a separate chunk (about.[hash].js) for this route
// 	// which is lazy-loaded（懒加载 *****访问到这才进去，不访问到这不进去） when the route is visited.
// 	component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
// },

// 	]
// })
