import {
	USER_INFO,
} from './mutation-types.js'

export default {
	// 记录用户信息
	[USER_INFO](state, userinfo) {
		state.userinfo = userinfo;
	},
}