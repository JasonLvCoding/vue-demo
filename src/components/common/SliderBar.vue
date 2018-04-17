<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar" style="height: auto;">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="../../assets/logo.png" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>Alexander Pierce</p>
          <a href="javascript:void(0)"><i class="fa fa-circle text-success"></i> 在线</a>
        </div>
      </div>
      <ul class="sidebar-menu">
        <li class="header">主导航</li>
        <li class="active treeview">
          <a href="#">
            <i class="fa fa-dashboard"></i> <span>仪表盘</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li class="active"><a href="index.html"><i class="fa fa-circle-o"></i> 仪表盘 v1</a></li>
            <li><a href="index2.html"><i class="fa fa-circle-o"></i> 仪表盘 v2</a></li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-files-o"></i>
            <span>布局选项</span>
            <span class="pull-right-container">
              <span class="label label-primary pull-right">4</span>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="pages/layout/top-nav.html"><i class="fa fa-circle-o"></i>顶部导航</a></li>
            <li><a href="pages/layout/boxed.html"><i class="fa fa-circle-o"></i> 盒子</a></li>
            <li><a href="pages/layout/fixed.html"><i class="fa fa-circle-o"></i> 定位</a></li>
            <li><a href="pages/layout/collapsed-sidebar.html"><i class="fa fa-circle-o"></i> 可折叠侧边栏</a></li>
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
      
    }
  },
  mouted(){
    
    
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
</style>