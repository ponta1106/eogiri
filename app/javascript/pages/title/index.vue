<template>
  <div id="title-index">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
    <button @click="increment">UP</button>
    <p>{{ $store.state.count }}</p>
    <p>タイトル一覧</p>
    <ul>
      <li v-for="title in titles" :key="title.index">
        {{ title.id }} - {{ title.theme }} - {{ title.user_name }}
      </li>
    </ul>
    <p>リプライ一覧</p>
    <ul>
      <li v-for="reply in replies" :key="reply.index">
        {{ reply.id }} - {{ reply.reply_title }} - {{ reply.user_name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TitleIndex',
  data() {
    return {
      message: 'This is Title Index Page!',
      titles: [],
      replies: []
    }
  },
  methods: {
    increment() {
      this.$store.dispatch('incrementActions')
    },
    fetchTitles() {
      axios.get("api/titles")
        .then(res => this.titles = res.data)
        .catch(err => console.log(err.status));
    },
    fetchReplies() {
      axios.get("api/titles/1/replies")
        .then(res => this.replies = res.data)
        .catch(err => console.log(err.status));
    },
  },
  created() {
    this.fetchTitles();
    this.fetchReplies();
  }
}
</script>

<style scoped>

#title-index {
  background-color: #bccfc9;
}

</style>