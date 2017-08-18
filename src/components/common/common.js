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
	if(!sessionStorage.userInfo){
		layer("warning","先请登录",vm)
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
		if(obj[key]){
			arr = arr.filter((item)=>{
				return  item[key].indexOf(obj[key])!= -1;
			})
		} 
	}
	return arr
}
let initData = (vm,res,arr) => {
	if(vm instanceof Object&&!(vm instanceof Array)){
		for(let val of arr){
			vm[val] = res[val];
			console.log(val)
			console.log(vm[val])
		}

	}else if(vm instanceof Array){
		let obj ={};
		for(let val of arr){
			obj.val = vm.val;
		}
		return obj;
	}
	
} 
export {getPrams,inputCheck,Cookie,exit,layer,analyzeTabel,slectNum,serachInput,initData}