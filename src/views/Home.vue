<template>
  <div class="home container">
    <div class="row">
      <div class="d-flex justify-content-start col-6">
        <p>
          <span class="fs-1">Welcome: {{ getUserInfo.name }}</span>
        </p>
      </div>
      <div class="d-flex justify-content-end col-6 align-items-center">
        <button
          class="btn btn-info"
          @click="this.$router.push({ name: 'Profile' })"
        >
          Go To Profile
        </button>
      </div>
    </div>
    <UserLocations />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import UserLocations from "@/components/Location/UserLocations.vue";
export default {
  name: "HomeView",
  components: {
    UserLocations,
  },
  data() {},
  mounted() {
    this.isUserLoggedIn();
    console.log(this.getUserInfo)
  },
  computed: {
    ...mapState(["emailFlag", "userLogin"]),
    ...mapGetters(["getUserInfo"])
  },
  methods: {
    ...mapActions(["redirectTo", "goForward", "goBack", "isUserLoggedIn"]),
  },
};
</script>
