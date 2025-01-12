<template>
  <div class="" style="margin-top: 200px;">
    <h1 class="mb-4 text-center text-primary">Log In</h1>
    <form action="" @click.prevent>
      <div class="input-group mt-3">
        <input
          type="text"
          placeholder="Your Email"
          class="form-control mx-auto"
          v-model="state.email"
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
        />
      </div>
      <div class="error-message" v-if="v$.pass.$error">
        {{ v$.pass.$errors[0].$message }}
      </div>
      <div class="controls my-3">
        <button class="btn btn-primary me-3" type="button" @click="loginNow()">
          Log In Now
        </button>
        <button
          class="btn btn-link"
          type="button"
          @click="redirectTo('Signup')"
        >
          Sign Up
        </button>
      </div>
    </form>
    <div class="user-message">
      {{ userMessage }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";

export default {
  name: "Login",
  setup() {
    const state = reactive({
      email: "",
      pass: "",
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        pass: { required, minLength: minLength(5) },
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
  mounted() {},
  methods: {
    ...mapActions(["redirectTo", "isUserLoggedIn"]),
    loginNow() {
      this.v$.$validate();
      if (this.v$.$error) {
        console.log("fail");
      } else {
        console.log("success");
        this.login();
      }
    },
    async login() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.state.email}&pass=${this.state.pass}`
      );
      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.isUserLoggedIn();
        setTimeout(() => {
          this.redirectTo("Home");
        }, 500);
        this.userMessage = "Login successfully";
        this.messageFlag = true;
      } else {
        this.userMessage = "Something Wrong, Please try again";
        this.messageFlag = false;
      }
    },
  },
};
</script>

<style></style>
