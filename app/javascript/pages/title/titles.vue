<template>
  <div id="title-index">
    <div class="container mx-auto h-96 w-5/6 p-3 m-3 bg-dark">
      <h3 class="text-3xl text-center m-3">お題一覧</h3>
      <ul class="overflow-auto text-dark bg-orange
       h-5/6 p-3">
        <li
          v-for="(title, index) in titles" :data-index="index"
          :key="title"
          class="hover:bg-gray-200 my-2 p-2 flex justify-between"
        >
          <div>
            <router-link
              :to="{
                name: 'TitleShow',
                params: { id: title.id }
              }"
            >{{ title.id }} . {{ title.theme }} - {{ title.user_name }}
            </router-link>
          </div>
          <button
            class="m-2 p-2 bg-orange text-red-700"
            @click="handleDeleteTitle(title)"
          >お題を削除</button>
        </li>
      </ul>
    </div>
    <form class="container mx-auto md:flex absolute bottom-0 left-0 w-screen p-3 justify-around">
      <div class="flex mb-3 md:mb-0">
        <div class="md:flex md:items-center">
          <div>
            <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-theme">
              お題
            </label>
          </div>
          <div>
            <input class="focus:ring-2 focus:ring-orange bg-gray-100 appearance-none border-2 border-gray-200 py-2 px-4 mx-4 text-dark leading-tight focus:outline-none focus:bg-white focus:border-blue" id="inline-theme" type="text" v-model="newTitle.theme">
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div>
            <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-user-name">
              お名前
            </label>
          </div>
          <div>
            <input class="focus:ring-2 focus:ring-orange bg-gray-100 appearance-none border-2 border-gray-200 py-2 px-4 mx-4 text-dark leading-tight focus:outline-none focus:bg-white focus:border-blue" id="inline-user-name" type="text" v-model="newTitle.user_name">
          </div>
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div>
          <button class="focus:ring-4 focus:ring-orange text-dark shadow bg-orange py-2 px-6 w-full md:w-auto" type="button" @click="handleCreateNewTitle">
            投稿
          </button>
        </div>
      </div>
    </form>
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
