<template>
  <div id="app" class="font-kosugimaru text-gray-700 h-screen flex flex-col">
    <SharedHeader class="flex-grow-0"/>
      <router-view class="flex-grow bg-gray-100"/>
    <SharedFooter class="flex-grow-0"/>
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
