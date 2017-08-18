import fetch from '../config/fetch'
import {baseUrl} from '../config/env'

// 登录
var  login = (name,password)=>fetch("post","/api/v1/insurance/login",{
	username:name,
	password:password
})
// 注册
var register = (prams={})=>fetch("post","/api/v1/insurance/user",prams)
//编辑用户信息
var updateuser = (prams={})=>fetch("patch","/api/v1/insurance/user",prams)
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
// 订单分配
var disOrder = (obj={})=>fetch("post","/api/v1/insurance/order",obj);
// 回收订单
var delOrder = (orderId="",userId="")=>fetch("delete","/api/v1/insurance/order",{
		orderId:orderId,
		userId:userId
});
// 获取下级列表
var getsuperior = (obj={})=>fetch("get","/api/v1/insurance/user",obj);
// 获取核保信息
var getHebao = (obj={})=>fetch("get","/api/v1/insurance/submitinfo2",obj);
// 修改出单信息
var patchOrder = (obj={})=>fetch("patch","/api/v1/insurance/order",obj);
// 获取出单信息
var getOrder = (obj={})=>fetch("get","/api/v1/insurance/order",obj);
// 发送报价短信
var sendMsg = (phone,msg)=>fetch("post","/api/v1/sms/car",{
	phoneNumber:phone,
	message:msg
});
// 获取青牛token
var getToken = ()=>fetch("get","/api/v1/insurance/uploadToken",{})
export {login,register,next_userlist,getCity,getxbInfo,orderlist,reqOrder,
		disOrder,getsuperior,delOrder,getHebao,patchOrder,getOrder,updateuser,sendMsg,getToken}
