<template>
  <div class="" style="margin-top: 200px;">
    <h1 class="mb-4 text-center text-primary">Sign Up</h1>
    <form action="" @click.prevent>
      <div class="input-group mt-3">
        <input
          type="text"
          placeholder="Your Name"
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
        <button class="btn btn-primary me-3" type="button" @click="signUpNow()">
          Sign Up Now
        </button>
        <button class="btn btn-link" type="button" @click="redirectTo('Login')">
          Log In
        </button>
      </div>
    </form>
    <div class="user-message">
      {{ userMessage }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  name: "Signup",
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
    ...mapGetters(["getEmailFlag", "getUserInfo"]),
  },
  mounted() {},
  methods: {
    ...mapActions(["redirectTo", "isUserLoggedIn"]),
    async signUpNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        console.log("success");
        let check = await axios.get(
          `http://localhost:3000/users?email=${this.state.email}`
        );
        if (check.status == 200 && check.data.length > 0) {
          if (this.state.email == this.getUserInfo.email) {
            this.setNewUser();
          } else {
            console.log("fail");
            this.userMessage = "This Email Exist";
            this.messageFlag = false;
          }
        } else {
          this.setNewUser();
        }
      } else {
        console.log("fail");
      }
    },
    async setNewUser() {
      let result = await axios.post(`http://localhost:3000/users`, {
        name: this.state.name,
        email: this.state.email,
        pass: this.state.pass,
      });
      if (result.status == 201) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.isUserLoggedIn();
        this.userMessage = "Sign Up successfully";
        this.messageFlag = true;
        setTimeout(() => {
          this.redirectTo("Home");
        }, 500);
      } else {
        this.userMessage = "Something Wrong, Please try again";
        this.messageFlag = false;
        setTimeout(() => {
          this.redirectTo("Signup");
        }, 500);
      }
    },
  },
};
</script>

<style></style>
