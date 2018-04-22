<template>
  <div class="form-group has-warning">
    <label  :class="{'sr-only': labelhidden=='true'}"><i class="required" v-if="required!='false'">*</i>{{label}}：</label>
    <select  class="form-control" :class="scale"  @change="handleChange" :value="currentValue">
      <option value="">{{placeholder}}</option>
      <slot></slot>
    </select>
  </div>
</template>
<script type="text/javascript">
export default {
  name: 'selectfield',
  components: {},
  props: {
    value: String,
    label: {
      type: String,
      default: ''
    },
    labelhidden: {
      default: 'false',
      type: String
    },
    placeholder:{
      default: '请选择',
      type: String
    },
    required: {
      default: 'false',
      type: String
    },
    scale: {
      default: 'auto',
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
    this.$emit('change', value); 
   }
  }
}
</script>
<style>
</style>
