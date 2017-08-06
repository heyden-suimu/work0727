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

export {login,register,next_userlist}
