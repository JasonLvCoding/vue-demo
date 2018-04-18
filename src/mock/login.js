import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '工程师小王'
  }
}

const navList = {
  admin: {
      data: [
        {name: '工单', alias: 'case', path: '/case'}, 
        {name: '资产', alias: 'asset', path: '/asset'},
        {name: 'CRM', alias: 'crm', path: '/crm'},
        {name: '合作商', alias: 'partner', path: '/partner'},
        {name: '知识库', alias: 'knowledge', path: '/knowledge'},
        {name: '租赁', alias: 'rent', path: '/rent'}
      ]
  }
};

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return Promise.reject('error')
    }
  },
  getPermission: config => {
    const { token } = param2Obj(config.url)
    if (navList[token] && navList[token].data) {
      return navList[token].data
    } else {
      return Promise.reject('error')
    }
  },
  logout: () => 'success'
}
