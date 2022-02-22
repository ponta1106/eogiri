<template>
  <footer>
    <ul>
      <li>
        <router-link to="/terms_of_use">
          <small>利用規約</small>
        </router-link>
      </li>
      <li>
        <router-link to="/privacy_policy">
          <small>プライバシーポリシー</small>
        </router-link>
      </li>
      <li>
        <router-link to="/contact">
          <small>お問合せ</small>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'SharedFooter'
}
</script>

<style scoped>

footer {
  background: #eee;
}

ul {
  display: flex;
  list-style: none;
  justify-content: space-around;
}

li {
  margin-right: 20px;
}

li a {
  color: #7689ad;
  text-decoration: none;
  cursor: pointer;
}

</style>
