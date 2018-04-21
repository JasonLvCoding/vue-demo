<template>
  <div class="form-group has-warning">
    <label class="control-label" :class="{'sr-only': labelhidden}"><i class="required" v-if="required">*</i>{{label}}：</label>
    <input :type="type" class="form-control" v-if="!static" :placeholder="placeholder" @input="handleChange" :value="currentValue">
    <p class="form-control-static" v-if="static" v-text="currentValue"></p>
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
      default: false,
      type: Boolean
    },
    placeholder:{
      default(){
        return this.label || '请输入';
      },
      type: String
    },
    required: {
      default: false,
      type: Boolean
    },
    scale: {
      default: 'auto',
      type: String
    },
    static:{
      default: false,
      type: Boolean
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

  .control-label{
    width: 90px;
  }

</style>
