<template>
  <div class="container d-flex justify-content-center">
    <form action="" @click.prevent>
      <h1 class="display-5 mb-1"># {{ locInfo.name }} #</h1>
      <p class="text-muted mt--1">
        <i>/ {{ locInfo.address }} /</i>
      </p>
      <h3># Add New Category #</h3>
      <div class="input-group mt-5">
        <input
          type="text"
          placeholder="Category Name"
          class="form-control mx-auto"
          v-model="categoryName"
        />
      </div>
      <div class="error-message" v-if="v$.categoryName.$error">
        {{ v$.categoryName.$errors[0].$message }}
      </div>
      <div class="my-4">
        <button class="btn btn-success me-3" @click="addCategory()">
          Add Category
        </button>

        <button class="btn btn-link" @click="goBack()">Cancel</button>
      </div>
      <div class="user-message">
        {{ userMessage }}
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import axios from "axios";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "AddCategoryForm",
  data() {
    return {
      locId: this.$route.params.locationId,
      categoryName: "",
      v$: useVuelidate(),
      userMessage: "",
      messageFlag: "",
    };
  },
  validations() {
    return {
      categoryName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15),
      },
    };
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisLocation(this.locId);
    this.setLocInfo(this.locId);
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    ...mapState(["locInfo"]),
  },
  methods: {
    ...mapActions([
      "canUserAccessThisLocation",
      "isUserLoggedIn",
      "redirectTo",
      "goBack",
      "goHome",
      "goForward",
      "setLocInfo",
      "",
    ]),
    addCategory() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.addCategoryNow();
      }
    },
    async addCategoryNow() {
      // check for category Name if exist
      let cats = await axios.get(
        `http://localhost:3000/categories?userId=${this.getUserInfo.id}&locId=${this.locId}`
      );
      let catsNames = [];
      if (cats.status == 200) {
        for (let j of cats.data) {
          catsNames.push(j.name.toLowerCase());
        }
        if (!catsNames.includes(this.categoryName.toLowerCase())) {
          // post category in data base
          let res = await axios.post("http://localhost:3000/categories", {
            name: this.categoryName,
            locId: this.locId,
            userId: this.getUserInfo.id,
          });
          if (res.status == 201) {
            this.userMessage = "Category Added Successfully";
            this.messageFlag = true;
            setTimeout(() => {
              this.goBack();
            }, 500);
          } else {
            this.userMessage = "Something Wrong, Please try again";
            this.messageFlag = false;
          }
        } else {
          this.userMessage = "This Category Exist";
          this.messageFlag = false;
        }
      }
    },
  },
};
</script>

<style></style>
