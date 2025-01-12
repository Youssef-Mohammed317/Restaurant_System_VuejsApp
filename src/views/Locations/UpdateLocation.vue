<template>
  <div class="my-3">
    <form action="" @click.prevent>
      <div class="input-group mt-3">
        <input
          type="text"
          placeholder="Enter The Name"
          class="form-control mx-auto"
          v-model="state.name"
          :disabled="!updateFlag"
        />
      </div>
      <div class="error-message" v-if="v$.name.$error">
        {{ v$.name.$errors[0].$message }}
      </div>
      <div class="input-group mt-3">
        <input
          type="text"
          placeholder="Enter The Address"
          class="form-control mx-auto"
          v-model="state.address"
          :disabled="!updateFlag"
        />
      </div>
      <div class="error-message" v-if="v$.address.$error">
        {{ v$.address.$errors[0].$message }}
      </div>
      <div class="input-group mt-3">
        <input
          type="text"
          placeholder="Enter The Phone"
          class="form-control mx-auto"
          v-model="state.phone"
          :disabled="!updateFlag"
        />
      </div>
      <div class="error-message" v-if="v$.phone.$error">
        {{ v$.phone.$errors[0].$message }}
      </div>
      <div class="controls my-4">
        <button
          class="btn btn-warning me-3"
          type="button"
          @click="updateFlag ? updateLocation() : (updateFlag = !updateFlag)"
          :style="{ opacity: !updateFlag ? 0.5 : 1 }"
        >
          Update Now
        </button>
        <button class="btn btn-link me-3" type="button" @click="goBack()">
          Cancel
        </button>
      </div>
    </form>
    <div class="user-message">
      {{ userMessage }}
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import axios from "axios";
import { reactive, computed } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "UpdateLocation",
  data() {
    return {
      locId: this.$route.params.locationId,
      userMessage: "",
      messageFlag: "",
      updateFlag: false,
    };
  },
  setup() {
    const state = reactive({
      name: "",
      address: "",
      phone: "",
    });
    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(5) },
        address: { required, minLength: minLength(5) },
        phone: { required, minLength: minLength(5) },
      };
    });
    let v$ = useVuelidate(rules, state);
    return {
      v$,
      state,
    };
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisLocation(this.locId);
    this.setLocInfo(this.locId);
    this.fillInputsFieldWithLocInfo();
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    ...mapState(["locInfo"]),
  },
  methods: {
    ...mapActions([
      "goHome",
      "goBack",
      "isUserLoggedIn",
      "canUserAccessThisLocation",
      "setLocInfo",
      "",
      "",
    ]),
    fillInputsFieldWithLocInfo() {
      this.state.name = this.locInfo.name;
      this.state.address = this.locInfo.address;
      this.state.phone = this.locInfo.phone;
    },
    async updateLocation() {
      let locData = await axios.put(
        `http://localhost:3000/locations/${this.locId}`,
        {
          name: this.state.name,
          address: this.state.address,
          phone: this.state.phone,
        }
      );
      if (locData.status == 200) {
        this.userMessage = "Location Updated Successfully ";
        this.messageFlag = true;
        setTimeout(() => {
          this.goHome();
        }, 500);
      } else {
        this.userMessage = "Something Wrong, Please try again";
        this.messageFlag = false;
      }
    },
  },
};
</script>

<style></style>
