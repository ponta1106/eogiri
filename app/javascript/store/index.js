import axios from 'axios'
import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      titles: []
    }
  },
  getters: {
    titles: state => state.titles
  },
  mutations: {
    setTitles: (state, titles) => {
      state.titles = titles
    },
    addTitle: (state, title) => {
      state.titles.push(title)
    }
  },
  actions: {
    fetchTitles({ commit }) {
      return axios.get('api/titles')
        .then(res => {
          commit('setTitles', res.data)
        })
        .catch(err => {
          console.log(err.response)
          alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
        })
    },
    createNewTitle({ commit }, title) {
      return axios.post('api/titles', title)
        .then(res => {
          commit('addTitle', res.data)
        })
        .catch(err => {
          console.log(err.response)
          alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
        })
    },
  }
})
