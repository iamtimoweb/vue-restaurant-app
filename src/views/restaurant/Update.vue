<template>
    <Navigation />
    <div class="form-signin">
        <form @submit.prevent="update">
            <h1 class="h3 my-4 fw-normal">Update Restaurant #{{ id }}</h1>

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
    name: "Update",
    props: ["id"],
    components: {
        Navigation,
    },
    data() {
        return {
            restaurant: [],
        };
    },

    methods: {
        update() {
            fetch(`http://localhost:3000/restaurants/${this.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.restaurant),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to update the restaurant with id=", this.id);
                    }
                    console.log(res);
                    return res.json();
                })
                .then((data) => {
                    console.log(data, typeof data);
                    this.$router.push({ name: "Home" });
                })
                .catch((err) => console.log(err));
        },
    },

    mounted() {
        // redirecting the user accordingly
        const user = localStorage.getItem("user-info");
        if (!user) {
            this.$router.push({ name: "Login" });
        }

        // get the restaurant with the id
        fetch(`http://localhost:3000/restaurants?id=${this.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not fetch data from the server");
                }

                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.length > 0) {
                    this.restaurant = data[0];
                }
            })
            .catch((err) => console.log(err));
        console.warn("restaurant", typeof this.restaurant);
    },
};
</script>
