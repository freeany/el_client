import Vue from 'vue'
import Vuex from 'vuex'

import state from './State'
import getters from './Getter'
import mutations from './Mutation'
import actions from './Aciton'

Vue.use(Vuex)
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})