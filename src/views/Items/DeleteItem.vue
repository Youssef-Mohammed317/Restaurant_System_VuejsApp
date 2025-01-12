<template>
  <h1 class="display-5 mb-0"># {{ locInfo.name }} #</h1>
  <p class="text-muted mt--1">
    <i>/ {{ locInfo.address }} /</i>
  </p>
  <h3>/ Category: {{ catInfo.name }} /</h3>
  <h4>/ Item: {{ itemInfo.name }} /</h4>
  <p class="text-danger">Are You Sure To Delete This Item?</p>
  <div class="user-message">
    {{ userLogin.userMessage }}
  </div>
  <div class="controls my-5">
    <button class="btn btn-danger me-3" @click="delNow()">Delete Now</button>
    <button class="btn btn-link me-3" @click="goBack()">Cancel</button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DeleteItem",
  data() {
    return {
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
    delNow() {
      this.deleteItem(this.itemId);
    },
  },
};
</script>

<style></style>
