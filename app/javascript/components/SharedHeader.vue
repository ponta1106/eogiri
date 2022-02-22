<template>
  <header>
    <ul>
      <li>
        <router-link to="/">Top</router-link>
      </li>
      <li>
        <router-link to="/titles">Titles</router-link>
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
