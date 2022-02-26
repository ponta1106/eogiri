import axios from 'axios'
import { createStore } from 'vuex'

export const store = createStore({
  state () {
    return {
      titles: [],
      replies: []
    }
  },
  getters: {
    titles: state => state.titles,
    replies: state => state.replies
  },
  mutations: {
    setTitles: (state, titles) => {
      state.titles = titles
    },
    setReplies: (state, replies) => {
      state.replies = replies
    },
    addTitle: (state, title) => {
      state.titles.unshift(title)
    },
    addReply: (state, reply) => {
      state.replies.unshift(reply)
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
    fetchReplies({ commit }) {
      return axios.get(`/api/titles/${this.$route.params.id}/replies`)
        .then(res => {
          commit('setReplies', res.data)
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
    createNewReply({ commit }, reply) {
      return axios.post('api/titles/:id/replies', reply)
        .then(res => {
          commit('addReply', res.data)
        })
        .catch(err => {
          console.log(err.response)
          alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
        })
    },
  }
})
