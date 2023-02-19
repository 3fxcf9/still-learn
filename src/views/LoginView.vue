<script setup lang="ts">
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

import SubmitButton from "@/components/forms/SubmitButton.vue";
import FormInput from "@/components/forms/FormField.vue";

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

const titles = [
  "Heureux de te revoir !",
  "Le meilleur moyen de réviser !",
  "Gagne du temps et amuse-toi en révisant !",
];
const title = titles[Math.floor(Math.random() * titles.length)];

function lerp(start: number, end: number, amt: number): number {
  return (1 - amt) * start + amt * end;
}

let hw = window.innerWidth / 2;
let hh = window.innerHeight / 2;
window.addEventListener("resize", () => {
  hw = window.innerWidth / 2;
  hh = window.innerHeight / 2;
});

let bg_actual_x = 0;
let bg_actual_y = 0;

let bg_target_x = 0;
let bg_target_y = 0;

// Make the CSS reactive
const bg_computed_x_percent = ref(50);
const bg_computed_y_percent = ref(50);

const updateCursorPosition = (e: MouseEvent) => {
  bg_target_x = e.clientX - hw;
  bg_target_y = e.clientY - hh;
};

// Update
setInterval(() => {
  // Organic mvt effect, 5% of the x and y distance each frame
  // The move ratio is controlled by the background-size in CSS (pos 0% = left side aligned and pos 100% = right side aligned)
  bg_actual_x = lerp(bg_actual_x, bg_target_x, 0.05);
  bg_actual_y = lerp(bg_actual_y, bg_target_y, 0.05);

  // Percentage of mouse move on half x axis = ratio * 100 / 2 = ratio * 50 = (mouse/maxmouse) * 50
  // The added 50 is to make the result fit between 0 and 100 and not between -50 and 50
  bg_computed_x_percent.value = (bg_actual_x / hw) * 50 + 50;
  bg_computed_y_percent.value = (bg_actual_y / hh) * 50 + 50;
}, 10);
</script>

<template>
  <div
    id="login"
    @mousemove="updateCursorPosition($event)"
    :style="{
      'background-position-x': `${bg_computed_x_percent}%`,
      'background-position-y': `${bg_computed_y_percent}%`,
    }"
  >
    <div class="login-container">
      <h2>{{ title }}</h2>
      <form>
        <FormInput
          type="text"
          id="username_input"
          label="E-mail / Nom d'utilisateur"
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
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  padding: 2rem;
}

form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: $form-input-spacing;
}

h2 {
  font-family: "Unbounded";
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
    display: flex;
    align-items: center;
    justify-content: center;

    background-image: url("@/assets/images/login_bg.jpeg");
    background-size: 105% 105%;
  }
  .login-container {
    background-color: $c-main-bg;
    padding: 2rem;
    border-radius: 10px;
    overflow-y: scroll;
    max-height: 100vh;
    width: 50%;
  }
  h2 {
    font-size: 3rem;
  }

  form {
    margin-top: 4rem;
  }
}
</style>
