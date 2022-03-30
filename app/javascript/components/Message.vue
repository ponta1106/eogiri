<template>
  <div
    id="message"
    v-show="content"
    class="bg-white text-dark-default absolute bottom-10 left-0 w-5/6 container z-10 rounded filter drop-shadow flex justify-between"
  >
    <!-- <img
      src="../stylesheets/images/logo.png"
      alt="logo"
      class="h-20 rounded-l"
    > -->
    <p class="flex-1 text-center self-center">{{ content }}</p>
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