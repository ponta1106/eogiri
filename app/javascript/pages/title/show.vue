<template>
  <div id="title-show">
    <div class="container mx-auto h-96 w-5/6 p-3 m-3 bg-dark">
      <h3 class="text-3xl text-center m-3">
        <span>
          <router-link
            class="text-sm py-1 px-2 bg-orange text-dark"
            :to="{ name: 'Titles' }">戻る</router-link>
        </span>
        お題 ： {{ selectedTitle.theme }}
      </h3>
      <ul class="overflow-auto text-dark bg-orange
       h-5/6 p-3">
        <li
          v-for="(reply, index) in filteredReplies" :data-index="index"
          :key="reply"
          class="hover:bg-gray-200 my-2 p-2 flex justify-between"
        >
          <div>
            {{ reply.id }} - {{ reply.reply_title }} - {{ reply.user_name }}
            <img
              :src="reply.image_url"
              class="h-52"
            >
          </div>
          <div>
            <button
              @click="handleUpdateReply(reply)"
              class="m-2 p-2 bg-dark text-orange"
            >{{ reply.favorite }} <small>いいね！</small></button>
            <button
              class="m-2 p-2 bg-dark text-orange"
              @click="handleDeleteReply(reply)"
            >削除</button>
          </div>
        </li>
        <li v-show="filteredReplies.length == 0">
          このお題は、まだ回答がありません。画面下部のフォームから回答してくれたら嬉しいです。
        </li>
      </ul>
    </div>
    <form class="container mx-auto xl:flex absolute bottom-0 left-0 w-screen">
      <div class="sm:flex mb-3 xl:mb-0 flex-1 justify-around">
        <div class="sm:flex sm:items-center">
          <div>
            <label class="block font-bold sm:text-right mb-1 sm:mb-0 pr-4" for="inline-theme">
              回答
            </label>
          </div>
          <div>
            <input
              class="focus:ring-2 focus:ring-orange bg-gray-100 appearance-none border-2 border-gray-200 py-2 px-4 mx-4 text-dark leading-tight focus:outline-none focus:bg-white focus:border-blue"
              id="inline-theme"
              type="text"
              name="reply_title"
              v-model="newReply.reply_title">
          </div>
        </div>
        <div class="sm:flex sm:items-center">
          <div>
            <label
              class="block font-bold sm:text-right mb-1 sm:mb-0 pr-4" for="inline-user-name">
              お名前
            </label>
          </div>
          <div>
            <input class="focus:ring-2 focus:ring-orange bg-gray-100 appearance-none border-2 border-gray-200 py-2 px-4 mx-4 text-dark leading-tight focus:outline-none focus:bg-white focus:border-blue"
            id="inline-user-name"
            type="text"
            name="user_name"
            v-model="newReply.user_name">
          </div>
        </div>
      </div>
      <div class="sm:flex mb-0 flex-1 justify-around">
        <div class="sm:flex mb-2 sm:mb-0">
          <div class="relative text-dark bg-orange flex justify-center items-center hover:cursor-pointer w-5/6">
            <div class="absolute">
              <div class="flex flex-col items-center ">
                <span class="block font-normal">ファイルを選択</span>
              </div>
            </div>
            <input
              id="image"
              type="file"
              name="image"
              class="opacity-0"
              @change="handleChange"
            >
          </div>
        </div>
        <div class="md:flex md:items-center">
          <button
            class="text-dark shadow bg-orange py-2 px-6 w-full" type="button"
            @click="handleCreateNewReply">
            回答
          </button>
        </div>
      </div>
    </form>
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
        reply_title: null,
        user_name: null,
        favorite: 0,
      },
      uploadImage: null
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
      'deleteReply',
    ]),
    async handleChange(event) {
      this.uploadImage = event.target.files[0]
    },
    async handleCreateNewReply() {
      const formData = new FormData()
      formData.append("title_id", this.$route.params.id);
      formData.append("user_name", this.newReply.user_name);
      formData.append("reply_title", this.newReply.reply_title);
      formData.append("favorite", this.newReply.favorite);
      if(this.uploadImage) formData.append("image", this.uploadImage);
      this.newReply.title_id = this.$route.params.id
      // 空欄だったら、投稿せずに、アラートを表示します
      if(this.newReply.user_name == '' || this.newReply.reply_title == ''){
        alert('「回答」と「お名前」を入力してください。');
        return;
      } else {
        try{
          await this.createNewReply(formData)
          this.newReply.reply_title = ''
          this.newReply.user_name = ''
        } catch(error) {
          console.log(error)
        }
      }
    },
    async handleUpdateReply(reply) {
      reply.favorite += 1;
      console.log(reply)
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
