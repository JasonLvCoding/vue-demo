<template>
  <div >

    <tabs :models="models"></tabs>
  </div>
</template>

<script>
import tabs from './common/Tabs.vue'
export default {
  name: 'Manager',
  components: { tabs},
  data () {
    return {
      models: [{
        name:'创建服务单', 
        alias: 'caseCreate',
        path:'case/CaseCreate'
      }, {
        name:'查看服务单', 
        alias: 'caseInfo',
        path:'case/CaseInfo'
      }, {
        name:'查看服务单2', 
        alias: 'caseInfo',
        path:'case/CaseInfo'
      }, {
        name:'查看服务单3', 
        alias: 'caseInfo',
        path:'case/CaseInfo'
      }]
    }
  },
  mouted(){
    //this.getUserInfo();
    
  },
  methods: {
    
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
