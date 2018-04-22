<template>
  <div class="form-group has-warning">
    <label  :class="{'sr-only': labelhidden == 'true'}"><i class="required" v-if="required!='false'">*</i>{{label}}：</label>
    <input :type="type" class="form-control" v-if="static=='false'" :placeholder="placeholder" @input="handleChange" :value="currentValue">
    <p class="form-control-static" v-if="static=='true'" v-text="currentValue"></p>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'inputfield',
  components: {},
  props: {
    value: String,
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    labelhidden: {
      default: 'false',
      type: String
    },
    placeholder:{
      default(){
        return this.label || '请输入';
      },
      type: String
    },
    required: {
      default: 'false',
      type: String
    },
    scale: {
      default: 'auto',
      type: String
    },
    static:{
      default: 'false',
      type: String
    }
  },
  data () {
    return {
      currentValue: this.value 
    }
  },
  computed:{

  },
  mounted(){
    console.log(this.value);
  },
  methods: {
   handleChange(event){
    var value = event.target.value;
    this.$emit('input', value); 
   }
  }
}
</script>
<style>

  .form-group label{
    width: 85px;
  }

</style>
