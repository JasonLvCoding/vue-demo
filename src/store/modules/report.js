import { getReportData } from '@/api/common/remoteSearch'

const report = {
	state: {
		list: []
	},
	mutations: {
    	SET_REPORT_LIST: (state, list) => {
      		state.list = list
    	}
    },
    actions: {
    	GetReportData({ commit, state }) {
	      return new Promise((resolve, reject) => {
	        getReportData().then(response => {
	          commit('SET_REPORT_LIST', response.data)
	          resolve(response)
	        }).catch(error => {
	          reject(error)
	        })
	      })
	    },
    }
};


export default report


