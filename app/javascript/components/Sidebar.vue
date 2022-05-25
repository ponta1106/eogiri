<template>
  <div id="sidebar">
    <div class="min-h-screen md:w-52 bg-dark-default">
      <router-link :to="{ name: 'Top' }">
        <img
          src="../stylesheets/images/logo.png"
          alt="logo"
        >
      </router-link>
      <!-- お題一覧ページにいるときのみ表示します -->
      <div
        v-if="this.$route.name == 'Titles'"
        class="container mx-auto flex flex-col p-3"
      >
        <form
        >
          <p
            class="mb-2 p-2"
          >お題投稿フォーム</p>
          <label
            class="w-full p-2"
            for="inline-theme"
          >
            お題
          </label>
          <input
            type="text"
            id="inline-theme"
            class="text-dark-default w-full mb-2 p-2"
            v-model="newTitle.theme">
          <label
            class="w-full p-2"
            for="inline-user-name"
          >
            お名前
          </label>
          <input
            type="text"
            id="inline-user-name"
            class="text-dark-default w-full mb-2 p-2"
            v-model="newTitle.user_name">
          <button
            type="button"
            class="bg-orange-default text-dark-default w-full p-2"
            @click="handleCreateNewTitle">
            お題を投稿する
          </button>
        </form>
        <Message
          v-if="this.$route.name != 'Top'"
        />
      </div>
      <!-- お題詳細ページにいるときのみ表示します -->
      <div
        v-if="this.$route.name == 'TitleShow'"
        class="container mx-auto flex flex-col p-3"
      >
        <button
          @click="showDrawingSpace(); resetScrollY();"
          class="bg-white text-dark-default mb-2 fixed right-6 bottom-14 px-8 py-4 rounded-full z-10 filter drop-shadow text-lg"
        >
          絵を描く
        </button>
        <form>
          <p
            class="mb-2 p-2"
          >回答投稿フォーム</p>
          <label
            class="w-full"
            for="inline-theme">
            回答
          </label>
          <input
            id="inline-theme"
            type="text"
            name="reply_title"
            class="text-dark-default w-full mb-1 p-2"
            v-model="newReply.reply_title">
          <label
            class="w-full"
            for="inline-user-name"
          >
            お名前
          </label>
          <input
            id="inline-user-name"
            type="text"
            name="user_name"
            class="text-dark-default w-full mb-1 p-2"
            v-model="newReply.user_name"
          >
          <label
            for="image"
          >
            絵をえらぶ
          </label>
          <input
            id="image"
            type="file"
            name="image"
            class="w-full mb-1 p-2"
            @change="handleChange"
          >
          <button
            type="button"
            class="text-dark-default bg-orange-default w-full p-2"
            @click="handleCreateNewReply">
            回答を投稿する
          </button>
        </form>
        <Message
          v-if="this.$route.name != 'Top'"
        />
      </div>
      <ul class="flex flex-col p-3 justify-between">
        <li class="text-orange-default hover:text-dark-default hover:bg-orange-default p-2">
          <router-link :to="{ name: 'Titles' }">お題一覧</router-link>
        </li>
        <li class="text-orange-default hover:text-dark-default hover:bg-orange-default p-2">
          <router-link :to="{ name: 'TermsOfUse' }">
            <small>利用規約</small>
          </router-link>
        </li>
        <li class="text-orange-default hover:text-dark-default hover:bg-orange-default p-2">
          <router-link :to="{ name: 'PrivacyPolicy' }">
            <small>プライバシーポリシー</small>
          </router-link>
        </li>
        <li class="text-orange-default hover:text-dark-default hover:bg-orange-default p-2">
          <router-link :to="{ name: 'Contact' }">
            <small>お問合せ</small>
          </router-link>
        </li>
      </ul>
    </div>
    <DrawingSpace
      :title="selectedTitle.theme"
      v-if="isVisibleDrawingSpace"
      @close-drawing-space="closeModal"
    />
  </div>
</template>

<script>
import DrawingSpace from './DrawingSpace.vue'
import Message from './Message.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TheSidebar',
  components: {
    DrawingSpace,
    Message
  },
  data() {
    return {
      isVisibleDrawingSpace: false,
      newTitle: {
        theme: '',
        user_name: ''
      },
      newReply: {
        title_id: '',
        reply_title: '',
        user_name: '',
        favorite: 0,
      },
      uploadImage: null,
      scrollY: 0
    }
  },
  computed: {
    ...mapGetters([
      'titles',
      'replies'
    ]),
    selectedTitle() {
      return this.titles.find(title => {
        return title.id == this.$route.params.id;
      })
    },
  },
  methods: {
    ...mapActions([
      'createNewTitle',
      'createNewReply',
    ]),
    showDrawingSpace() {
      this.isVisibleDrawingSpace = true;
    },
    closeModal() {
      this.isVisibleDrawingSpace = false;
    },
    resetScrollY() {
      window.scrollTo(0, 0);
    },
    async handleCreateNewTitle() {
      // 空欄だったら、投稿せずに、アラートを表示します
      if(this.newTitle.user_name == '' || this.newTitle.theme == ''){
        alert('「お題」と「お名前」を入力してください。');
        return;
      } else {
        try{
          await this.createNewTitle(this.newTitle)
          this.newTitle.theme = ''
          this.newTitle.user_name = ''
          this.$store.commit('setContent' ,{
            content: 'お題を投稿しました！'
          })
        } catch(error) {
          console.log(error)
        }
      }
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
      if(this.newReply.user_name == '' || this.newReply.reply_title == '' || this.uploadImage == null){
        alert('「回答」、「お名前」、「画像ファイル」を入力してください。');
        return;
      } else {
        try{
          await this.createNewReply(formData)
          this.newReply.reply_title = ''
          this.newReply.user_name = ''
          this.$store.commit('setContent' ,{
            content: '回答を投稿しました！'
          })
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
