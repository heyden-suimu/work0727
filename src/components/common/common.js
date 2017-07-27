var getPrams = function (url) {
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
 var inputCheck =  function(arr,vm){
 	try{
	 	for(let i=0,len=arr.length;i<len;i++){		
	 			if(arr[i][0]&&!arr[i][2]){
	 				vm.$message({
		 				type:"error",
		 				message:arr[i][1]
		 			}).then(()=>{
		 				return
		 			})
	 			}
	 			if(arr[i][0]&&arr[i][2]){
		 				arr[i][2](); 				
	 			}	 				 				
		 } 			
 	}catch(e){
 		console.log(e)
	}
 }

export {getPrams,inputCheck}