<template>
  <header>
    <ul class="flex bg-blue-default p-3">
      <li class="flex-1 text-white self-center text-center bg-blue-default">
        <router-link to="/">絵大喜利</router-link>
      </li>
      <li class="flex-1 text-white self-center text-center bg-blue-default">
        <router-link to="/titles">お題一覧</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>
