<template>
    <Navigation />
    <div class="container pt-3">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h3 class="card-title">Restaurants</h3>
                        <router-link
                            :to="{ name: 'Add' }"
                            class="btn btn-primary btn-sm"
                            aria-current="page"
                        >
                            Add Restaurant
                        </router-link>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table id="example1" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Contact(s)</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="restaurant in restaurants" :key="restaurant.id">
                                    <td>{{ restaurant.id }}</td>
                                    <td>{{ restaurant.name }}</td>
                                    <td>{{ restaurant.contact }}</td>
                                    <td>{{ restaurant.address }}</td>
                                    <td>
                                        <router-link
                                            :to="{ name: 'Update', params: { id: restaurant.id } }"
                                            class="btn btn-warning btn-sm"
                                            >Update</router-link
                                        >
                                        <button
                                            type="button"
                                            @click="
                                                deleteRestaurant(restaurant.id, restaurant.name)
                                            "
                                            class="btn ms-2 btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Contact(s)</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
        </div>
    </div>

    <!-- /.card -->
</template>

<script>
import Navigation from "../views/partials/Navigation.vue";
export default {
    name: "Home",
    components: {
        Navigation,
    },
    data() {
        return {
            restaurants: [],
        };
    },
    methods: {
        deleteRestaurant(id, name) {
            if (confirm(`Are sure?, you want to delete ${name} restaurant`)) {
                fetch(`http://localhost:3000/restaurants/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => {
                        if (!res.ok) {
                            throw new Error("could not delete the item with id=", id);
                        }
                        return res.json();
                    })
                    .then((data) => {
                        console.warn(data, typeof data);
                        this.getAllRestaurants();
                    })
                    .catch((err) => console.log(err));
            }
        },
        getAllRestaurants() {
            // Get all the restaurants from the api
            fetch("http://localhost:3000/restaurants")
                .then((response) => {
                    if (!response.status === 200) {
                        throw new Error("failed to load data");
                    }
                    return response.json();
                })
                .then((data) => (this.restaurants = data))
                .catch((err) => console.log(err));
        },
    },
    mounted() {
        // redirecting the user accordingly
        const user = localStorage.getItem("user-info");

        if (!user) {
            this.$router.push({ name: "Login" });
        }

        // load all the restaurants
        this.getAllRestaurants();
    },
};
</script>
