<template>
  <header>
    <ul>
      <li>
        <router-link to="/">絵大喜利</router-link>
      </li>
      <li>
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

<style scoped>

header {
  background: #7689ad;
}

ul {
  display: flex;
  list-style: none;
}

li {
  color: #eee;
  margin-right: 20px;
}

li a {
  color: #eee;
  text-decoration: none;
  cursor: pointer;
}

</style>
