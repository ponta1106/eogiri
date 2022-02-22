<template>
  <div id="title-show">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TitleShow',
  data() {
    return {
      message: 'This is Title Show Page!'
    }
  }
}
</script>

<style scoped>

#title-show {
  background-color: #d0d2d1;
}

</style>