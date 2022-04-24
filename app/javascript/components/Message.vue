<template>
<div
  id="message"
  v-show="content"
  class="absolute top-1/4 w-full z-10"
>
  <div
    class="bg-white text-dark-default w-5/6 mx-auto rounded filter drop-shadow flex justify-between p-3"
  >
    <img
      src="../stylesheets/images/logo.png"
      alt="logo"
      class="h-20 rounded"
    >
    <p class="flex-1 text-center self-center">{{ content }}</p>
  </div>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'content'
      ]),
    },
    methods: {
      ...mapActions([
        'fetchContent'
      ]),
    },
    created() {
      this.fetchContent();
    }
  }
</script>