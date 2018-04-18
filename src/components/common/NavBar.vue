<template>
<header class="main-header secondary">
    <nav class="navbar navbar-static-top">
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu" v-for="nav in navList">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="../../assets/logo.png" class="user-image" alt="User Image">
              <span class="hidden-xs">{{nav}}</span>
            </a>
          </li>
       </ul>
      </div>
    </ul >
  </nav>
</header>
</template>

<script>
import i18nList from '@/lang'
export default {
  name: 'Manager',
  components: {},
  data () {
    return {
      navList: []
    }
  },
  mounted(){
    this.navList.push('主页');
    this.navList.push('工单');
    this.navList.push('资产');
    this.navList.push('CRM');
    this.navList.push('合作商');
    this.navList.push('知识库');
    this.navList.push('租赁');
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
}
.main-header.secondary .navbar{
  margin-left: 0;
  z-index: 901;
}

.main-header.secondary .navbar-custom-menu{
  float: none;
}

</style>
