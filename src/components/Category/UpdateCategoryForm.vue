<template>
  <div class="container d-flex justify-content-center">
    <form action="" @click.prevent>
      <h1 class="display-5 mb-1"># {{ locInfo.name }} #</h1>
      <p class="text-muted mt--1">
        <i>/ {{ locInfo.address }} /</i>
      </p>
      <h2># Update Category #</h2>
      <div class="input-group mt-5">
        <input
          type="text"
          placeholder="Category Name"
          class="form-control mx-auto"
          v-model="categoryName"
          :disabled="!updateFlag"
        />
      </div>
      <div class="error-message" v-if="v$.categoryName.$error">
        {{ v$.categoryName.$errors[0].$message }}
      </div>
      <div class="my-4">
        <button
          class="btn btn-warning me-3"
          @click="updateFlag ? updateCategory() : (updateFlag = !updateFlag)"
          :style="{ opacity: updateFlag ? 1 : 0.5 }"
        >
          Update Now
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
  name: "UpdateCategoryForm",
  data() {
    return {
      catId: this.$route.params.categoryId,
      locId: this.$route.params.locationId,
      updateFlag: false,
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
    this.canUserAccessThisCategory({
      locId: this.locId,
      categoryId: this.catId,
    });
    this.setLocInfo(this.locId);
    this.setCatInfo(this.catId);
    this.setCatInfoInFields();
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    ...mapState(["catInfo", "locInfo"]),
  },
  methods: {
    ...mapActions([
      "canUserAccessThisLocation",
      "isUserLoggedIn",
      "redirectTo",
      "goBack",
      "goHome",
      "goForward",
      "canUserAccessThisCategory",
      "setCatInfo",
      "setLocInfo",
    ]),
    async setCatInfoInFields() {
      this.categoryName = this.catInfo.name;
    },
    updateCategory() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.updateCategoryNow();
      }
    },
    async updateCategoryNow() {
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
          let res = await axios.put(
            `http://localhost:3000/categories/${this.catId}`,
            {
              name: this.categoryName,
              locId: this.locId,
              userId: this.getUserInfo.id,
            }
          );
          if (res.status == 200) {
            this.userMessage = "Category Updated Successfully";
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
