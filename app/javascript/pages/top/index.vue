<template>
  <div id="top-page">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      message: '絵大喜利'
    }
  }
}
</script>

<style scoped>

#top-page {
  background-color: #ffc195;
}

</style>