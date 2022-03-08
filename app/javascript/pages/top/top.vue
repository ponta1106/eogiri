<template>
  <div id="top-page">
    <div class="h-full flex justify-around">
      <div class="flex flex-col container self-center h-11/12 w-11/12">
        <img src="../../stylesheets/images/logo.png" class="h-96 w-96 mx-auto">
        <button class="hover:bg-orange hover:text-dark border-2 border-orange font-bold text-center py-2 px-6 w-1/3 mx-auto" type="button">
        <router-link to="/titles">はじめる</router-link>
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
