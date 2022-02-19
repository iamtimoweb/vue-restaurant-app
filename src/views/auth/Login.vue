<template>
    <div class="form-signin">
        <form @submit.prevent="login">
            <img src="../../assets/images/logo.png" alt="" />
            <h1 class="h3 my-4 fw-normal">Login</h1>

            <div class="form-floating mb-2">
                <input
                    type="email"
                    class="form-control"
                    id="emailId"
                    v-model="credentials.email"
                    placeholder="Enter your email address"
                />
                <label class="font-weight-light" for="emailId">Email address</label>
            </div>
            <div class="form-floating mb-2">
                <input
                    type="password"
                    class="form-control"
                    id="passwordId"
                    v-model="credentials.password"
                    placeholder="Enter your password"
                />
                <label class="font-weight-light" for="passwordId">Password</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p class="mt-3 mb-2 text-muted">
                Not registered yet?
                <router-link :to="{ name: 'SignUp' }" class="text-capitalize">register</router-link>
            </p>
            <p class="mt-3 mb-2 text-muted">&copy; {{ yr }}</p>
        </form>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {
            credentials: { email: "", password: "" },
            yr: new Date().getFullYear(),
        };
    },
    methods: {
        login() {
            fetch(
                `http://localhost:3000/users?email=${this.credentials.email}&password=${this.credentials.password}`
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("couldn't not fetch data");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    // check if data exists
                    if (data.length > 0) {
                        localStorage.setItem("user-info", JSON.stringify(data[0]));
                        // redirect to the home page
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
    },
    mounted() {
        const user = localStorage.getItem("user-info");
        user ? this.$router.push({ name: "Home" }) : this.$router.push({ name: "Login" });
    },
};
</script>
