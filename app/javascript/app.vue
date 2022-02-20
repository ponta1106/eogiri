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
        <router-link :to="titleShow">Titles/{{ count }}</router-link>
      </li>
      <li>
        <button @click="countUp">+</button>
        <button @click="countDown">-</button>
      </li>
    </ul>
  </header>
  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      count: 1
    }
  },
  computed: {
    titleShow() {
      if(this.count >= 1) {
        return '/titles/' + this.count
      } else {
        return null;
      }
    }
  },
  methods: {
    countUp() {
      this.count += 1;
    },
    countDown() {
      if(this.count >= 2) {
        this.count -= 1;
      }
    }
  }
}
</script>

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
