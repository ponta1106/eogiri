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
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#app {
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  justify-content: space-between;
}

p {
  font-size: 2em;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s,
              transform 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

</style>
