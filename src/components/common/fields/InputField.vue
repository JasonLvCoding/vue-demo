<template>
  <div class="form-group">
    <label  :class="{'sr-only': labelhidden == 'true'}"><i class="required" v-if="required!='false'">*</i>{{label}}：</label>
    <input :type="type" class="form-control" v-if="static=='false'" 
    :placeholder="placeholder" @input="handleChange" :value="value"
    :name="name"
    :id="name"
    debounce="1000"
    :data-as="label"
    />
    <p class="form-control-static" v-if="static=='true'" v-text="currentValue"></p>
    <small class="text-danger" v-show="hasError">{{ errorMsg }}</small>
  </div>
</template>
<script type="text/javascript">
import { Validator } from 'vee-validate'
export default {
  name: 'inputfield',
  components: {},
  props: {
    value: String,
    name: String,
    rules: {
      type: String,
      default: ''
    },
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
      
    }
  },
  computed:{
    validator(){
      if(!this.rules){
        return null;
      }

      if(this.$parent.$validator){
        return this.$parent.$validator
      }else if(this._validator){
        return this._validator
      }else{
        const validator = new Validator()
        validator.attach(this.name, this.rules, this.label)
        this._validator = validator
        return validator
      }

    },
    errorBag(){
      return this.validator && this.validator.errorBag
    },
    hasError(){
      return this.errorBag && this.errorBag.has(this.name)
    },
    errorMsg(){
      return this.errorBag && this.errorBag.first(this.name)
    }
  },
  mounted(){
    console.log(this.id);
    if(this.rules){
      this.validator.attach(this.name, this.rules, this.label)
    }

  },
  methods: {
   handleChange(event){
    var value = event.target.value;
    this.onValidate(event);
        this.$emit('input', value); 
   },
   onValidate(e){
    if(this.rules){
      this.validator.validate(this.name, e.target.value)
    }
   }
  }
}
</script>
<style>

  .form-group label{
    width: 85px;
  }

</style>
