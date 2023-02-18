<script setup lang="ts">
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

import SubmitButton from "@/components/forms/SubmitButton.vue";
import FormInput from "@/components/forms/FormField.vue";

const $pb = inject(pocketBaseSymbol);

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const password_repeat = ref("");

const authUser = async () => {
  console.log(username.value, password.value);
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

const titles = [
  "Bienvenue !",
  "Bienvenue sur Still-Learn !",
  "Prêts à découvrir Still-Learn ?",
  "Le meilleur moyen de réviser !",
  "Gagne du temps et amuse-toi en révisant !",
];
let title = titles[Math.floor(Math.random() * titles.length)];
</script>

<template>
  <div id="login">
    <div class="login-container">
      <h2>{{ title }}</h2>
      <form>
        <FormInput
          type="text"
          id="username_input"
          label="Nom d'utilisateur"
          v-model="username"
        />
        <FormInput
          type="mail"
          id="username_input"
          label="E-mail"
          v-model="email"
        />
        <FormInput
          type="password"
          id="password_input"
          label="Mot de passe"
          v-model="password"
        />
        <FormInput
          type="password"
          id="password_input"
          label="Confirmation du mot de passe"
          v-model="password_repeat"
        />
        <SubmitButton text="S'enregistrer" @click.prevent="authUser" />
      </form>
    </div>
    <div class="right"></div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  padding: $form-input-spacing;
}

.right {
  display: none;
}

form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: $form-input-spacing;
}

h2 {
  font-family: "Noto Serif";
  font-size: 2rem;
}
@media screen and (min-width: $mq-small-med) {
  .login-container {
    padding-left: 20vw;
    padding-right: 20vw;
  }
  h2 {
    font-size: 2.5rem;
  }
  form {
    margin-top: 3rem;
  }
}

@media screen and (min-width: $mq-med-large) {
  #login {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .login-container {
    padding: 5rem;
    overflow-y: scroll;
  }
  h2 {
    font-size: 3rem;
  }

  form {
    margin-top: 4rem;
  }

  .right {
    display: block;
    background-image: url("@/assets/images/register_bg.jpeg");
    background-size: cover;
    background-position: right center;
  }
}
</style>
