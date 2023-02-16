<script setup lang="ts">
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject } from "vue";
import { useRouter } from "vue-router";

const $pb = inject(pocketBaseSymbol);

const authLogout = () => {
  $pb?.authStore.clear();

  const router = useRouter();
  router.push({ name: "home" });
};
</script>

<template>
  <nav>
    <button class="btn btn--transparent" @click="authLogout">Logout</button>
  </nav>
</template>
