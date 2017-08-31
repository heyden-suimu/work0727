import {
	login,
	getCity,
	getxbInfo,
	orderlist
} from '../service/getData'
import{
	tkUrl
}from '../service/data'
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
		let loginData = JSON.parse(sessionStorage.getItem("login"));
		let data = await login(loginData.username,loginData.password);
		sessionStorage.setItem("userInfo",JSON.stringify(data.res));
		commit(USER_INFO,data.res)	
	},
	async getCityInfo({
		commit,
		state
	}) {
		let data = await getCity();
		sessionStorage.setItem("cityInfo",JSON.stringify(data.res));
		commit(CITY_INFO,data.res)
		
	},
	async getXbInfo({
		commit,
		state
	}) {
		let data = JSON.parse(sessionStorage.getItem('xbpram'));
		commit(XB_INFO,data)
	},
	async getOrderList({
		commit,
		state
	}) {
		let data = await orderlist({username:JSON.parse(sessionStorage.userInfo).username});
		commit(ORDER_LIST,data.res)
		
	},
}