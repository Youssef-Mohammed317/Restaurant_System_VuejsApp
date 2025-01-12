<template>
  <caption class="d-block mt-4 container px-0">
    <div class="d-flex justify-content-between">
      <button
        class="btn btn-success"
        @click="this.$router.push({ name: 'AddLocation' })"
      >
        Add New Location
      </button>
      <button
        class="btn btn-danger"
        @click="this.$router.push({ name: 'DeleteAllLocations' })"
        v-if="state.locationsArray.length > 0"
      >
        Delete All Locations
      </button>
    </div>
    <div class="box mt-3" v-if="state.locationsArray.length > 0">
      Number Of Locations Is ({{ state.locationsArray.length }})
    </div>
  </caption>
  <table
    class="table container table-striped"
    v-if="state.locationsArray.length > 0"
  >
    <thead class="table-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Address</th>
        <th scope="col">Phone</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(location, i) in state.locationsArray" :key="i">
        <th scope="row">{{ i + 1 }}</th>
        <td>{{ location.name }}</td>
        <td>{{ location.address }}</td>
        <td>{{ location.phone }}</td>
        <td>
          <div class="controls d-flex justify-content-around">
            <router-link
              :to="{
                name: 'DeleteLocation',
                params: { locationId: location.id },
              }"
            >
              <button class="btn btn-danger" type="button">Delete</button>
            </router-link>
            <router-link
              :to="{
                name: 'UpdateLocation',
                params: { locationId: location.id },
              }"
            >
              <button class="btn btn-warning" type="button">Update</button>
            </router-link>
            <router-link
              :to="{
                name: 'Menu',
                params: { locationId: location.id },
              }"
            >
              <button class="btn btn-dark" type="button">Menu</button>
            </router-link>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="alert alert-warning" v-if="!(state.locationsArray.length > 0)">
    There Is No Locations Yet
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Locations",
  date() {
    return {};
  },
  setup() {
    const state = reactive({
      locationsArray: [],
    });
    return {
      state,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    this.isUserLoggedIn();
    this.getLocations();
  },
  methods: {
    ...mapActions(["isUserLoggedIn", "redirectTo", "", "", ""]),
    async getLocations() {
      let locations = await axios.get(
        `http://localhost:3000/locations?userId=${this.getUserInfo.id}`
      );
      if (locations.status == 200) {
        this.state.locationsArray = locations.data;
      }
    },
  },
};
</script>

<style></style>
