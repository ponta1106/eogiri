<template>
  <div id="top-page">
    <div class="h-screen flex justify-around bg-dark-default md:-ml-44">
      <div class="flex flex-col container self-center h-11/12 w-full">
        <img src="../../stylesheets/images/logo.png" class="h-96 w-96 mx-auto">
          <button class="font-bold text-center py-2 px-6 w-44 mx-auto z-10" type="button">
          <router-link
            to="/titles"
          >はじめる</router-link>
          </button>
          <div class="w-44 h-4 mx-auto relative">
            <span class="animate-ping absolute -top-8 left-0 h-6 w-44 bg-orange-default opacity-75 rounded"></span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top'
}
</script>
