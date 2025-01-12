<template>
  <h1># Delete Account #</h1>
  <p class="text-danger">Are You Sure To Delete</p>
  <p class="text-danger">
    <i> /This Will Cause To Delete This Account/ </i>
    <br/>
    <i>//And All Information Related To It//</i>
  </p>
  <div class="my-3 text-primary">
    {{ getUserInfo.name }}
  </div>
  <div class="my-3 text-primary">
    {{ getUserInfo.email }}
  </div>
  <div class="controls">
    <button class="btn btn-danger me-3" @click="delNow()">
      Delete Now
    </button>
    <button class="btn btn-link me-3" @click="goBack()">Cancel</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteProfile",
  data() {},
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    this.isUserLoggedIn();
  },
  methods: {
    ...mapActions(["goHome", "goBack", "isUserLoggedIn", "deleteProfile"]),
    delNow() {
      this.deleteProfile();
    },
  },
};
</script>

<style></style>
