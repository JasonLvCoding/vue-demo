<template lang="html">
  <div>
    <div style="margin: 20px 0">
          路由信息：{{$route.name}}
          国际化标题信息：{{$t('message.title')}}
          <button @click.prevent="showConfirm" >模态窗口测试</button>
          <button @click.prevent="showDailog" >模态窗口测试</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {},
  data () {
    return {
      loading: false
    }
  },
  mouted(){
    //this.getUserInfo();
  },
  methods: {
    showConfirm(){
      this.$bus.$emit('dialogconfirm', { title: '模块标题测试' , msg: '这是个模块窗口测试！'});
    },
    getUserInfo() {
      this.loading = true;
      this.$store.dispatch('GetUserInfo', this.loginForm).then(() => {
        this.loading = false
        this.$router.push({ path: '/' })
            // this.showDialog = true
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>


<style>
  
</style>
