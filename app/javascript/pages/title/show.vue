<template>
  <div id="title-show">
    <h3>タイトル詳細</h3>
    <div class="container">
      <router-link :to="{name: 'TitleIndex'}">お題一覧へ</router-link>
      <h4>お題 : {{ selectedTitle.theme }}
        <small>投稿者 : {{ selectedTitle.user_name }}</small>
      </h4>
        <ul>
          <li
            v-for="(reply, index) in replies" :data-index="index"
            :key="reply">
            {{ index }} . {{ reply.reply_title }} - {{ reply.user_name }}
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters([
      'titles',
      'replies'
    ]),
    selectedTitle() {
      //rootの:title_idと一致するtitleのみを取得
      return this.titles.find(title => {
        return title.id == this.$route.params.id;
      })
    }
  },
  methods: {
    ...mapActions([
      'fetchReplies',
      'createNewReplies',
    ])
  },
  created() {
    const title = this.$route.params.id
    this.fetchReplies(title);
  }

}
</script>

<style scoped>

#title-show {
  background-color: #dcdfbf;
}

.container {
  width: 60%;
  margin-left: 50px;
  min-height: 100vh;
}

a {
  color: #fff;
  padding: 10px;
  text-decoration: none;
  border-radius: 10px;
  background-color: salmon;
}

</style>