import { asyncRouterMap, constantRouterMap } from '@/router'
import { getPermission } from '@/api/common/login'
import { setNav } from '@/utils/auth'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  /*if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }*/
  if(!roles || roles.length == 0) return false;
  return roles.find(role => role.alias == route.name) != null;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    menus: [], 
    routeLoaded: false,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      state.routeLoaded = true

    },
    SET_MENUS: (state, menus) => {
      //缓存到sessionStorage
      setNav(JSON.stringify(menus))
      state.menus = menus
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        getPermission().then(({ data }) => {
          let accessedRouters = filterAsyncRouter(asyncRouterMap, data)
          commit('SET_MENUS', data)
          commit('SET_ROUTERS', accessedRouters)
          resolve(accessedRouters)
        });
        
      })
    }
  }
}

export default permission
