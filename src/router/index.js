import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'



const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading


Vue.use(Router)





export const constantRouterMap = [
	{ 
		path: '/login', 
		name:'login',
		component: _import('Login'), 
		hidden: true 
	}, { 
		path: '/', 
		name:'home',
		components: {
			default: _import('Index'),
			header: _import('common/Header')
		}, 
		hidden: true 
	}
	/*,

	{ path: '/authredirect', component: _import('login/authredirect'), hidden: true },

	{ path: '/401', component: _import('errorPage/401'), hidden: true }*/
]

export const asyncRouterMap = [{ 
		path: '/', 
		name: 'index',
		components: {
			default: _import('Index')
		},
		meta: {
			auth: true
		},
		hidden: true 
	}, {
	path: '/user',
	name: 'user',
	components: {
		default: _import('Manager')
	},
	meta: {
		auth: true
	}
}, {
	path: '/manager',
	name: 'manager',
	components: {
		default: _import('Manager'),
		slider: _import('common/SliderBar')
	},
	meta: {
		auth: true
	}
}, {
	path: '/account',
	name: 'account',
	components: {
		default: _import('Manager')
	},
	meta: {
		auth: true
	}
}, { path: '*', redirect: '/404', name: '404', hidden: true }];



asyncRouterMap.forEach((item)=>{
	if(item.meta && item.meta.auth){
		item.components.confirm = _import('common/Confirm');
		item.components.dialog = _import('common/Dialog');
		item.components.header = _import('common/Header');
		item.components.navbar = _import('common/Nav');
	}
});


var router = new Router({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({ y: 0 }),
	routes: constantRouterMap
});


router.beforeEach((to, from, next)=>{
	if(to.name == 'login'){
		next(true);
	}
	if(to.meta && to.meta.auth && !store.state.user.token ){
		next({path: '/login', replace: true, query: { redirect: to.fullPath }});
		return;
	}
	if(store.state.permission.routeLoaded){
		next(true);
		return;
	}
	store.dispatch('GenerateRoutes').then((addRouters) => {
		router.addRoutes(addRouters) // 动态添加可访问路由表
        next({ ...to, replace: true }) 	
	});
});

export default router;




