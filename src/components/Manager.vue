<template>
  <div class="form-control">
    路由信息：{{$route.name}}
    国际化标题信息：{{$t('message.title')}}
    <button @click.prevent="showConfirm" >模态窗口测试</button>
    <button @click.prevent="showDailog" >模态窗口测试</button>
  </div>
</template>

<script>
//import { isvalidUsername } from '@/utils/validate'
export default {
  name: 'Manager',
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
  .form-control input{
    width: 150px;
    height: 24px;
    line-height: 24px;
    box-sizing: border-box;
    padding: 5px 10px;
    margin-bottom: 5px;
  }

  .form-control button {
    padding: 5px 10px;
    background-color: #28A7E3;
    color: #000;
    margin: 0;
    border: none;
  }
</style>
