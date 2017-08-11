import fetch from '../config/fetch'
// 登录
var  login = (name,password)=>fetch("post","/api/v1/insurance/login",{
	username:name,
	password:password
})
// 注册
var register = (prams={})=>fetch("post","/api/v1/insurance/user",prams)
// 下级列表
var next_userlist =(userId)=>fetch("get","/api/v1/insurance/user",{
	userId:userId,
}) 
// 获取城市信息
var getCity = (obj={})=>fetch("get","/api/v1/insurance/city",obj)
// 获取续保信息
var getxbInfo = (obj={})=>fetch("get","/api/v1/insurance/reinfo",obj)
// 订单汇总
var orderlist = (obj={})=>fetch("get","/api/v1/insurance/pricerecord",obj)
// 请求报价并返回报价信息
var reqOrder = (obj={})=>fetch("get","/api/v1/insurance/preciseprice2",obj)
export {login,register,next_userlist,getCity,getxbInfo,orderlist,reqOrder}
