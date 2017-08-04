import {
	USER_INFO,
} from './mutation-types.js'

export default {
	// 记录当前经度纬度
	[USER_INFO](state, userinfo) {
		state.userinfo = userinfo;
		state.gi=2;
	},
}