<template>
  <div id="title-index">
    <p class="title">{{ message }}</p>
    <div class="container">
      <transition-group
        name="fade"
        tag="ul"
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @enter-cancelled="afterEnter"
      >
        <li v-for="(title, index) in titles" :data-index="index" :key="title">
          {{ title.id }} . {{ title.theme }} - {{ title.user_name }}
        </li>
      </transition-group>
    </div>
    <div class="new-title-form">
      <div class="new-title-form-wrapper">
        <label for="theme">お題</label>
        <input
          type="text"
          id="theme"
          v-model="newTitle.theme"
          @change="judgeUniqueTheme">
        <label for="user_name">なまえ</label>
        <input
          type="text"
          id="user_name"
          v-model="newTitle.user_name">
        <button
          @click="handleCreateNewTitle(); doAdd()"
        >お題を投稿する</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TitleIndex',
  data() {
    return {
      message: 'お題一覧',
      addEnter: false,
      current: 1,
      newTitle: {
        theme: '',
        user_name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['titles']),
  },
  methods: {
    ...mapActions(['createNewTitle', 'fetchTitles']),
      // トランジション開始でインデックス*100ms分のディレイを付与
    doAdd() {
      // 追加ならフラグを立てる
      this.addEnter = true
    },
    beforeEnter(el) {
      this.$nextTick(() => {
        if (!this.addEnter) {
          // 追加でなければディレイを付与
          el.style.transitionDelay = 100 * parseInt(el.dataset.index, 10) + 'ms'
        } else {
          // 追加ならフラグを消すだけ
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
        alert('「お題」と「なまえ」を入力してください。');
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
    }
  },
  created() {
    this.fetchTitles();
  },
}
</script>

<style scoped>

#title-index {
  min-height: 100vh;
  background-color: #bccfc9;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.title {
  width: 20%;
  padding: 10px;
  margin: 50px auto;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px #8799ad;
}

.new-title-form {
  bottom: 0;
  width: 100%;
  position: sticky;
  padding: 10px;
  background-color: #eee;
}

.new-title-form-wrapper {
  width: 80%;
  margin: 0 auto;
}

ul {
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}

ul li {
  margin: 20px;
  padding: 20px 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px #8799ad;
}

label {
  padding: 10px;
}

input {
  border: none;
  margin: 10px;
  padding: 10px;
  color: #8799ad;
  border-radius: 10px;
  box-shadow: 5px 5px #8799ad;
}

button {
  margin: 10px;
  border: none;
  padding: 10px;
  color: #8799ad;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px #8799ad;
}

</style>