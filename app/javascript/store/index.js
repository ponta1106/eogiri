import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      count: 0,
      character: 'Gabiyama is genius!'
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    incrementActions(context) {
      context.commit('increment')
    }
  }
})