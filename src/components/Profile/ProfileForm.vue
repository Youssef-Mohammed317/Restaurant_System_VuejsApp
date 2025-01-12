<template>
  <div class="container">
    <div class="d-flex align-items-center " :class="profileSettingFlag?'flex-row-reverse justify-content-start' :'flex-row justify-content-end'">
      <div class="box d-flex align-items-center">
        <button
          class="btn btn-primary mx-3"
          @click="profileSettingFlag = !profileSettingFlag"
        >
          Profile Settings
        </button>
      </div>
      <div class="settings" v-if="profileSettingFlag">
      <div class="box">
        <button
          class="btn btn-danger mx-3"
          @click="redirectTo('DeleteProfile')"
        >
          Delete Profile
        </button>
        <button class="btn btn-info mx-3" @click="redirectTo('UpdateProfile')">
          Update Profile
        </button>
      </div>
    </div>
    </div>

    <div class="user-info">
      <div class="my-3">
        Name: {{ userLogin.name }}
      </div>
      <div class="my-3">
        Email: {{ userLogin.email }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      profileSettingFlag: false,
    };
  },
  mounted() {
    this.isUserLoggedIn();
  },
  computed: {
    ...mapState(["userLogin"]),
  },
  methods: {
    ...mapActions([
      "redirectTo",
      "goBack",
      "goForward",
      "isUserLoggedIn",
      "goHome",
    ]),
    toggleSettingProfileShow() {},
  },
};
</script>

<style></style>
