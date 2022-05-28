<template>
  <div id="title-show">
    <div class="md:w-2/3 mx-auto p-3 mb-96 md:mb-3">
      <div class="mb-3">
        <router-link
          :to="{ name: 'Top' }"
          class="md:hidden"
        >
          <img
            src="../../stylesheets/images/logo.png"
            alt="logo"
            class="h-10"
          >
        </router-link>
      </div>
      <div class="flex bg-orange-default">
        <img src="../../stylesheets/images/logo.png" alt="logo" class="h-24">
        <h1 class="flex-grow text-dark-default self-center p-3">お題 「 {{ selectedTitle.theme }} 」
        </h1>
      </div>
      <h3 class="mt-4">拍手が多い順</h3>
      <div class="mt-4 w-full">
        <ul
          class="text-dark-default mb-10"
        >
          <li
            v-for="(reply, index) in ranking" :data-index="index"
            :key="reply"
            class="mb-3 bg-gray-200"
          >
            <div class="bg-white mx-auto">
              <img
                :src="reply.image_url"
                class="object-contain w-80 h-32 mx-auto"
              >
            </div>
            <div class="flex-grow bg-orange-default">
              <div class="w-80 mx-auto">
                <div class="text-center p-2">
                  タイトル 「 {{ reply.reply_title }} 」
                  <br>
                  <small>作者 「 {{ reply.user_name }} 」</small>
                </div>
                <div class="text-center p-2">
                  <button
                    @click="handleUpdateReply(reply)"
                    class="m-2 p-2 bg-dark-default text-orange-default"
                  ><small>拍手を送る</small> {{ reply.favorite }}</button>
                </div>
              </div>
            </div>
          </li>
          <p
            class="text-orange-default"
            v-show="filteredReplies.length == 0"
          >
            このお題は、まだ回答がありません。回答フォームから回答してくれたら嬉しいです。
          </p>
        </ul>
      </div>
    </div>
    <Sidebar
      class="fixed bottom-20 md:hidden"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Sidebar from '../../components/Sidebar.vue'
export default {
  name: 'TitleShow',
  components: {
    Sidebar
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
    //回答一覧を、いいねの数が多い順に表示
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
