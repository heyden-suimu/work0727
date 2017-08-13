import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	userinfo:{userId:null},
	cityInfo:null,
	xbInfo:{LicenseNo:null},
	orderlist:null,
	recordInfo:{}	
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})