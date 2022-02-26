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
  },
}
</script>

<style>

body {
  margin: 0;
  color: #8799ad;
  background-color: #e5e2df;
  font-family: 'Kosugi Maru', sans-serif;
}

#app {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  justify-content: space-between;
}

h3 {
  width: 200px;
  padding: 20px;
  margin: 20px auto;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  background-color: #8799ad;
}

.fade-enter-active {
  transition: opacity 1s,
              transform 1s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

</style>
