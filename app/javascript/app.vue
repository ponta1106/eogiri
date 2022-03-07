<template>
  <div id="app" class="font-kosugimaru text-blue-default h-screen flex flex-col container mx-auto bg-orange">
    <SharedHeader class="flex-grow-0"/>
      <router-view class="flex-grow relative"/>
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
