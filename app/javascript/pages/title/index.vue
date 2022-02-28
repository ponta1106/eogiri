<template>
  <div id="title-index">
    <transition name="drop" appear>
      <h3>お題一覧</h3>
    </transition>
    <div class="flex-column">
      <div class="container">
        <transition-group
          name="fade"
          tag="ul"
          @before-enter="beforeEnter"
          @after-enter="afterEnter"
          @enter-cancelled="afterEnter"
        >
          <div
            v-for="(title, index) in titles" :data-index="index"
            :key="title"
            class="title-list"
          >
            <li class="title">
              <div>
                {{ title.id }} . {{ title.theme }} - {{ title.user_name }}
              </div>
              <div>
                <router-link
                  :to="{
                    name: 'TitleShow',
                    params: { id: title.id }
                  }"
                >お題詳細</router-link>
              </div>
            </li>
          </div>
        </transition-group>
      </div>
      <transition name="drop" appear>
        <div class="new-title-form">
          <div class="new-title-wrapper">
            <p class="add-title">お題投稿フォーム</p>
            <label for="theme">お題</label>
            <br>
            <input
              type="text"
              id="theme"
              v-model="newTitle.theme"
              @change="judgeUniqueTheme">
            <br>
            <label for="user_name">お名前</label>
            <br>
            <input
              type="text"
              id="user_name"
              v-model="newTitle.user_name">
            <br>
            <button
              @click="handleCreateNewTitle(); doAdd()"
            >お題を投稿する</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TitleIndex',
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
      'createNewTitle',
      'createNewReplies',
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
  background-color: #bccfc9;
}

.flex-column {
  display: flex;
}

.container {
  width: 60%;
  margin-left: 50px;
  min-height: 100vh;
}

ul {
  padding: 0;
  display: flex;
  list-style: none;
  flex-direction: column;
}

.title {
  display: flex;
  justify-content: space-between;
}

ul li {
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px #8799ad;
}

ul li a {
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  background-color: #8799ad;
}

.new-title-form {
  right: 20px;
  bottom: 80px;
  padding: 20px;
  position: fixed;
  border-radius: 10px;
  background-color: #eee;
}

.new-title-wrapper {
  width: 90%;
  padding: 10px;
  margin: 0 auto;
}

.add-title {
  text-align: center;
}

label {
  margin: 5px;
}

input {
  display: flex;
  width: 80%;
  border: none;
  padding: 10px;
  color: #8799ad;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 5px 5px #8799ad;
}

button {
  width: 93%;
  border: none;
  padding: 10px;
  color: #8799ad;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px #8799ad;
}

</style>