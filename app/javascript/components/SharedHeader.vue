<template>
  <header>
    <ul class="flex p-3">
      <li class="flex-1 text-orange-default hover:text-dark hover:bg-orange-default self-center text-center p-2">
        <router-link to="/">絵大喜利</router-link>
      </li>
      <li class="flex-1 text-orange-default hover:text-dark hover:bg-orange-default self-center text-center p-2">
        <router-link to="/titles">お題一覧</router-link>
      </li>
      <li class="flex-1 text-orange-default hover:text-dark hover:bg-orange-default self-center text-center p-2">
        <router-link :to="{name: 'DrawingSpace'}">絵を描く</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>
