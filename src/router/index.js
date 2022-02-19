import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/auth/SignUp.vue";
import Login from "../views/auth/Login.vue";
import Add from "../views/restaurant/Add.vue";
import Update from "../views/restaurant/Update.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/add",
        name: "Add",
        component: Add,
    },
    {
        path: "/update/:id",
        name: "Update",
        component: Update,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
