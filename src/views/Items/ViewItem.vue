<template>
  <h1 class="display-5 mb-0"># {{ locInfo.name }} #</h1>
  <p class="text-muted mt--1">
    <i>/ {{ locInfo.address }} /</i>
  </p>
  <h2>Name: {{ itemInfo.name }}</h2>
  <h3>Category: {{ catInfo.name }}</h3>
  <h4>Price: {{ itemInfo.name }}</h4>
  <h4>Description: {{ itemInfo.name }}</h4>
  <h4>Quantity: {{ itemInfo.name }}</h4>
  <div class="user-message">
    {{ userLogin.userMessage }}
  </div>
  <div class="controls my-5">
    <button class="btn btn-danger me-3" @click="adjust()">Adjust</button>
    <button class="btn btn-link me-3" @click="goBack()">Go Back</button>
  </div>
  <div class="controls d-flex justify-content-center gap-3" v-if="adjustFlag">
    <router-link
      :to="{
        name: 'DeleteItem',
        params: {
          locationId: locId,
          categoryId: catId,
          itemId: itemId,
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
          itemId: itemId,
        },
      }"
    >
      <button class="btn btn-warning" type="button">Update</button>
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ViewItem",
  data() {
    return {
      adjustFlag: false,
      locId: this.$route.params.locationId,
      catId: this.$route.params.categoryId,
      itemId: this.$route.params.itemId,
    };
  },
  computed: {
    ...mapState(["itemInfo", "locInfo", "catInfo", "userLogin"]),
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisItem({
      locId: this.locId,
      catId: this.catId,
      itemId: this.itemId,
    });
    this.setLocInfo(this.locId);
    this.setCatInfo(this.catId);
    this.setItemInfo(this.itemId);
  },
  methods: {
    ...mapActions([
      "deleteItem",
      "setItemInfo",
      "canUserAccessThisItem",
      "isUserLoggedIn",
      "goBack",
      "goHome",
      "setCatInfo",
      "setLocInfo",
    ]),
    adjust() {
      this.adjustFlag = !this.adjustFlag;
    },
  },
};
</script>

<style></style>
