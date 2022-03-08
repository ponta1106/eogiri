<template>
  <div id="app" class="font-kosugimaru text-orange h-screen flex flex-col mx-auto bg-dark">
    <SharedHeader class="flex-grow-0 container mx-auto"/>
      <router-view class="flex-grow relative container mx-auto"/>
    <SharedFooter class="flex-grow-0 container mx-auto"/>
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
