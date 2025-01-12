<template>
  <div class="container">
    <h1 class="mb-0 display-5"># {{ locInfo.name }} #</h1>
    <p class="mt--1">
      <i>/ {{ locInfo.address }} /</i>
    </p>
    <div class="box d-flex justify-content-between">
      <router-link :to="{ name: 'AddCategory', params: { locationId: locId } }">
        <button class="btn btn-success">Add Category</button>
      </router-link>
      <div class="box">
        <button class="btn btn-link" @click="goBack()">Go Back</button>
      </div>
    </div>
    <caption class="d-block mt-4 container px-0">
      <div class="d-flex justify-content-between">
        <div class="box" v-if="state.categoriesArray.length > 0">
          Number Of Categories Is ({{ state.categoriesArray.length }})
        </div>
        <router-link
          :to="{ name: 'DeleteAllCategories', params: { locationId: locId } }"
          v-if="state.categoriesArray.length > 0"
        >
          <button class="btn btn-danger">Delete All Categories</button>
        </router-link>
      </div>
    </caption>
    <table
      class="table container table-striped"
      v-if="state.categoriesArray.length > 0"
    >
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col" class="text-end pe-5">
            <span class="pe-5 me-5">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, i) in state.categoriesArray" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ category.name }}</td>
          <td>
            <div class="controls d-flex justify-content-end gap-3">
              <router-link
                :to="{
                  name: 'DeleteCategory',
                  params: { locationId: locId, categoryId: category.id },
                }"
              >
                <button class="btn btn-danger" type="button">Delete</button>
              </router-link>
              <router-link
                :to="{
                  name: 'UpdateCategory',
                  params: { locationId: locId, categoryId: category.id },
                }"
              >
                <button class="btn btn-warning" type="button">Update</button>
              </router-link>
              <router-link
                :to="{
                  name: 'ViewItems',
                  params: { categoryId: category.id },
                }"
              >
                <button class="btn btn-dark" type="button">
                  View Category
                </button>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="alert alert-warning" v-if="!(state.categoriesArray.length > 0)">
      There Is No Categories Yet
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "ViewCategories",
  data() {
    return {
      locId: this.$route.params.locationId,
      userMessage: "",
      messageFlag: false,
    };
  },
  setup() {
    let state = reactive({
      categoriesArray: [],
    });
    return {
      state,
    };
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisLocation(this.locId);
    this.setLocInfo(this.locId);
    this.getCategories();
  },
  computed: {
    ...mapGetters(["getUserInfo", "getLocInfo"]),
    ...mapState(["locInfo"]),
  },
  methods: {
    ...mapActions([
      "isUserLoggedIn",
      "canUserAccessThisLocation",
      "goBack",
      "goForward",
      "goHome",
      "redirectTo",
      "setLocInfo",
    ]),
    async getCategories() {
      let cats = await axios.get(
        `http://localhost:3000/categories?userId=${this.getUserInfo.id}&locId=${this.locId}`
      );
      if (cats.status == 200) {
        this.state.categoriesArray = cats.data;
      }
    },
  },
};
</script>

<style></style>
