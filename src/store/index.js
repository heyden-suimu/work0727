import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	userinfo:{
		userId: "",
		phoneNumber: "",
		password: "",
		username: "",
		name: "",
		level: null,
		source: [
		    {
		    	code: null,
				submitInfo: null,
				precisePrice: null,
				BizDiscount: null,
				ForceDiscount: null
			},
			{
		    	code: null,
				submitInfo: null,
				precisePrice: null,
				BizDiscount: null,
				ForceDiscount: null
			},
			{
		    	code: null,
				submitInfo: null,
				precisePrice: null,
				BizDiscount: null,
				ForceDiscount: null
			},
		],
		orderCount: null
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})