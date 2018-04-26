<script>
     import generateDateData  from '@/utils/date.js'
     import picker  from '@/components/common/picker.vue'
     export default {
         name:'datepicker',
         extends: picker,
         components:{
         },
         data(){
             return {
             }
         },
         beforeMount(){
             this.initialize();
             
         },
         props:{
             start: {
	  	        type: String,
	  	        default: function(){
	  		        return  new Date().getFullYear().toString();
	  	        }
	        },
	        end: {
                type: String,
                default: function(){
                    return  new Date().getFullYear().toString();
                }
            }
         },
         methods:{
             initialize(){
                 this.data = generateDateData({ 
                     start: this.start,
                     end: this.end,
                     valueField: this.valueField,
                     displayField: this.displayField,
                     childField: this.childField
                });
             }
         }
     }
</script>
<style>

</style>