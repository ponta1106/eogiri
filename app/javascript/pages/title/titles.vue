<template>
  <div id="title-index" class="relative">
    <div class="container h-5/6 p-3 m-3 mx-auto bg-blue-100 text-blue-900">
      <h3 class="text-3xl text-center mb-2">お題一覧</h3>
      <ul class="overflow-auto h-5/6">
        <li
          v-for="(title, index) in titles" :data-index="index"
          :key="title"
          class="hover:bg-blue-200 rounded-md my-2 p-2 flex justify-between"
        >
          <dir>
            <router-link
              :to="{
                name: 'TitleShow',
                params: { id: title.id }
              }"
            >{{ title.id }} . {{ title.theme }} - {{ title.user_name }}
            </router-link>
          </dir>
          <button
            class="rounded m-2 p-2 bg-red-300 text-red-900"
            @click="handleDeleteTitle(title)"
          >お題を削除</button>
        </li>
      </ul>
    </div>
    <div class="container mx-auto">
      <form class="md:flex bg-gray-200 absolute bottom-0 left-0 w-screen p-3 justify-around">
        <div class="md:flex md:items-center">
          <div>
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-theme">
              お題
            </label>
          </div>
          <div>
            <input class="bg-gray-100 appearance-none border-2 border-gray-200 rounded py-2 px-4 mx-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-theme" type="text" v-model="newTitle.theme">
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div>
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-user-name">
              お名前
            </label>
          </div>
          <div>
            <input class="bg-gray-100 appearance-none border-2 border-gray-200 rounded-md py-2 px-4 mx-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-user-name" type="text" v-model="newTitle.user_name">
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div>
            <button class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-md" type="button" @click="handleCreateNewTitle">
              投稿
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
  name: 'Titles',
  data() {
    return {
      addEnter: false,
      newTitle: {
        theme: '',
        user_name: ''
      }
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
    doAdd() {
      //お題の追加ならフラグを立てる
      this.addEnter = true
    },
    // トランジション開始でインデックス*100ms分のディレイを付与
    beforeEnter(el) {
      this.$nextTick(() => {
        if (!this.addEnter) {
          el.style.transitionDelay = 200 * parseInt(el.dataset.index, 10) + 'ms'
        } else {
          this.addEnter = false
        }
      })
    },
    // トランジション完了またはキャンセルでディレイを削除
    afterEnter(el) {
      el.style.transitionDelay = ''
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
