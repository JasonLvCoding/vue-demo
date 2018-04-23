<template lang="html">
  <div class="case-form">
    
    <p><i class="fa fa-wrench"></i><span>服务单号：{{formState.caseNumber}}</span></p>
    <div class="clearfix row   form-inline">
      
      <i-input class="col-md-3"  label="报修时间" v-model="formState.createDate" required="true" ></i-input>
      <i-select class="col-md-3" v-model="formState.project" label="项目" scale="large" required="true" >
        <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
      </i-select>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12">
          <div class="box box-solid box-default">
            <div class="box-header">
              <p >
                <span class="fieldset">用户</span><i class="fa fa-exclamation-triangle"></i><span class="text-danger">当前用户今日已报修{{formState.dailyCount}}次，本月已报修{{formState.monthlyCount}}次</span></p>
            </div>
            <div class="box-body">
              <div class="form-inline  clearfix row">
                <i-input  class="col-md-6" label="报修人"  v-model="formState.name" ></i-input>
                <i-input  class="col-md-6" label="报修电话"  type="number" v-model="formState.tel"  ></i-input>
  
              </div>
              <div class="form-inline  clearfix row">
                <i-select  class="col-md-6" v-model="formState.project" label="城市" scale="medium"  >
                  <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
                </i-select>
                 <i-select  class="col-md-6"  v-model="formState.project" label="门店" scale="medium" >
                  <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
                </i-select>
              </div>
              <button type="submit" class="btn btn-primary center-block">&nbsp;查询&nbsp;</button>

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
              <p><strong>详细信息</strong></p>
              <div class="form-inline  clearfix row">
                <i-input  class="col-md-6" label="人员"  v-model="formState.name" ></i-input>
                <i-input  class="col-md-6" label="电话"  type="number" v-model="formState.tel"  ></i-input>
              </div>
              <div class="form-inline  clearfix row">
                 <i-select  class="col-md-6"  v-model="formState.project" label="门店" scale="medium" >
                  <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
                </i-select>
                <div class="col-md-6">
                  <p><i class="fa fa-plus" aria-hidden="true"></i>新门店</p>
                </div>
                
              </div>
              <div class="form-inline  clearfix row">
                <i-select  class="col-md-6" v-model="formState.project" label="省/直辖市" scale="medium"  >
                  <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
                </i-select>
                 <i-select  class="col-md-6"  v-model="formState.project" label="市" scale="medium" >
                  <option v-for="item in menus" slot=""  :value="item.name">{{item.name}}</option>
                </i-select>
              </div>
              <div class="row form-inline">
                <i-input  class="col-md-12" label="地址"  v-model="formState.name" ></i-input>
              </div>
              <div class="row form-inline">
                <i-input  class="col-md-12" label="其它"  v-model="formState.name" ></i-input>
              </div>
            </div>
          </div>
          
      </div>
      <div class="col-md-6 col-sm-12">

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
        caseNumber: '201804201001',
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
    submit(){
      console.info(this.formState.tel);
    }
  }
}
</script>


<style >
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

  .form-inline.row{
    margin-bottom: 20px;
  }
   @media screen and (max-width:1400px) and (min-width:768px){
    .case-form .form-inline label{
      width: 90px;
    }

    .case-form .form-inline .form-control{
      width: calc(100% - 95px);
    }

  }


</style>
