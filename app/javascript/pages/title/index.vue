<template>
  <div id="title-index">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
    <button @click="increment">UP</button>
    <p>{{ $store.state.count }}</p>
  </div>
</template>

<script>
export default {
  name: 'TitleIndex',
  data() {
    return {
      message: 'This is Title Index Page!'
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

#title-index {
  background-color: #bccfc9;
}

</style>