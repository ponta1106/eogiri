<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      message: 'This is Top Page!',
      count: 0,
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