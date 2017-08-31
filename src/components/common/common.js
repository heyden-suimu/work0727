import {change_text,instype} from "../../service/data"
let getPrams = function (url) {
	if(url.indexOf("?") == -1){return}
	var pram = url.split("?")[1];
	pram = pram.split("&");
	var prams = {},pra=[];
	for (var i = 0; i < pram.length; i++) {
		 pra = pram[i].split("=");
		 prams[pra[0]] = pra[1];
	}
	return prams;
}
// 输入框判读
 let inputCheck =  function(arr,vm){
 	try{
	 	for(let i=0,len=arr.length;i<len;i++){
	 			if(!arr[i][3]) arr[i][3] ="error";		
	 			if(arr[i][0]&&!arr[i][2]){
	 				vm.$message({
		 				type:arr[i][3],
		 				message:arr[i][1],
		 			})
		 			return -1;
	 			}
	 			if(arr[i][0]&&(arr[i][2] instanceof Function)){
		 				arr[i][2](); 				
	 			}	 				 				
		 } 			
 	}catch(e){
 		console.log(e)
	}
 }

let Cookie = {
	//设置cookie
	setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        document.cookie = cname + "=" + cvalue + ";path=/;expires=" + d.toUTCString();
    },
    //获取cookie
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    //清除cookie
    clearCookie: function (cname) {
        this.setCookie(cname, "", -1);
    },
}
// 退出
let exit = (vm)=>{
	if(!sessionStorage.userInfo||!sessionStorage.login){
		layer("warning","先请登录",vm);
		sessionStorage.clear();
		vm.$router.push("/login");
	} 

}
// 弹窗
let layer = (type="error",message,vm)=>{
    vm.$message({
            type:type,
            message:message
    })
}
//数据解析（针对表格）
let  analyzeTabel = (souce,req={},desti=[],rule=(res)=>true)=>{
	let obj = {},back = [];
	if(souce instanceof Array){	
			souce.map((item)=>{
				let obj = new Object();
				// obj["name"] = souce[item]
				desti.map((value)=>{
					if(req[item].hasOwnProperty(value)){
						obj[value] = req[item][value];						
					}else{
						obj[value] = req[item]
					}									
				})
				back.push(obj);
		})		
	}else if(souce instanceof Object){
		for (var item in souce){
			let obj = new Object();
			desti.map((value)=>{
				if(req[item].hasOwnProperty(value)){
					obj[value] = req[item][value];					
				}else if(value == "chinese"){
					obj[value] = souce[item]
				}else{
					obj[value] = req[item]	
				}									
			})
			back.push(obj);
		}
	}
	return  back.filter(res => rule(res));
}
// 过滤表格数据
let fliterBaoe = (listitem)=>{
    let arr = analyzeTabel(instype,listitem,["chinese","BaoE","BaoFei"],getfilter);
    arr.map((item,index)=>{
        if(item.chinese == instype.BoLi||item.chinese == instype.HcXiuLiChang){
            item.BaoE = change_text.BoLi[item.BaoE]
        }else if(item.BaoE == 1){
            item.BaoE = "投保"
        }
    })
    return arr;
    function  getfilter(item){
        return item["BaoE"]>0
    }
}
// 下拉框范围
let slectNum = (end,start=0)=>{
	let arr = [];
	for(var i=start;i<=end;i++){
		arr.push(i)
	}
	return arr;
}
// 搜索框条件
let serachInput = (obj,arr)=>{
	for(var key in obj){
		if(obj[key]&&!(obj[key] instanceof Object)){
			arr = arr.filter((item)=>{
				if(!item[key]) return;
				return  item[key].indexOf(obj[key])!= -1;
			})
		}else if(obj[key]&&obj[key]["value"]&&(obj[key] instanceof Object)){
			if(obj[key].type == "text"){
				arr = arr.filter((item)=>{
					if(item[obj[key]["name"]]&&item[obj[key]["name"]][key]){
						return  item[obj[key]["name"]][key].indexOf(obj[key]["value"])!= -1;
					}				
				})
			}else if(obj[key].type == "datetimerange"&&obj[key]["value"][0]&&obj[key]["value"][1]){
				arr = arr.filter((item)=>{
						if(!item.reinfo) return;
						var date;
						if(!obj[key]["name"]) {
							date = new Date(item[key])
						}else{
							date = new Date(item[obj[key]["name"]][key])
						}
						// debugger
						return  date.getTime()>=obj[key]["value"][0].getTime()&&date.getTime()<obj[key]["value"][1].getTime();			
				})
			}else if(obj[key].type == "date"){
				arr = arr.filter((item)=>{
						if(!item.reinfo) return;
						let date = new Date(item[obj[key]["name"]][key])
						return  date.getTime()<=obj[key]["value"].getTime();			
				})
			}else if(obj[key].type == "changetext"){
				arr = arr.filter((item)=>{
					if(item[obj[key]["name"]]&&item[obj[key]["name"]][key]){
						return  change_text.suboffer[item[obj[key]["name"]][key]].indexOf(obj[key]["value"])!= -1;
					}				
				})
			}	
		} 
	}
	return arr
}
// 初始化数据赋值
let initData = (vm,res,arr) => {
	if(vm instanceof Object&&!(vm instanceof Array)){
		for(let val of arr){
			if(res[val]) vm[val] = res[val];
		}
	}else if(vm instanceof Array){
		let obj ={};
		for(let val of arr){
			obj[val] = res[val];
		}
		return obj;
	}
	
}
// 日期格式
let DateTo = (date)=>{
	var mon = date.getMonth() + 1;
	var day = date.getDate();
	var nowDay = date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
	return nowDay
} 
export {getPrams,inputCheck,Cookie,exit,layer,analyzeTabel,slectNum,serachInput,initData,DateTo,fliterBaoe}