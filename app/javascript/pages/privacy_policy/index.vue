<template>
  <div id="privacy_policy-page">
    <transition name="fade" appear>
      <p>{{ message }}</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      message: "This is Privacy Policy Page!"
    }
  }
}
</script>

<style scoped>

#privacy_policy-page {
  background-color: wheat;
}

</style>