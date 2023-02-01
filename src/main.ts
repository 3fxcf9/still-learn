import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

// Import the PocketBase JS library
import client from "@/pocketbase";

// Import custom pocketBase type
import { pocketBaseSymbol } from "@/symbols/injectionSymbols";

const app = createApp(App);

app.use(router);

app.provide(pocketBaseSymbol, client);

app.mount("#app");
