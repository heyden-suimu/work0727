import {
	login,
	getCity,
	getxbInfo,
	orderlist
} from '../service/getData'
import{
	Cookie,
}from '../components/common/common'
import {
	USER_INFO,
	CITY_INFO,
	XB_INFO,
	ORDER_LIST,
} from './mutation-types.js'



export default {
	async getUserInfo({
		commit,
		state
	}) {
		if(!state.userinfo.userId){
			let loginData = JSON.parse(Cookie.getCookie("login"));
			let data = await login(loginData.username,loginData.password);
			commit(USER_INFO,data.res)
		}
		
	},
	async getCityInfo({
		commit,
		state
	}) {
		if(!state.cityInfo){
			let data = await getCity();
			commit(CITY_INFO,data.res)
		}
		
	},
	async getXbInfo({
		commit,
		state
	}) {
		if(!state.xbInfo.LicenseNo){
			let data = JSON.parse(sessionStorage.getItem('xbpram'));
			commit(XB_INFO,data)
		}
	},
	async getOrderList({
		commit,
		state
	}) {
		if(!state.orderlist){
			let data = await orderlist({username:JSON.parse(Cookie.getCookie("login")).username});
			commit(ORDER_LIST,data.res)
		}
		
	},
}