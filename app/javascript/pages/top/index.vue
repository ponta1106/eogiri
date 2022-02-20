<template>
  <p>{{ message }}</p>
  <p>{{ count }}</p>
  <p>
    <button @click="countUp">+</button>
    <button @click="countDown">-</button>
  </p>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      message: 'This is Top Page!',
      count: 0,
    }
  },
  methods: {
    countUp() {
      this.count += 1;
    },
    countDown() {
      this.count -= 1;
    }
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>