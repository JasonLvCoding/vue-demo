import fetch from '@/utils/fetch'
import { getNav } from '@/utils/auth'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return fetch({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getPermission() {
  var navStr = getNav();
  if(navStr){
    return new Promise((resolve)=>{
      resolve({data: JSON.parse(navStr)})
    }).catch((error)=>{
      Promise.reject(error);
    });
  }
  return fetch({
    url: '/user/permission',
    method: 'get'
  })
}

