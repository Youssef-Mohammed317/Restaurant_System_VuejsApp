<template>
  <div class="container">
    <h1 class="mb-0 display-5"># {{ locInfo.name }} #</h1>
    <p class="mt--1"># {{ locInfo.address }} #</p>
    <h2 class="mb-0">
      <i>/ Category: {{ catInfo.name }} /</i>
    </h2>
    <div class="box d-flex justify-content-between mt-4">
      <router-link
        :to="{
          name: 'AddItemDirect',
          params: { locationId: locId, categoryId: catId },
        }"
      >
        <button class="btn btn-primary">Add Item To {{ catInfo.name }}</button>
      </router-link>
      <div class="box">
        <button class="btn btn-link" @click="goBack()">Go Back</button>
      </div>
    </div>
    <caption class="d-block mt-4 container px-0">
      <div
        class="d-flex justify-content-between align-items-center"
        v-if="items.length > 0"
      >
        <div class="box">Number Of Items Is ({{ items.length }})</div>
        <router-link
          :to="{
            name: 'DeleteAllItems',
            params: { locationId: locId, categoryId: catId },
          }"
          v-if="items.length > 0"
        >
          <button class="btn btn-danger">Delete All Items</button>
        </router-link>
      </div>
    </caption>
    <table class="table container table-striped" v-if="items.length > 0">
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th scope="col" class="text-end pe-5">
            <span class="pe-5 me-5">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="i">
          <th scope="row">{{ i + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.disc }}</td>
          <td>
            <div class="controls d-flex justify-content-end gap-3">
              <router-link
                :to="{
                  name: 'DeleteItem',
                  params: {
                    locationId: locId,
                    categoryId: catId,
                    itemId: item.id,
                  },
                }"
              >
                <button class="btn btn-danger" type="button">Delete</button>
              </router-link>
              <router-link
                :to="{
                  name: 'UpdateItem',
                  params: {
                    locationId: locId,
                    categoryId: catId,
                    itemId: item.id,
                  },
                }"
              >
                <button class="btn btn-warning" type="button">Update</button>
              </router-link>
              <router-link
                :to="{
                  name: 'ViewItem',
                  params: {
                    locationId: locId,
                    categoryId: catId,
                    itemId: item.id,
                  },
                }"
              >
                <button class="btn btn-dark" type="button">View Item</button>
              </router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="alert alert-warning" v-if="!(items.length > 0)">
      There Is No Categories Yet
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "ViewItems",
  data() {
    return {
      locId: this.$route.params.locationId,
      catId: this.$route.params.categoryId,
      items: [],
    };
  },
  components: {},
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisLocation(this.locId);
    this.canUserAccessThisCategory({
      categoryId: this.catId,
      locId: this.locId,
    });
    this.setLocInfo(this.locId);
    this.setCatInfo(this.catId);
    this.getItems();
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    ...mapState(["locInfo", "catInfo"]),
  },
  methods: {
    ...mapActions([
      "isUserLoggedIn",
      "canUserAccessThisLocation",
      "canUserAccessThisCategory",
      "goBack",
      "goForward",
      "goHome",
      "redirectTo",
      "setCatInfo",
      "setLocInfo",
    ]),
    async getItems() {
      let items = await axios.get(
        `http://localhost:3000/items?catId=${this.catId}&locId=${this.locId}&userId=${this.getUserInfo.id}`
      );
      if (items.status == 200) {
        this.items = items.data;
      }
    },
  },
};
</script>

<style></style>
