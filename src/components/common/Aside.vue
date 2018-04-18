<template>
<aside class="main-sidebar">
  <section class="sidebar">
    <div class="user-panel">
      <div class="pull-left image">
        <img src="../../assets/logo.png" class="img-circle" alt="User Image">
      </div>
      <div class="pull-left info">
        <p style="font-size:15px;">{{name}}</p>
        <a href="javascript:void(0)"><i class="fa fa-circle text-success"></i> {{loginStatus}}</a>
      </div>
    </div>

    <ul class="sidebar-menu">
      <li class="header">主菜单</li>

      <li class="treeview" v-for="menu in menuList">
        <a href="#">
          <i class="fa fa-pie-chart"></i>
          <span>{{menu.name}}</span>
          <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
        </a>
        <ul class="treeview-menu">
          <li v-for="list in menu.childList"><router-link :to="{name: list.href}"><i class="fa fa-circle-o"></i> {{list.name}}</router-link></li>
        </ul>
      </li>

    </ul>
  </section>
</aside>
</template>
<script>
export default {
  name: 'Manager',
  components: {},
  data () {
    return {
      menuList: [],
      loginStatus: 'online',
      name: '托尔斯塔'
    }
  },
  mounted(){
    
    
  },
  watch: {
    
  },
  methods: {
    showConfirm(){ 
      this.$bus.$emit('dialogconfirm', { title: '提示' , msg: '确定更换语言吗？'});
    }
  }
}
</script>
<style>
.main-sidebar {
  padding-top: 100px;
  box-sizing: border-box;
}
</style>