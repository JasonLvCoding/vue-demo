<template>
  <div id="app">
    <router-view name="header"></router-view>  
    <router-view name="navbar"></router-view>  
    <router-view name="aside" ></router-view>  
    <router-view name="confirm"></router-view>  
    <router-view name="dialog" ></router-view>  
    <div class="content-wrapper">
      <section class="content-header">
        
      </section>
      <section class="content">
        <router-view ></router-view>
      </section>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: "微软雅黑", 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  background-color: #199ED8;
}

.content-wrapper{
  text-align: left;
}

.content-header>.tabs{
  width: 100%;
}

.content-header>.tabs ul:after {
  clear: both;
  content: '';
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
}

.content-header>.tabs ul li{
  float: left;
  list-style: none;
}
</style>
