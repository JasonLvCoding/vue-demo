// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './filters' // 全局filter
import 'babel-polyfill'
import store from './store'
import Bus from 'vue-bus'
import VueI18N from 'vue-i18n'
import VeeValidate from 'vee-validate'
import messages from 'vee-validate/dist/locale/zh_CN'
import './mock'

Vue.use(Bus)
Vue.use(VueI18N)
Vue.use(VeeValidate, {
  locale: 'cn',
  dictionary: {
    cn: { messages }
  }
})

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const i18n = new VueI18N({
    locale: 'zh',  // 语言标识
    messages: {
        'zh': require('./lang/zh'),
        'en': require('./lang/en')
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
