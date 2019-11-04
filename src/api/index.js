// 汇总所有的API模块
// 将modules里的所有模块综合起来到这个文件里
// 二次封装
import Admin from './modules/admin.js'
import Category from './modules/category.js'
import Article from './modules/article.js'
import User from './modules/user.js'
import Role from './modules/role.js'

export {
	Admin,
	Category,
	Article,
	User,
	Role
}