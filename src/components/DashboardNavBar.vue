<script setup lang="ts">
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject } from "vue";

const $pb = inject(pocketBaseSymbol);
</script>

<template>
  <nav>
    <button
      class="btn btn--transparent"
      @click="
        () => {
          $pb?.authStore.clear();
          $router.push({ name: 'home' });
        }
      "
    >
      Logout
    </button>
  </nav>
</template>
