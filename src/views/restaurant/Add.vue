<template>
    <Navigation />
    <div class="form-signin">
        <form @submit.prevent="add">
            <h1 class="h3 my-4 fw-normal">Add Restaurant</h1>

            <div class="form-floating mb-2">
                <input
                    type="text"
                    class="form-control"
                    id="nameId"
                    v-model="restaurant.name"
                    placeholder="Enter restaurant name"
                />
                <label class="font-weight-light" for="nameId">Restaurant Name</label>
            </div>
            <div class="form-floating mb-2">
                <input
                    type="text"
                    class="form-control"
                    id="contactId"
                    v-model="restaurant.contact"
                    placeholder="Enter restaurant contact"
                />
                <label class="font-weight-light" for="contactId">Restaurant Contact</label>
            </div>
            <div class="form-floating mb-2">
                <input
                    type="text"
                    class="form-control"
                    id="contactId"
                    v-model="restaurant.address"
                    placeholder="Enter restaurant address"
                />
                <label class="font-weight-light" for="contactId">Restaurant Address</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </div>
</template>
<script>
import Navigation from "../partials/Navigation.vue";
export default {
    name: "Add",
    components: {
        Navigation,
    },
    data() {
        return {
            restaurant: { name: "", contact: "", address: "" },
        };
    },
    methods: {
        add() {
            fetch("http://localhost:3000/restaurants", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.restaurant),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to create restaurant object");
                    }
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    // console.log("Success:", data);
                    if (data) {
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
        if (!user) {
            this.$router.push({ name: "Login" });
        }
        // user ? this.$router.push({ name: "Add" }) : this.$router.push({ name: "Login" });
    },
};
</script>
