import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const store = createStore({
  modules: {},
  state() {
    return {}
  },
  mutations,
  actions,
  getters,
})

export default store
