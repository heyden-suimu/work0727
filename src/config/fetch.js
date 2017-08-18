import {
	baseUrl
} from './env'

export default async(type = 'GET', url = '', data = {},go = 'fetch',file="") => {
	type = type.toUpperCase();
	if(url.indexOf("http") == -1)  url = baseUrl + url;
	
	if (type == 'GET'||type == 'DELETE') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	if (null) {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'text/plain'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		try {
			var response = await fetch(url, requestConfig);
			var responseJson = await response.json();
		} catch (error) {
			throw new Error(error)
		}
		return responseJson
	} else {
		let ajaxPromise = new Promise(function(resolve,reject){
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = data;
			if (type == 'POST'||type=="DELETE"||type=="PATCH"){
				sendData = JSON.stringify(sendData);
			}
			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/json");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response;
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
		return ajaxPromise;
	}
}