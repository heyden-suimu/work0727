import fetch from '../config/fetch'
// 获取版本列表
var getVerlist = ()=>fetch("GET","/api/v1/ota/historyota",{})
// 删除版本
var deleteVer = (id)=>fetch("POST","/api/v1/ota/deleteota",{
	id:id
})
// 添加版本
var add_Ver = (prams)=>fetch("POST","/api/v1/ota/uploadota",prams)
// 更新版本信息
var ud_Ver = (prams)=>fetch("post","/api/v1/ota/updateota"+prams,{})
// 得到文件映射列表
var getOtaId = ()=>fetch("get","/api/v1/ota/idfilename",{})
// 发布
var publishVer = (id)=>fetch("post","/api/v1/ota/releaseota",{
	id:id
})
// 获取可用版本来源
var getavList = (type)=>fetch("GET","/api/v1/ota/historyversion",{
	type:type
})
export {getVerlist,deleteVer,add_Ver,getOtaId,ud_Ver,publishVer,getavList}
