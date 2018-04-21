<template>
  <div class="form-group has-warning">
    <label class="control-label" :class="{'sr-only': labelhidden}"><i class="required" v-if="required">*</i>{{label}}：</label>
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
      default: false,
      type: Boolean
    },
    placeholder:{
      default: '请选择',
      type: String
    },
    required: {
      default: false,
      type: Boolean
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
