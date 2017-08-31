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
	}else if(null) {
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
	}else{
		var tkres = await axios.get("http://api.aituyou.me:8002/api/v1/auth/getToken?appId=f5e3aa9d025745fd9e8b692413a776f8&appSecret=403622b4301945559244785130818a41")
		var jwt = tkres.data.res;

		if(type =="GET"||type=="DELETE") {
			if(url.indexOf("?") != -1){
				url +="&jwt="+jwt;
			}else{
				url +="?jwt="+jwt;
			}
		}	
		if(type =="POST"||type=="PUT"||type=="PATCH") url += "?jwt="+jwt;

		let ajaxPromise = new Promise ((resolve,reject)=>{	
			switch(type){
				case "GET":
					axios.get(url,{timeout:120000}).then((res)=>{
						resolve(res.data)
					}).catch((err)=>{
						reject(err)
					});return;
				case "POST":
					axios.post(url,data).then((res)=>{
						resolve(res.data)
					}).catch((err)=>{
						reject(err)
					});return;
				case "DELETE":
					axios.delete(url).then((res)=>{
						resolve(res.data)
					}).catch((err)=>{
						reject(err)
					});return;
				case "PUT":
					axios.put(url,data).then((res)=>{
						resolve(res.data)
					}).catch((err)=>{
						reject(err)
					});return;	
				case "PATCH":
					axios.patch(url,data).then((res)=>{
						resolve(res.data)
					}).catch((err)=>{
						reject(err)
					});return;
				}
			})
		return ajaxPromise;
	}
}