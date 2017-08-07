import {
	login,
} from '../service/getData'
import{
	Cookie,
}from '../components/common/common'
import {
	USER_INFO,
} from './mutation-types.js'



export default {
	async getUserInfo({
		commit,
		state
	}) {
		if(!state.userinfo.name){
			let loginData = JSON.parse(Cookie.getCookie("login"));
			let data = await login(loginData.username,loginData.password);
			commit(USER_INFO,data.res)
		}
		
	},
}