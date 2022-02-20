<template>
  <p>This is titles/{{ showParams }} Page!</p>
</template>

<script>
export default {
  name: 'TitleShow',
  computed: {
    showParams() {
      return this.$route.params['id']
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