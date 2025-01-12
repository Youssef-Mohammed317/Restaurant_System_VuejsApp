<template>
  <div class="container">
    <h1 class="display-5 mb-0"># {{ locInfo.name }} #</h1>
    <p class="text-muted mt--1">
      <i>/ {{ locInfo.address }} /</i>
    </p>
    <h2 class="display-5 mb-0"># {{ catInfo.name }} #</h2>
    <h2>/ Delete All Items /</h2>
    <p class="text-danger">Are You Sure To Delete All Items?</p>
    <div></div>
    <button class="btn btn-danger me-3" @click="delAllItemsNow()">
      Delete Now
    </button>
    <button class="btn btn-link me-3" type="button" @click="goBack()">
      Cancel
    </button>
  </div>
  <div class="user-message">
    {{ getUserInfo.userMessage }}
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "DeleteAllItems",
  data() {
    return {
      locId: this.$route.params.locationId,
      catId: this.$route.params.categoryId,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    ...mapState(["locInfo", "catInfo"]),
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisLocation(this.locId);
    this.setLocInfo(this.locId);
    this.setCatInfo(this.catId);
  },
  methods: {
    ...mapActions([
      "canUserAccessThisLocation",
      "isUserLoggedIn",
      "redirectTo",
      "goBack",
      "goHome",
      "goForward",
      "setLocInfo",
      "setCatInfo",
      "delAllItems",
    ]),
    delAllItemsNow() {
      this.delAllItems(this.catId);
    },
  },
};
</script>

<style></style>
