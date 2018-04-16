import Cookies from 'js-cookie'

const TOKEN_KEY = 'Admin-Token'
const NAV_LIST = 'navlist'

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}

export function getNav() {
	return Cookies.get(NAV_LIST)
}

export function setNav(navList) {
	return Cookies.get(NAV_LIST, navList)
}


