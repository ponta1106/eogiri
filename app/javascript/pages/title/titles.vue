<template>
  <div id="title-index">
    <div class="md:w-2/3 mx-auto p-3 mb-24">
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
      <h1 class="text-lg text-center m-3">お題一覧</h1>
      <ul class="text-dark-default mb-3">
        <li
          v-for="(title, index) in titles" :data-index="index"
          :key="title"
          class="bg-orange-default my-2 p-5 flex justify-between"
        >
          <div class="self-center">
            <router-link
              :to="{
                name: 'TitleShow',
                params: { id: title.id }
              }"
            >お題 「 {{ title.theme }} 」<small>作者 「 {{ title.user_name }} 」</small>
            </router-link>
          </div>
          <!-- <button
            class="m-2 p-2 bg-dark-default text-orange-default"
            @click="handleDeleteTitle(title)"
          >お題を削除</button> -->
        </li>
      </ul>
    </div>
    <div
      class="fixed bottom-0 md:hidden w-full bg-dark-default p-3"
    >
      <button
        class="bg-white text-dark-default p-3 w-full"
        @click="showForm"
      >お題を投稿する</button>
    </div>
    <Sidebar
      @close-form="closeForm"
      v-if="isShowForm"
      class="fixed bottom-0 md:hidden"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Sidebar from '../../components/Sidebar.vue'
export default {
  name: 'Titles',
  components: {
    Sidebar
  },
  data() {
    return {
      addEnter: false,
      newTitle: {
        theme: '',
        user_name: ''
      },
      isShowForm: false
    }
  },
  computed: {
    ...mapGetters([
      'titles',
      'replies'
    ]),
  },
  methods: {
    ...mapActions([
      'fetchTitles',
      'fetchReplies',
      'createNewTitle',
      'deleteTitle',
    ]),
    showForm() {
      this.isShowForm = true;
    },
    closeForm() {
      this.isShowForm = false;
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
        } catch(error) {
          console.log(error)
        }
      }
    },
    async handleDeleteTitle(title) {
      try {
        await this.deleteTitle(title);
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    // お題一覧を取得
    this.fetchTitles();
    // 回答一覧を取得
    this.fetchReplies();
  },
}
</script>
