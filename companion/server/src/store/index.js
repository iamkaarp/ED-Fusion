import Vue from 'vue'
import Vuex from 'vuex'

import keybind from './modules/keybind'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    keybind,
  },
})
