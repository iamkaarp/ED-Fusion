export default {
  namespaced: true,
  state: {
    isbinding: false,
  },
  getters: {
    isbinding: (state) => state.isbinding,
  },
  mutations: {
    setBinding(state, payload) {
      state.isbinding = payload
    },
  },
  actions: {
    setbinding({ commit }, payload) {
      commit('setBinding', payload)
    },
  },
}
