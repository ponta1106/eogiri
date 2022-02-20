<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  name: 'TitleIndex',
  data() {
    return {
      message: 'This is TitleIndex Page!'
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