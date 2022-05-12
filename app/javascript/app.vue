<template>
  <div id="app" class="font-ReggaeOne text-orange-default min-h-screen w-screen bg-dark-lighter">
    <div class="md:flex">
      <Sidebar v-if="this.$route.name != 'Top' && this.$route.name != 'DrawingSpace'"
      />
      <div
        class="relative flex flex-col flex-grow"
      >
        <Message
          v-if="this.$route.name != 'Top'"
        />
        <router-view class="relative"/>
      </div>
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
