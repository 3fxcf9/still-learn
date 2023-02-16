<script setup lang="ts">
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

import SubmitButton from "@/components/forms/SubmitButton.vue";
import FormInput from "@/components/forms/FormInput.vue";

const $pb = inject(pocketBaseSymbol);

const router = useRouter();

const username = ref("");
const password = ref("");

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
</script>

<template>
  <div id="login">
    <div class="login-container">
      <h2>Heureux de te revoir !</h2>
      <form>
        <FormInput
          type="text"
          id="username_input"
          label="Nom d'utilisateur"
          v-model="username"
        />
        <FormInput
          type="password"
          id="password_input"
          label="Mot de passe"
          v-model="password"
        />
        <SubmitButton text="Se connecter" @click.prevent="authUser" />
      </form>
    </div>

    <div class="right">
      <p>
        <span style="color: #c0c5c9">NOUS AVONS BESOIN DE VOTRE AIDE !</span
        ><br />Il manque une illustration ici... vous pouvez nous proposer vos
        idées ici:
        <span style="color: #a7cae0">illustration@still-learn.???</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/mq.scss";
.login-container {
  margin: 2rem;
}

.right {
  display: none;
}

form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

h2 {
  font-family: "Noto Mono";
  font-size: 2rem;
}
@media screen and (min-width: $mq-small-med) {
  .login-container {
    margin-left: 20vw;
    margin-right: 20vw;
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
    margin: 5rem;
  }
  h2 {
    font-size: 3rem;
  }

  form {
    margin-top: 4rem;
  }

  .right {
    display: block;
    margin: 10px;
    border: 3px dashed #d5dbdf;
    color: #d5dbdf;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      width: 80%;
    }
  }
  // #login {
  //   display: flex;
  //   height: 100vh;
  // }
  // .login-container {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  // }
}
</style>
