<template>
  <div id="title-show" class="relative">
    <div class="container h-5/6 p-3 m-3 mx-auto bg-blue-100 text-blue-900">
      <h3 class="text-3xl text-center mb-2">{{ selectedTitle.theme }} :  <span><small>{{ selectedTitle.user_name }} の回答一覧</small></span></h3>
      <ul class="overflow-auto h-5/6">
        <li
          v-for="(reply, index) in filteredReplies" :data-index="index"
          :key="reply"
          class="hover:bg-blue-200 rounded-md my-2 p-2 flex justify-between"
        >
          <dir>
            {{ reply.id }} - {{ reply.reply_title }} - {{ reply.user_name }}
          </dir>
          <div>
            <button
              @click="handleUpdateReply(reply)"
              class="rounded m-2 p-2 bg-blue-300 text-blue-900"
            >{{ reply.favorite }} <small>いいね！</small></button>
            <button
              class="rounded m-2 p-2 bg-red-300 text-red-900"
              @click="handleDeleteReply(reply)"
            >削除</button>
          </div>
        </li>
        <li v-show="filteredReplies.length == 0">
          このお題は、まだ回答がありません。画面下部のフォームから回答してくれたら嬉しいです。
        </li>
      </ul>
    </div>
    <div class="container mx-auto">
      <form class="md:flex bg-gray-200 absolute bottom-0 left-0 w-screen p-3 justify-around">
        <div class="md:flex md:items-center md:mb-0 mb-6">
          <div>
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-theme">
              回答
            </label>
          </div>
          <div>
            <input class="bg-gray-100 appearance-none border-2 border-gray-200 rounded-md py-2 px-4 mx-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-theme" type="text" v-model="newReply.reply_title">
          </div>
        </div>
        <div class="md:flex md:items-center md:mb-0 mb-6">
          <div>
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-user-name">
              お名前
            </label>
          </div>
          <div>
            <input class="bg-gray-100 appearance-none border-2 border-gray-200 rounded-md py-2 px-4 mx-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-user-name" type="text" v-model="newReply.user_name">
          </div>
        </div>
        <div class="md:flex md:items-center md:mb-0 mb-6">
          <div>
            <button class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-red text-white font-bold py-2 px-4 rounded" type="button" @click="handleCreateNewReply">
              回答
            </button>
          </div>
        </div>
      </form>
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
        favorite: 0,
      }
    }
  },
  computed: {
    ...mapGetters([
      'titles',
      'replies'
    ]),
    //rootの:idと一致するtitleのみを取得
    selectedTitle() {
      return this.titles.find(title => {
        return title.id == this.$route.params.id;
      })
    },
    //rootの:title_idと一致するrepliyのみを取得
    filteredReplies() {
      return this.replies.filter(reply => {
        return reply.title_id == this.selectedTitle.id;
      })
    }
  },
  methods: {
    ...mapActions([
      'createNewReply',
      'updateReply',
      'deleteReply'
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
    },
    async handleUpdateReply(reply) {
      reply.favorite += 1;
      try {
        await this.updateReply(reply);
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteReply(reply) {
      try {
        await this.deleteReply(reply);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
