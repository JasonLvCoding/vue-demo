<template>
  <header>
    <div class="right">
      <select v-model="i18n">
        <option v-for="item in i18nList" :value="item.value">{{item.name}}</option>
      </select>
    </div>
  </header>
</template>

<script>
import i18nList from '@/lang'
export default {
  name: 'Manager',
  components: {},
  data () {
    return {
      i18n: this.$i18n.locale,
      i18nList
    }
  },
  mouted(){
    
    
  },
  watch: {
    i18n(newVal, oldVal){
       this.$i18n.locale = newVal;
    }
  },
  methods: {
    showConfirm(){ 
      this.$bus.$emit('dialogconfirm', { title: '提示' , msg: '确定更换语言吗？'});
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
