<template>
  <div id="title-show" class="relative">
    <div class="container p-10 m-10 mx-auto bg-blue-100 rounded-md text-blue-900 rounded-md rounded-md">
      <h3 class="text-3xl text-center mb-2">{{ selectedTitle.theme }} <span><small>{{ selectedTitle.user_name }}</small></span></h3>
      <ul class="h-64 overflow-auto">
        <li
          v-for="(reply, index) in replies" :data-index="index"
          :key="reply"
          class="hover:bg-blue-200 rounded-md p-2"
        >
          {{ index }} . {{ reply.reply_title }} - {{ reply.user_name }}
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
            <button class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" @click="handleCreateNewReply(); doAdd()">
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
