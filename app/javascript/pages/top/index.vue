<template>
  <div id="top-page">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
    <button @click="increment">UP</button>
    <p>{{ $store.state.count }}</p>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      message: 'This is Top Page!',
    }
  },
  methods: {
    increment() {
      this.$store.dispatch('incrementActions')
    }
  }
}
</script>

<style scoped>

#top-page {
  background-color: #ffc195;
}

</style>