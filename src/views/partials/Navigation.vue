<template>
    <nav class="navbar navbar-expand-md fixed-top navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="#">Klassy</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link
                            :to="{ name: 'Home' }"
                            class="nav-link active"
                            aria-current="page"
                        >
                            Home
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <router-link
                            class="nav-link dropdown-toggle"
                            id="dropdown01"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            to=""
                            >Hello {{ username }}</router-link
                        >
                        <ul class="dropdown-menu" aria-labelledby="dropdown01">
                            <li><a class="dropdown-item" href="#">profile</a></li>
                            <li><a class="dropdown-item" href="#">settings</a></li>

                            <li>
                                <router-link class="dropdown-item" to="" @click.prevent="logout"
                                    >logout
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navigation",
    data() {
        return {
            username: "",
        };
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: "Login" });
        },
    },
    mounted() {
        const user = localStorage.getItem("user-info");
        this.username = JSON.parse(user).name;
    },
};
</script>
