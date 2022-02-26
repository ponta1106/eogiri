<template>
  <div id="title-show">
    <h3>タイトル詳細</h3>
    <div class="container">
      <router-link :to="{name: 'TitleIndex'}">お題一覧へ</router-link>
      <h4>お題 : {{ selectedTitle[0].theme }}
        <small>投稿者 : {{ selectedTitle[0].user_name }}</small>
      </h4>
        <ul>
          <li
            v-for="(reply, index) in replies" :data-index="index"
            :key="reply">
            {{ reply.id }} . {{ reply.reply_title }} - {{ reply.user_name }}
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'TitleShow',
  data() {
    return {
      newReplay: {
        title_id: null,
        newReplay_title: '',
        user_name: '',
        favorite: 0,
      }
    }
  },
  computed: {
    ...mapGetters(['titles', 'replies']),
    selectedTitle() {
      return this.titles.filter(title => {
        return title.id == this.$route.params.id;
      })
    }
  },
  methods: {
    getReplies() {
      axios.get(
        `/api/titles/${this.$route.params.id}/replies`
      )
        .then(res => {
          this.$store.commit('setReplies', res.data)
        })
        .catch(err => {
          console.log(err.response)
          alert('通信に失敗しました。インターネットが繋がっているか確認し、再度実行してください。')
        })
    }
  },
  created() {
    this.getReplies();
  }

}
</script>

<style scoped>

#title-show {
  background-color: #d0d2d1;
}

.container {
  width: 60%;
  margin-left: 50px;
  min-height: 100vh;
}

</style>