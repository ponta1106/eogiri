<template>
  <div id="app" class="font-kosugimaru text-gray-800">
    <SharedHeader />
      <router-view />
    <SharedFooter />
  </div>
</template>

<script>
import SharedHeader from './components/SharedHeader.vue'
import SharedFooter from './components/SharedFooter.vue'
export default {
  name: 'App',
  components: {
    SharedHeader,
    SharedFooter
  }
}
</script>
