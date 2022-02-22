<template>
  <div id="terms_of_use-page">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TermsOfUse',
  data() {
    return {
      message: "This is Terms Of Use Page!"
    }
  }
}
</script>

<style scoped>

#terms_of_use-page {
  background-color: lemonchiffon;
}

</style>