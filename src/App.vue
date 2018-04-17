<template>
  <div id="app">
    <router-view name="header"/>
    <router-view name="confirm"/>
    <router-view name="dialog"/>
    <div class="content-wrapper" style="min-height: 100vh;">
      <section class="content-header">
        <div class="tabs">
          <ul>
            <li>测试1&nbsp;</li>
            <li>测试2&nbsp;</li>
            <li>测试3&nbsp;</li>
          </ul>
        </div>
      </section>
      <router-view /> 
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'App'
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
