<template>
  <div id="title-index">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
    <ul>
      <li v-for="title in titles" :key="title.index">
        {{ title.id }} - {{ title.theme }} - {{ title.user_name }}
      </li>
    </ul>
    <label for="theme">タイトル</label>
    <input type="text" id="theme" v-model="newTitle.theme">
    <br>
    <label for="user_name">ユーザー名</label>
    <input type="text" id="user_name" v-model="newTitle.user_name">
    <br>
    <button
    @click="handleCreateNewTitle"
    >お題を投稿</button>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TitleIndex',
  data() {
    return {
      message: 'お題一覧',
      replies: [],
      newTitle: {
        user_name: '',
        theme: ''
      }
    }
  },
  computed: {
    ...mapGetters(['titles'])
  },
  methods: {
    ...mapActions(['createNewTitle', 'fetchTitles']),
    fetchReplies() {
      axios.get("api/titles/1/replies")
        .then(res => this.replies = res.data)
        .catch(err => console.log(err.status));
    },
    async handleCreateNewTitle() {
      try{
        await this.createNewTitle(this.newTitle);
      } catch(error) {
        console.log(error)
      }
    }
  },
  created() {
    this.fetchTitles();
  }
}
</script>

<style scoped>

#title-index {
  background-color: #bccfc9;
}

ul {
  list-style: none;
}

</style>