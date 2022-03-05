<template>
  <header>
    <ul class="flex bg-gray-200 py-1">
      <li class="flex-1 text-gray-700 text-center bg-gray-100 px-4 py-2 m-2 rounded-md">
        <router-link to="/">絵大喜利</router-link>
      </li>
      <li class="flex-1 text-gray-700 text-center bg-gray-100 px-4 py-2 m-2 rounded-md">
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
