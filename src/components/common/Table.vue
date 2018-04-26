<template>
 <div id="report" class="ucredit-table" style=" width:auto;margin:0 auto;" >
      <div class="ucredit-table-box" >
      
        <div class="ucredit-table-header ">
          <table  cellspacing="0" cellpadding="0" border="0"  >
            <thead  class="ucredit-table-head">
              <tr v-for="thRow in title">
                <th v-for="h in thRow"  :colspan="h.colspan" :rowspan="h.rowspan"><div :style="{width:h.width+'px'}"><a href="javascript:Void(0)"  v-show="false"  @click="">{{h.title}}</a><span>{{h.title}}</span></div></th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="ucredit-table-content " @scroll="scrollHeader" :style="{'max-height': height+'px'}">
          <table cellspacing="0" cellpadding="0" border="0">
            <tbody  class="ucredit-table-body">
              <tr v-for="item in list">
                <td v-for="(col, index) in columns" ><div :style="{width:col.width+'px'}">{{item[col.column]}}</div></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- pin  in the first  colomns when scrolling left or right -->
        <div class="ucredit-table-fixed ucredit-table-fixed-l" >
          <div class="ucredit-table-header ">
            <table  cellspacing="0" cellpadding="0" border="0" >
              <thead  class="ucredit-table-head">
                <tr v-for="(thRow,rowindex) in title" v-if="rowindex==0">
                  <th v-for="(h,index) in thRow"  :colspan="h.colspan" :rowspan="h.rowspan" 

                  :style="{width:h.width+'px', height:(h.rowspan || 1)*28.5+'px' }" v-if="index<leftFixed">
                  <div :style="{width:h.width+'px' }">{{h.title}}</div></th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="ucredit-table-content " :style="{'max-height':(height-16)+'px'}">
            <table cellspacing="0" cellpadding="0" border="0" >
            <tbody  class="ucredit-table-body">
              <tr v-for="item in list">
                <td v-for="(col, index) in columns"   v-if="index<leftFixed"><div :style="{width:col.width+'px'}">{{item[col.column]}}</div></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div> 
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: [],
      columns: [],
      list: [],
      height: 200,
      leftFixed: 1
    }
  },
  computed: {},
  mounted () { 
    this.initialize();
    this.justify();
  },
  methods: {
    scrollHeader(e){
      var el = e.target, 
        scrollLeft = el.scrollLeft, 
        scrollTop = el.scrollTop;
        console.info(scrollLeft,scrollTop);
      $('.ucredit-table :not(.ucredit-table-fixed) .ucredit-table-header').scrollLeft(scrollLeft);
      $('.ucredit-table .ucredit-table-fixed .ucredit-table-content').scrollTop(scrollTop);
      this.justify(scrollTop);
    },
    justify(scrollTop){
      $('.ucredit-table .ucredit-table-fixed .ucredit-table-content table').css('transform','translateY(-'+scrollTop+'px)');
    },
    initialize(){
      this.$store.dispatch('GetReportData').then((rp) => {
        console.log(rp);
        if(!rp || !rp.data) return;
        this.title = rp.data.title;
        this.list =  rp.data.data;
        this.generateColumns();
        this.leftFixed = 2;
      }).catch(() => {

      })
    },
    generateColumns(){
      this.title[0].forEach((item)=>{
        if(item.column) {
          this.columns.push(item);
          return;
        }
        var secondTitle = this.title[1].concat();
        if(item.colspan > 0 && secondTitle && secondTitle.length > 0 ){
          var arr = secondTitle.splice(0, item.colspan);
          if(arr.length > 0){
            this.columns = this.columns.concat(arr);
          }
        }
      });
    }
  },
  components: {
    
  },
}
</script>

<style >
  
  .main-body {
    width : 100%;
    height : 100%;
  }



 .ucredit-tabs {
    width: 100%;
    margin: 0;
    padding: 0;
    display: table;
    margin-top: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;

  }

  .ucredit-tabs .ucredit-title{
    width: 100%;
    margin: 0;
    padding: 0;
    display: table;
    cursor: pointer;
    border: 2px solid #f2f2f2;
    border-radius: 20px;
    background-color: #F2F2F2;
    box-sizing: border-box;
    display:flex;
    justify-content: space-around;
    
  }

  .ucredit-tabs .ucredit-title li {
    list-style: none;
    flex:1;
    float: left;
    text-align: center;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    margin: 0;
    padding: 0 5px;
    border-radius: 20px;
    background-color: #F2F2F2;
    color: #000000;
    box-sizing: border-box;
  
  }

  .ucredit-tabs .ucredit-title li.active{
    background-color: #FFFFFF;
    color: #FDB76F;
  }


  .ucredit-table {
          font-size: 12px;
          color: rgba(0,0,0,.65);
          max-height: 100%;
          overflow: hidden;
          font-family: '微软雅黑';
          margin:0;
          padding:0;
          border-width: 1px;
        }

        .ucredit-table .ucredit-table-box{
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .ucredit-table table {
          width: auto;
          border-collapse: collapse;
          border-spacing: 0;
          text-align: left;
          border:1px solid #e6e6e6;
          box-sizing: border-box;
          position: relative;
          margin:0;
          background-color: #ffffff;
        }

        .ucredit-table table td,.ucredit-table table th{
          box-sizing: border-box;
          border-right:1px solid #e6e6d6;
          border-bottom:1px solid #e6e6d6;
        }


        .ucredit-table th div,.ucredit-table td div{
          height: 28px;
          line-height: 28px;
          padding: 0 15px;
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          box-sizing: border-box;
        }

        .ucredit-table-header {
          z-index: 1;
          overflow: hidden;
          margin-bottom: -1px;
        }

        .ucredit-table-header table tr th{
          background: #939DA6;
        }

        .ucredit-table, .ucredit-table-content {
          position: relative;

        }

        .ucredit-table-content {
            overflow: auto;
        }
    

        .ucredit-table-tbody tr td,.ucredit-table-thead tr th {
          border-right: 1px solid #e9e9e9;
          padding: 16px 8px;
          word-break: keep-all;
          white-space: nowrap;
        }

        .ucredit-table-tbody tr td {
          border-bottom: 1px solid #e9e9e9;
        }


        .ucredit-table-thead tr th {
          background: #f3f3f3;
          font-weight: 700;
          text-align: left;
          white-space: nowrap;
        }

        .ucredit-table-fixed {
          position: absolute;
          left: 0;
          top: 0;
        }

        .ucredit-table-fixed .ucredit-table-content {
          overflow: hidden;
        }

        .ucredit-table-fixed-l {
          box-shadow: 0 -1px 8px rgba(0,0,0,.08);
          overflow: hidden;
        }
        @media screen and (max-width:768px){
          .ucredit-table-fixed-l .ucredit-table-content{
            overflow: hidden;
            max-height:100% !important;
          }
        }
</style>
