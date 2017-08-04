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
	 			if(arr[i][0]&&!arr[i][2]){
	 				vm.$message({
		 				type:"error",
		 				message:arr[i][1],
		 			})
		 			return
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
        document.cookie = cname + "=" + cvalue + ";path=/;expires=" + d.toGMTString();
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

let exit = (vm)=>{
    let login = JSON.parse(Cookie.getCookie("login"));
	if(!login.state) vm.$router.push("/login");    
}
export {getPrams,inputCheck,Cookie,exit}