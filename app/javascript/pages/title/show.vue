<template>
  <div id="title-show">
    <div class="container mx-auto h-5/6 w-11/12 m-3">
      <div class="flex bg-orange-default">
        <img src="../../stylesheets/images/logo.png" alt="logo" class="h-24">
        <h1 class="text-2xl text-dark-default self-center mx-auto">お題 「 {{ selectedTitle.theme }} 」
        </h1>
      </div>
      <h3 class="mt-5">はくしゅが多い順</h3>
      <div class="mt-5 w-full">
        <ul
          class="flex flex-col text-dark-default h-screen overflow-auto"
        >
          <li
            v-for="(reply, index) in ranking" :data-index="index"
            :key="reply"
            class="mb-3 flex justify-between"
          >
            <div class="bg-white w-96">
              <img
                :src="reply.image_url"
                class="object-contain w-80 h-32"
              >
            </div>
            <div class="flex-grow bg-orange-default">
              <div class="text-center p-2">
                {{ reply.reply_title }}
                <br>
                <small>by {{ reply.user_name }}</small>
              </div>
              <div class="text-center p-2">
                <button
                  @click="handleUpdateReply(reply)"
                  class="m-2 p-2 bg-dark-default text-orange-default"
                >{{ reply.favorite }} <small>はくしゅ！</small></button>
                <!-- <button
                  class="m-2 p-2 bg-dark-default text-orange-default"
                  @click="handleDeleteReply(reply)"
                >削除</button> -->
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
  </div>
</template>

<script>
import DrawingSpace from '../../components/DrawingSpace.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TitleShow',
  components: {
    DrawingSpace
  },
  data() {
    return {
      currentTitle: '',
      // isVisibleDrawingSpace: false
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
