import fetch from '../config/fetch'
// 登录
var  login = (name,password)=>fetch("post","/api/v1/insurance/login",{
	username:name,
	password:password
})
// 注册
var register = (prams={})=>fetch("post","/api/v1/insurance/user",prams)

export {login,register}
