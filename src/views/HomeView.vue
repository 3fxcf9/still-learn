<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main>
    <nav><span>Still-Learn Logo</span><span>Login</span></nav>
    <div class="hero">
      <h1>Still-Learn</h1>
    </div>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
    <div class="a"></div>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: orange;
}
nav {
  padding: 1.5rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}

.hero {
  text-align: center;
}

h1 {
  font-size: 4rem;
  font-family: "Unbounded";
  font-weight: 700;
}

.a {
  height: 200vh;
}
</style>
