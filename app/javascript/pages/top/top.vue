<template>
  <div id="top-page">
    <div class="h-screen flex justify-around bg-dark-default md:-ml-44">
      <div class="flex flex-col container self-center h-11/12 w-full">
        <img src="../../stylesheets/images/logo.png" class="h-96 w-96 mx-auto">
        <button class="hover:bg-orange-default hover:text-dark-default border-2 border-orange-default font-bold text-center py-2 px-6 w-1/3 mx-auto relative" type="button">
        <router-link
          to="/titles"
        >はじめる</router-link>
        <span class="animate-ping absolute top-0 left-0 h-full w-full bg-orange-default opacity-75"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top'
}
</script>
