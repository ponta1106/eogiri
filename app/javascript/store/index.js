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
      replies: [],
      // フラッシュメッセージ
      content: ''
    }
  },
  getters: {
    titles: state => state.titles,
    replies: state => state.replies,
    content: state => state.content
  },
  mutations: {
    resetContent: (state) => {
      state.content = ''
    },
    setContent: (state,{ content, timeout }) => {
      state.content = content
      timeout = 5000

      setTimeout(() => (state.content = ''), timeout);
    },
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
    },
    deleteTitle: (state, deleteTitle) => {
      state.titles = state.titles.filter(title => {
        return title.id != deleteTitle.id
      })
    },
    // 回答削除機能を実装
    deleteReply: (state, deleteReply) => {
      state.replies = state.replies.filter(reply => {
        return reply.id != deleteReply.id
      })
    },
    // お題編集機能
    updateReply: (state, updateReply) => {
      const index = state.replies.findIndex(reply => {
        return reply.id == updateReply.id
      })
      state.replies.splice(index, 1, updateReply)
    },
    // 回答編集機能
    updateReply: (state, updateReply) => {
      const index = state.replies.findIndex(reply => {
        return reply.id == updateReply.id
      })
      state.replies.splice(index, 1, updateReply)
    },
  },
  actions: {
    //フラッシュメッセージの内容を初期化
    fetchContent({ commit }) {
      commit('resetContent')
    },
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
    //お題を新規投稿
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
    //お題削除機能
    deleteTitle({ commit }, title) {
      return axios.delete(`/api/titles/${title.id}`)
        .then(res => {
          commit('deleteTitle', res.data)
        })
        .catch(err => {
          console.log(err.response)
          alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
        })
    },
    //回答一覧を取得
    fetchReplies({ commit }) {
      return axios.get('api/replies')
      .then(res => {
        commit('setReplies', res.data)
      })
      .catch(err => {
        console.log(err.response)
        alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
      })
    },
    //回答の投稿
    createNewReply({ commit }, reply) {
      return axios.post('/api/replies', reply)
      .then(res => {
        commit('addReply', res.data)
      })
      .catch(err => {
        console.log(err.response)
        alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
      })
    },
    //回答の編集
    updateReply({ commit }, reply) {
      return axios.patch(`/api/replies/${ reply.id }`, reply)
      .then(res => {
        commit('updateReply', res.data)
      })
      .catch(err => {
        console.log(err.response)
        alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
      })
    },
    //回答削除機能
    deleteReply({ commit }, reply) {
      return axios.delete(`/api/replies/${ reply.id }`)
      .then(res => {
        commit('deleteReply', res.data)
      })
      .catch(err => {
        console.log(err.response)
        alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
      })
    }
  }
})
