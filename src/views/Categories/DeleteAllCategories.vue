<template>
  <div class="container">
    <h1 class="display-5 mb-0"># {{ locInfo.name }} #</h1>
    <p class="text-muted mt--1">
      <i>/ {{ locInfo.address }} /</i>
    </p>
    <h2>/ Delete All Categories /</h2>
    <p class="text-danger">Are You Sure To Delete All Categories?</p>
    <p class="text-danger">
      <i>/This Will Cause To Delete Their Items Also/</i>
    </p>
    <div></div>
    <button class="btn btn-danger me-3" @click="delAllCategoriesNow()">
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
  name: "DeleteAllCategories",
  data() {
    return {
      locId: this.$route.params.locationId,
      catId: this.$route.params.categoryId,
      catInfo: {
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    ...mapState(["locInfo"]),
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisLocation(this.locId);
    this.setLocInfo(this.locId);
  },
  methods: {
    ...mapActions([
      "canUserAccessThisLocation",
      "isUserLoggedIn",
      "redirectTo",
      "goBack",
      "goHome",
      "goForward",
      "delAllCategories",
      "setLocInfo",
    ]),
    delAllCategoriesNow() {
      this.delAllCategories(this.locId);
    },
  },
};
</script>

<style></style>
