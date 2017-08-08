import {
	USER_INFO,
	CITY_INFO,
	XB_INFO,
	ORDER_LIST,
} from './mutation-types.js'

export default {
	// 记录用户信息
	[USER_INFO](state, userinfo) {
		state.userinfo = userinfo;
	},
	[CITY_INFO](state, cityInfo) {
		state.cityInfo = cityInfo;
	},
	[XB_INFO](state, xbInfo) {
		state.xbInfo = xbInfo;
	},
	[ORDER_LIST](state, orderlist) {
		state.xbInfo = orderlist;
	},
}