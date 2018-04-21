<template lang="html">
  <div>
    <p><i class="fa fa-wrench"></i><span>服务单号：{{caseNumber}}</span></p>
    <div class="form-inline margin-bottom clearfix">
      
      <i-input label="报修时间" v-model="formState.createDate" required="true" static="true"></i-input>
      <i-select  v-model="formState.project" label="项目" scale="large" required="true" >
        <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
      </i-select>
    </div>
    <div class="row">
      <div class="col-sm-6">
          <div class="box box-solid box-default">
            <div class="box-header">
              <p >
                <span class="fieldset">用户</span><i class="fa fa-exclamation-triangle"></i><span class="text-danger">当前用户今日已报修{{dailyCount}}次，本月已报修{{monthlyCount}}次</span></p>
            </div>
            <div class="box-body">
              <div class="form-inline margin-bottom clearfix">
                <i-input label="报修人"  v-model="formState.name" ></i-input>
                <i-input label="报修电话"  type="tel" v-model="formState.tel"  ></i-input>
  
              </div>
              <div class="form-inline margin-bottom clearfix">
                <i-select  v-model="formState.project" label="城市" scale="medium"  >
                  <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
                </i-select>
                 <i-select  v-model="formState.project" label="门店" scale="medium" >
                  <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
                </i-select>
              </div>


              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>列头1</th>
                      <th>列头2</th>
                      <th>列头3</th>
                      <th>列头4</th>
                      <th>列头5</th>
                      <th>列头6</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in menus">
                      <td>{{item.path}}</td>
                      <td>{{item.alias}}</td>
                      <td>{{item.name}}</td>
                      <td>{{item.path}}</td>
                      <td>{{item.path}}</td>
                      <td>{{item.path}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
      </div>
      <div class="col-sm-6">

      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import iSelect from '@/components/common/fields/SelectField.vue'
import iInput from '@/components/common/fields/InputField.vue'
export default {
  name: 'casecreate',
  components: { iSelect, iInput },
  data () {
    return {
      formState:{
        name: '',
        tel: '',
        caseNumber: '121313',
        dailyCount: 0,
        monthlyCount: 0,
        project: '租赁',
        createDate: '2018-04-10'
      }
    }
  },
  computed:{
    menus(){
      return this.$store.getters.menus;
    }
  },
  mounted(){

  },
  methods: {
   
  }
}
</script>


<style>
  .fa {
    width: 20px;
  }

  .fieldset {
    margin-right: 20px;
  }

  .box.box-solid.box-default .box-header{
    line-height: 150%;
    padding: 5px 0 0 5px;
    background-color: #E9F2FC;
    border-color: #96AAD8;
  }

  .margin-bottom{
    margin-bottom: 20px;
  }
</style>
