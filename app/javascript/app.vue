<template>
  <div id="app">
    <SharedHeader />
      <router-view style="flex-grow: 1;"/>
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
