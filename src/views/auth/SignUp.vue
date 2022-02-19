<template>
    <div class="form-signin">
        <form @submit.prevent="register">
            <img src="../../assets/images/logo.png" alt="" />
            <h1 class="h3 my-4 fw-normal">Sign Up</h1>
            <div class="form-floating mb-2">
                <input
                    type="text"
                    class="form-control"
                    id="nameId"
                    v-model="credentials.name"
                    placeholder="Enter your name"
                />
                <label class="font-weight-light" for="nameId">Name:</label>
            </div>
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
                Already registered?
                <router-link :to="{ name: 'Login' }" class="text-capitalize">login</router-link>
            </p>
            <p class="mt-3 mb-2 text-muted">&copy; {{ yr }}</p>
        </form>
    </div>
</template>

<script>
export default {
    name: "SignUp",
    data() {
        return {
            yr: new Date().getFullYear(),
            credentials: { name: "", email: "", password: "" },
        };
    },
    methods: {
        register() {
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.credentials),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to create user object");
                    }
                    return response.json();
                })
                .then((data) => {
                    // console.log("Success:", data);
                    if (data) {
                        localStorage.setItem("user-info", JSON.stringify(data));
                        // redirecting to the home page
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        },
    },
    mounted() {
        // redirecting the user accordingly
        const user = localStorage.getItem("user-info");
        user ? this.$router.push({ name: "Home" }) : this.$router.push({ name: "SignUp" });
    },
};
</script>
