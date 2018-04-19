<script>
  import Vue from 'vue'
  export default {
    render (h, cxt) {
    console.log(this.prop);
      let myComponent = Vue.extend(require(`@/components/${this.path}.vue`).default);
      return h(myComponent, {
        props: this.prop
      })
    },
    props: {
      path: String,
      prop: {
        type: Object,
        default(){
          return {};
        }
      }
    }
  }
</script>
<style></style>