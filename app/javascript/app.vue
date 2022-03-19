<template>
  <div id="app" class="font-ReggaeOne text-orange-default h-screen w-screen bg-dark-default flex">
    <Sidebar v-if="this.$route.name != 'Top'"
      class="container min-w-52 w-52 flex-none bg-dark-default"
    />
    <div
      class="relative w-full flex flec-col"
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
