<template>
  <div id="title-index" class="h-screen">
    <div class="container mx-auto w-11/12 p-3 h-full flex flex-col justify-around">
      <h3 class="text-3xl text-center m-3">お題一覧</h3>
      <ul class="overflow-auto text-dark-default p-3">
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
            >No.{{ title.id }} 「{{ title.theme }}」<small>by {{ title.user_name }}</small>
            </router-link>
          </div>
          <!-- <button
            class="m-2 p-2 bg-dark-default text-orange-default"
            @click="handleDeleteTitle(title)"
          >お題を削除</button> -->
        </li>
      </ul>
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
