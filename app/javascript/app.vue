<template>
  <header>
    <ul>
      <li>
        <router-link to="/">Top</router-link>
      </li>
      <li>
        <router-link to="/contact">Contact</router-link>
      </li>
      <li>
        <router-link to="/titles">Titles</router-link>
      </li>
      <li>
        <router-link to="/titles/1">Titles/1</router-link>
      </li>
    </ul>
  </header>
  <router-view/>
</template>

<style>

body {
  margin: 0;
  color: #555;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

header {
  background: #eee;
}

ul {
  display: flex;
  list-style: none;
  padding: 20px;
  margin: 0;
}

li {
  margin-right: 10px;
}
</style>
