import axios from 'axios'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export const store = createStore({
  // ページをリロードしてもstateのデータが消えないように設定
  plugins: [createPersistedState(
    { // ストレージのキーを指定
      key: 'appName',
      // ストレージの種類を指定
      storage: window.sessionStorage
    }
  )],
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
    //お題一覧を取得
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
    //お題一覧を新規投稿
    createNewTitle({ commit }, title) {
      return axios.post('/api/titles', title)
      .then(res => {
        commit('addTitle', res.data)
      })
      .catch(err => {
        console.log(err.response)
        alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
      })
    },
    //お題の回答一覧を取得
    fetchReplies({ commit }, title_id) {
      return axios.get(`/api/titles/${ title_id }/replies`)
      .then(res => {
        commit('setReplies', res.data)
      })
      .catch(err => {
        console.log(err.response)
        alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
      })
    },
    //お題の回答を投稿
    createNewReply({ commit }, reply ) {
      return axios.post(`/api/titles/${ reply.title_id }/replies`, reply)
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
