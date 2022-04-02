import { createStore } from 'vuex'

export default createStore({
  state: {
    info:{}
  },
  mutations: {
    setInfo(state,userInfo){
        state.info = userInfo || {}
    }
  },
  actions: {
  },
  modules: {
  }
})
