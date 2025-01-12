<template>
  <div class="my-3">
    <form action="" @click.prevent>
      <h1># Add New Restaurant #</h1>
      <div class="input-group mt-3">
        <input
          type="text"
          placeholder="Enter The Name"
          class="form-control mx-auto"
          v-model="state.name"
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
        />
      </div>
      <div class="error-message" v-if="v$.phone.$error">
        {{ v$.phone.$errors[0].$message }}
      </div>
      <div class="controls my-4">
        <button
          class="btn btn-success me-3"
          type="button"
          @click="AddNewLocation()"
        >
          Add New
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
import { minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { reactive, computed } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "AddLocationForm",
  setup() {
    const state = reactive({
      name: "",
      address: "",
      phone: "",
    });
    const rules = computed(() => {
      return {
        name: { minLength: minLength(5), required },
        phone: { minLength: minLength(5), required },
        address: { minLength: minLength(5), required },
      };
    });
    let v$ = useVuelidate(rules, state);
    return {
      state,
      v$,
    };
  },
  data() {
    return {
      userMessage: "",
      messageFlag: "",
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    this.isUserLoggedIn();
  },
  methods: {
    ...mapActions(["isUserLoggedIn", "goHome", "goBack"]),
    async AddNewLocation() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("success");
        console.log(this.getUserInfo);
        let loc = await axios.post(`http://localhost:3000/locations`, {
          userId: this.getUserInfo.id,
          name: this.state.name,
          address: this.state.address,
          phone: this.state.phone,
        });
        if (loc.status == 201) {
          this.userMessage = "Location Added Successfully";
          this.messageFlag = true;
          setTimeout(() => {
            this.goHome();
          }, 500);
        } else {
          this.userMessage = "Something Wrong, Please try again";
          this.messageFlag = false;
        }
      } else {
        console.log("fail");
      }
    },
  },
};
</script>

<style></style>
