<template>
  <div id="title-index">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TitleIndex',
  data() {
    return {
      message: 'This is Title Index Page!'
    }
  }
}
</script>

<style scoped>

#title-index {
  background-color: #bccfc9;
}

</style>