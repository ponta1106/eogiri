<template>
  <div id="app" class="font-ReggaeOne text-orange-default h-screen w-screen bg-dark-lighter flex">
    <Sidebar v-if="this.$route.name != 'Top'"
      class="container min-w-52 w-52 flex-none bg-dark-default"
    />
    <div
      class="relative min-w-100 w-full flex flex-col"
    >
      <Message
        v-if="this.$route.name != 'Top'"
      />
      <router-view class="relative w-full h-full"/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Message from './components/Message.vue'
export default {
  name: 'App',
  components: {
    Sidebar,
    Message
  }
}
</script>
