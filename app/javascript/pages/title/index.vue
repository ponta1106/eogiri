<template>
  <div id="title-index">
    <p class="title">{{ message }}</p>
    <div class="container">
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
      >お題を投稿する</button>
    </div>
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

.container {
  width: 60%;
  margin: 0 auto;
}

.title {
  width: 20%;
  margin: 50px auto;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px #8799ad;
}

ul {
  padding: 0;
  list-style: none;
}

ul li {
  margin: 20px;
  padding: 20px 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px #8799ad;
}

input {
  border: none;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px #8799ad;
}

button {
  width: 50%;
  border: none;
  padding: 10px;
  color: #8799ad;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 5px 5px #8799ad;
}

</style>