<template>
  <div id="title-show">
    <div class="container mx-auto h-5/6 w-11/12 p-3 m-3 bg-dark">
      <h3 class="text-3xl text-center m-3">
        <span class="text-md py-2 px-4 bg-orange-default text-dark">お題</span>
        {{ selectedTitle.theme }}
        <span>
          <router-link
            class="text-sm py-1 px-2 bg-orange-default text-dark"
            :to="{ name: 'Titles' }">戻る</router-link>
        </span>
      </h3>
      <ul
        class="flex flex-col text-dark overflow-auto h-96 p-3"
      >
        <li
          v-for="(reply, index) in filteredReplies" :data-index="index"
          :key="reply"
          class="bg-orange-default my-2 p-2 flex flex-col justify-between"
        >
          <div class="self-center bg-white rounded-md">
            <img
              :src="reply.image_url"
              class="h-24"
            >
          </div>
          <div class="self-center">
            {{ reply.id }} - {{ reply.reply_title }} - {{ reply.user_name }}
          </div>
          <div class="self-center">
            <button
              @click="handleUpdateReply(reply)"
              class="m-2 p-2 bg-dark text-orange-default"
            >{{ reply.favorite }} <small>いいね！</small></button>
            <!-- <button
              class="m-2 p-2 bg-dark text-orange-default"
              @click="handleDeleteReply(reply)"
            >削除</button> -->
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
            <label
              class="block font-bold sm:text-right mb-1 sm:mb-0 pr-4"
              for="inline-theme">
              回答
            </label>
          </div>
          <div>
            <input
              class="focus:ring-2 focus:ring-orange-default appearance-none py-2 px-4 mx-4 text-dark leading-tight focus:outline-none"
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
            <input
              class="focus:ring-2 focus:ring-orange-default appearance-none py-2 px-4 mx-4 text-dark leading-tight focus:outline-none"
              id="inline-user-name"
              type="text"
              name="user_name"
              v-model="newReply.user_name">
          </div>
        </div>
      </div>
      <div class="sm:flex mb-0 flex-1 justify-around">
        <div class="sm:flex mb-2 sm:mb-0">
          <div class="relative text-dark bg-orange-default flex justify-center items-center hover:cursor-pointer w-5/6">
            <div class="absolute">
              <div class="flex flex-col items-center ">
                <span class="block font-normal">絵を選択</span>
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
        <div class="sm:flex sm:items-center">
          <button
            class="text-dark shadow bg-orange-default py-2 px-6 w-full" type="button"
            @click="handleCreateNewReply">
            回答
          </button>
        </div>
        <div class="sm:flex sm:items-center">
          <button
            class="text-dark shadow bg-orange-default py-2 px-6 w-full"
            type="button"
            @click="showDrawingSpace"
          >
            絵を描く
          </button>
        </div>
      </div>
    </form>
    <DrawingSpace
      v-if="isVisibleDrawingSpace"
      @close-drawing-space="closeModal"
    />
  </div>
</template>

<script>
import DrawingSpace from '../../components/DrawingSpace.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TitleShow',
  components: { DrawingSpace },
  data() {
    return {
      newReply: {
        title_id: null,
        reply_title: null,
        user_name: null,
        favorite: 0,
      },
      uploadImage: null,
      isVisibleDrawingSpace: false,
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
    },
    //いいねの数が多い順に表示
    ranking() {
      return this.filteredReplies.sort(function (a, b) {
        return b.favorite - a.favorite;
      });
    }
  },
  methods: {
    ...mapActions([
      'createNewReply',
      'updateReply',
      'deleteReply',
    ]),
    showDrawingSpace() {
      this.isVisibleDrawingSpace = true;
    },
    closeModal() {
      this.isVisibleDrawingSpace = false;
    },
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
