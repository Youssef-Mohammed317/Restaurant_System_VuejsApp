<template>
  <div class="my-3">
    <form action="" @click.prevent>
      <div class="input-group mt-3">
        <input
          type="text"
          placeholder="Your Name"
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
          placeholder="Your Email"
          class="form-control mx-auto"
          v-model="state.email"
          :disabled="!updateFlag"
        />
      </div>
      <div class="error-message" v-if="v$.email.$error">
        {{ v$.email.$errors[0].$message }}
      </div>
      <div class="input-group mt-3">
        <input
          type="password"
          placeholder="Your Password"
          class="form-control mx-auto"
          v-model="state.pass"
          :disabled="!updateFlag"
        />
      </div>
      <div class="error-message" v-if="v$.pass.$error">
        {{ v$.pass.$errors[0].$message }}
      </div>
      <div class="controls my-4">
        <button
          class="btn btn-warning me-3"
          type="button"
          @click="updateFlag ? updateProfile() : (updateFlag = !updateFlag)"
          :style="{ opacity: !updateFlag ? '0.5' : '1' }"
        >
          Update Profile
        </button>
        <button class="btn btn-link" @click="goBack()">Cancel</button>
      </div>
    </form>
    <div class="user-message">
      {{ userMessage }}
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UpdateProfile",
  setup() {
    const state = reactive({
      name: "",
      email: "",
      pass: "",
    });
    const rules = computed(() => {
      return {
        name: { required, minLength: minLength(5) },
        email: { required, email },
        pass: { required, minLength: minLength(5) },
      };
    });
    let v$ = useVuelidate(rules, state);
    return {
      v$,
      state,
    };
  },
  data() {
    return {
      userMessage: "",
      messageFlag: "",
      updateFlag: false,
    };
  },
  computed: {
    ...mapGetters(["getEmailFlag", "getUserInfo"]),
  },
  mounted() {
    this.isUserLoggedIn();
    this.state.name = this.getUserInfo.name;
    this.state.email = this.getUserInfo.email;
    this.state.pass = this.getUserInfo.password;
  },
  methods: {
    ...mapActions([
      "redirectTo",
      "goBack",
      "goForward",
      "goHome",
      "isUserLoggedIn",
    ]),
    async updateProfile() {
      this.userMessage = "";
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("success");
        let check = await axios.get(
          `http://localhost:3000/users?email=${this.state.email}`
        );
        if (check.status == 200 && check.data.length > 0) {
          if (this.state.email == this.getUserInfo.email) {
            this.update();
          } else {
            this.userMessage = "This Email Exist";
            this.messageFlag = false;
          }
        } else {
          this.update();
        }
      }
    },
    async update() {
      let result = await axios.put(
        `http://localhost:3000/users/${this.getUserInfo.id}`,
        {
          name: this.state.name,
          email: this.state.email,
          pass: this.state.pass,
        }
      );
      if (result.status == 200) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.isUserLoggedIn();
        this.userMessage = "Updated successfully";
        this.messageFlag = false;
        setTimeout(() => {
          this.redirectTo("Profile");
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
