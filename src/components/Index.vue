<template lang="html">
  <div>
    <div style="margin: 20px 0">
      <p>欢迎，{{loading}}</p>
      <p></p>
    </div>
  </div>
</template>

<script>
//import { isvalidUsername } from '@/utils/validate'
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
