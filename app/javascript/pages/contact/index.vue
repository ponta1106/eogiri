<template>
  <div id="contact-page">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      message: "This is Contact Page!"
    }
  }
}
</script>

<style scoped>

#contact-page {
  background-color: #eddbdb;
}

</style>