<template>
  <div id="app" class="font-ReggaeOne text-orange-default h-screen w-screen bg-dark-lighter flex">
    <Sidebar v-if="this.$route.name != 'Top'" class="container min-w-52 w-52 flex-none bg-dark-default"/>
    <router-view class="relative w-full"/>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>
