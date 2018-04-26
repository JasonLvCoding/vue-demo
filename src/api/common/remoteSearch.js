import fetch from '@/utils/fetch'

export function userSearch(name) {
  return fetch({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}

export function getReportData(){
	return fetch({
		url: '/search/report',
    	method: 'POST',
    	params: {  }
	})
}
