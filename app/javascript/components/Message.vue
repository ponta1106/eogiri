<template>
<div
  id="message"
  v-show="content"
  class="w-full z-10"
>
  <div
    class="bg-white text-dark-default w-full mx-auto justify-between p-3 m-3 flex md:flex-col"
  >
    <img
      src="../stylesheets/images/logo.png"
      alt="logo"
      class="h-10 mx-auto"
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