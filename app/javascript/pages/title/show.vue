<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  name: 'TitleShow',
  data() {
    return {
      message: 'This is TitleShow Page!'
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