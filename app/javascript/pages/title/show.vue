<template>
  <div id="title-show">
    <transition name="drop" appear>
      <h3>お題 : {{ selectedTitle.theme }}
      </h3>
    </transition>
    <div class="container">
      <router-link :to="{name: 'TitleIndex'}">お題一覧へ</router-link>
      <ul>
        <li
          v-for="(reply, index) in replies" :data-index="index"
          :key="reply">
          {{ index }} . {{ reply.reply_title }} - {{ reply.user_name }}
        </li>
      </ul>
      <transition name="drop" appear>
        <div class="new-reply-form">
          <div class="new-reply-wrapper">
            <p class="add-reply">回答投稿フォーム</p>
            <label for="reply_title">回答</label>
            <br>
            <input
              type="text"
              id="reply_title"
              v-model="newReply.reply_title">
            <br>
            <label for="user_name">お名前</label>
            <br>
            <input
              type="text"
              id="user_name"
              v-model="newReply.user_name">
            <br>
            <button
              @click="handleCreateNewReply"
            >お題を投稿する</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TitleShow',
  data() {
    return {
      newReply: {
        title_id: null,
        reply_title: '',
        user_name: '',
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
      'createNewReply',
    ]),
    async handleCreateNewReply() {
      // 空欄だったら、投稿せずに、アラートを表示します
      if(this.newReply.user_name == '' || this.newReply.reply_title == ''){
        alert('「回答」と「お名前」を入力してください。');
        return;
      } else {
        try{
          this.newReply.title_id = this.$route.params.id;
          await this.createNewReply(this.newReply)
          this.newReply.reply_title = ''
          this.newReply.user_name = ''
        } catch(error) {
          console.log(error)
        }
      }
    }
  },
  created() {
    const route = this.$route.params.id
    this.fetchReplies(route);
  }

}
</script>
