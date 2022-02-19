import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//  bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// custom css
import "./assets/css/app.css";
// google font
import "./assets/css/fonts.css";
// bootstrap.js
import "bootstrap/dist/js/bootstrap.bundle";
createApp(App).use(store).use(router).mount("#app");
