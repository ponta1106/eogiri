<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      message: "This is contact page!"
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
