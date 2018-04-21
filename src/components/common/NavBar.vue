<template>
<header class="main-header secondary">
  <div class="row">
    <div class="col-md-7">
      <nav class="navbar navbar-static-top">
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <li class="dropdown user user-menu" >
              <router-link :to="{ path: '/' }" class="dropdown-toggle" data-toggle="dropdown">
                  <img src="../../assets/logo.png" class="user-image" alt="User Image">
                  <span class="hidden-xs">主页</span>
              </router-link>
            </li>
            <li class="dropdown user user-menu" v-for="menu in menus">
              <router-link :to="{ path: menu.path }" class="dropdown-toggle" data-toggle="dropdown">
                  <img src="../../assets/logo.png" class="user-image" alt="User Image">
                  <span class="hidden-xs">{{menu.name}}</span>
              </router-link>
              
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="col-md-5">
      <div class="input-group">
          <input type="text" name="query" class="form-control" placeholder="搜索系统">
          <span class="input-group-btn">
            <button type="submit" name="search"  class="btn btn-flat"><i class="fa fa-search"></i>
            </button>
          </span>
      </div>

    </div>
  </div>
    
    
</header>
</template>

<script>
export default {
  name: 'Manager',
  components: {},
  data () {
    return {
      
    }
  },
  computed: {
    menus(){
      return this.$store.getters.menus;
    }
  },
  mounted(){
    
  },
  methods: {
    showConfirm(){ 
      this.$bus.$emit('dialogconfirm', { title: '提示' , msg: '确定更换语言吗？'});
    }
    
  }
}
</script>


<style>
.main-header.secondary, .skin-blue .main-header.secondary .logo,.skin-blue .main-header.secondary .navbar{
  background-color: #036;
}
.main-header.secondary {
  z-index: 900;
  position: relative;
}
.main-header.secondary .navbar{
  margin-left: 0;
  z-index: 901;
}

.main-header.secondary .navbar-custom-menu{
  float: none;
}
.main-header.secondary .input-group {
  margin: 5px auto;
  padding: 0px 1px;
}
</style>
