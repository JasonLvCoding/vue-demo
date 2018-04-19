<template>
  <div class="tab-panel">
    <section class="content-header tab-header">
      <ul>
          <li v-for="(tab, index) in models" :class="{active: index == activeIndex }" @click="setActive(index)">{{tab.name}}
          <button  class="close">×</button></li>
      </ul>
    </section>
    <section class="content tab-content">
      <div class="tab-item" v-for="(tab, index) in models" v-show="index == activeIndex" >
        <async-load-component :path="tab.path" :prop="tab.prop" keep-alive></async-load-component>
      </div>
    </section>
  </div>
</template>

<script>
import asyncLoadComponent from '@/components/common/AsyncLoadComponent.vue'
export default {
  name: 'Tabs',
  components: { asyncLoadComponent },
  props: {
    models: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    
  },
  created(){

  },
  mounted(){

  },
  methods: {
    add(tab){
      this.models.push(tab);
    },
    setActive(index){
      this.activeIndex = index;
    }
  }
}
</script>


<style>
.tabpanel {
  width: 100%;
  margin: 0;
  padding: 0;
}

.tab-header {
  background-color: transparent;
  padding: 0;
  margin: 0;
}

.tab-header ul {
  margin: 0;
  padding: 0;
}

.tab-header ul:after {
  height: 0;
  display: block;
  content: ' ';
  visibility: hidden;
  clear: both;
}

.tab-header ul li {
  background-color: #11EEEE;
  float: left;
  list-style: none;
  line-height: 200%;
}

.tab-header ul li{
  border:1px solid #4DB3B3;
  border-radius: 5px 5px 0 0;
  padding: 0px 10px;
  cursor: pointer;
  margin-right: 1px;
}

.tab-header ul li.active {
  background-color: #28a7e3;
  border-bottom-color: tranparent;
}

.tab-header ul li button.close{
  margin-left: 10px;
}

.tab-content {
  background-color: #28a7e3;
  min-height: 100%;
}


</style>
