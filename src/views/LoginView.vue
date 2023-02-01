<script setup lang="ts">
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const $pb = inject(pocketBaseSymbol);

const router = useRouter();

const username = ref("");
const password = ref("");

const authUser = async () => {
  try {
    const userData = await $pb
      ?.collection("users")
      .authWithPassword(username.value, password.value);

    if (userData) {
      router.push({ path: "/dashboard" });
    }
  } catch (error: any) {
    alert(error?.message);
    console.log(error);
  }
};
</script>

<template>
  <div id="login">
    <form>
      <input type="text" v-model="username" />
      <input type="password" v-model="password" />
      <input type="submit" value="Login" @click.prevent="authUser" />
    </form>
  </div>
</template>
