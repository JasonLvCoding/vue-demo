import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const NameList = []
const count = 100

for (let i = 0; i < count; i++) {
  NameList.push(Mock.mock({
    name: '@first'
  }))
}
NameList.push({ name: 'mockPan' })





const reportData = {
    "data":[
        {
            "d_amt_rate":"9.45%",
            "category_name":"合计",
            "m_cnt_rate":"9.45%",
            "d_cnt_rate":"9.45%",
            "d_push_cnt":35,
            "d_push_amt":33745.09,
            "m_amt_rate":"9.45%",
            "m_push_cnt":63,
            "m_push_amt":12715.34
        },
        {
         "category_name": "测试1",      // 产品
         "d_amt_rate": "14.19%",           // 日金额占比
         "d_cnt_rate": "14.19%",            // 日件数占比
         "d_push_amt": 26378.76,         // 当日金额
         "d_push_cnt": 51,                     // 当日件数
         "m_amt_rate": "14.19%",          // 月金额占比
         "m_cnt_rate": "14.19%",           // 月件数占比
         "m_push_amt": 14271.26,        // 月累计金额
         "m_push_cnt": 79                     // 月累计件数
        },
        {
            "d_amt_rate":"87.16%",
            "category_name":"测试2",
            "m_cnt_rate":"87.16%",
            "d_cnt_rate":"87.16%",
            "d_push_cnt":80,
            "d_push_amt":65607.05,
            "m_amt_rate":"87.16%",
            "m_push_cnt":88,
            "m_push_amt":42991.69
        },
        {
            "d_amt_rate":"40.54%",
            "category_name":"测试3",
            "m_cnt_rate":"40.54%",
            "d_cnt_rate":"40.54%",
            "d_push_cnt":32,
            "d_push_amt":79960.99,
            "m_amt_rate":"40.54%",
            "m_push_cnt":4,
            "m_push_amt":78171.37
        }
    ],
    "title":[
        [
            {
                "colspan":1,
                "column":"category_name",
                "id":16,
                "reportType":"push_type",
                "rowNum":1,
                "rowspan":2,
                "title":"产品",
                "type":0,
                "width": 80
            },
            {
                "colspan":2,
                "id":17,
                "reportType":"push_type",
                "rowNum":1,
                "rowspan":1,
                "title":"当日",
                "type":0,
                "width": 160
            },
            {
                "colspan":2,
                "id":18,
                "reportType":"push_type",
                "rowNum":1,
                "rowspan":1,
                "title":"月累计",
                "type":0,
                "width": 160
            },
            {
                "colspan":2,
                "id":19,
                "reportType":"push_type",
                "rowNum":1,
                "rowspan":1,
                "title":"日占比",
                "type":0,
                "width": 160
            },
            {
                "colspan":2,
                "id":20,
                "reportType":"push_type",
                "rowNum":1,
                "rowspan":1,
                "title":"月占比",
                "type":0,
                "width": 160
            }
        ],
        [
            {
                "colspan":1,
                "column":"m_push_cnt",
                "id":27,
                "reportType":"push_type",
                "rowNum":2,
                "rowspan":1,
                "title":"件数",
                "type":0,
                "width": 80
            },
            {
                "colspan":1,
                "column":"d_amt_rate",
                "id":26,
                "reportType":"push_type",
                "rowNum":2,
                "rowspan":1,
                "title":"金额",
                "type":0,
                "width": 80
            },
            {
                "colspan":1,
                "column":"d_cnt_rate",
                "id":25,
                "reportType":"push_type",
                "rowNum":2,
                "rowspan":1,
                "title":"件数",
                "type":0,
                "width": 80
            },
            {
                "colspan":1,
                "column":"m_push_amt",
                "id":24,
                "reportType":"push_type",
                "rowNum":2,
                "rowspan":1,
                "title":"金额",
                "type":0,
                "width": 80
            },
            {
                "colspan":1,
                "column":"m_push_cnt",
                "id":23,
                "reportType":"push_type",
                "rowNum":2,
                "rowspan":1,
                "title":"件数",
                "type":0,
                "width": 80
            },
            {
                "colspan":1,
                "column":"d_push_amt",
                "id":22,
                "reportType":"push_type",
                "rowNum":2,
                "rowspan":1,
                "title":"金额",
                "type":0,
                "width": 80
            },
            {
                "colspan":1,
                "column":"d_push_cnt",
                "id":21,
                "reportType":"push_type",
                "rowNum":2,
                "rowspan":1,
                "title":"件数",
                "type":0,
                "width": 80
            },
            {
                "colspan":1,
                "column":"m_push_amt",
                "id":29,
                "reportType":"push_type",
                "rowNum":2,
                "rowspan":1,
                "title":"金额",
                "type":1,
                "width": 80
            }
        ]
    ]
}



function generator(data){
    var jsonData = JSON.parse(JSON.stringify(data)), field = "m_push_year", resData = [];
    jsonData.title[0].unshift({
        "colspan":1,
        "column": field,
        "id":30,
        "reportType":"push_type",
        "rowNum":1,
        "rowspan":2,
        "title":"年份",
        "type":0,
        "width": 80
    });
    var year = 2015, arr ;
    while(year <= 2018){ 
        arr = jsonData.data.map(item=>{
            return $.extend({},item,{[field]: year});
        });
        resData.splice(0,0,...arr)
        year++;
        console.log(arr);
    }
    console.log(resData);
    return {data: resData, title: jsonData.title}
}



export default {
  searchUser: config => {
    const { name } = param2Obj(config.url)
    const mockNameList = NameList.filter(item => {
      const lowerCaseName = item.name.toLowerCase()
      if (name && lowerCaseName.indexOf(name.toLowerCase()) < 0) return false
      return true
    })
    return { items: mockNameList }
  },
  report: config => {
    return generator(reportData)
  }
}
