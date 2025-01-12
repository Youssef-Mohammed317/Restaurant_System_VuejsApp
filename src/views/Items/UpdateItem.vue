<template>
  <div class="container">
    <h1 class="mb-0"># {{ locInfo.name }} #</h1>
    <p class="text-muted mt--1">
      <i>/ {{ locInfo.address }} /</i>
    </p>
    <h3 class="mb-4">/ Update Item: {{ itemInfo.name }} /</h3>
    <form action="" @click.prevent class="">
      <div class="input-group mt-3">
        <div class="form-floating">
          <input
            type="text"
            placeholder="Item Name"
            class="form-control mx-auto"
            v-model="itemName"
            id="itemName"
            :disabled="!updateFlag"
          />
          <label for="itemName" style="left: 37%">Item Name</label>
        </div>
      </div>
      <div class="error-message" v-if="v$.itemName.$error">
        {{ v$.itemName.$errors[0].$message }}
      </div>
      <div class="input-group mt-3">
        <div class="form-floating">
          <input
            type="text"
            placeholder="Item Name"
            class="form-control mx-auto"
            v-model="catInfo.name"
            id="catId"
            disabled
          />
          <label for="catId" style="left: 37%">Category Name</label>
        </div>
      </div>
      <div class="input-group mt-3">
        <div class="form-floating">
          <input
            type="number"
            placeholder="Item Quantity"
            class="form-control mx-auto"
            v-model="itemQuantity"
            id="itemQuantity"
            :disabled="!updateFlag"
          />
          <label for="itemsQuantity" style="left: 37%">Item Quantity</label>
        </div>
      </div>
      <div class="error-message" v-if="v$.itemQuantity.$error">
        {{ v$.itemQuantity.$errors[0].$message }}
      </div>
      <div class="input-group mt-3">
        <div class="form-floating">
          <textarea
            type="number"
            placeholder="Item Desc"
            class="form-control mx-auto inputsWidth"
            v-model="itemDesc"
            id="itemDesc"
            :disabled="!updateFlag"
          ></textarea>
          <label for="itemDesc" style="left: 37%">Item Description </label>
        </div>
      </div>
      <div class="error-message" v-if="v$.itemDesc.$error">
        {{ v$.itemDesc.$errors[0].$message }}
      </div>
      <div class="input-group mt-3">
        <div class="form-floating">
          <input
            type="number"
            placeholder="Items Quantity"
            class="form-control mx-auto"
            v-model="itemPrice"
            id="itemPrice"
            :disabled="!updateFlag"
          />
          <label for="itemPrice" style="left: 37%">Item Price</label>
        </div>
      </div>
      <div class="error-message" v-if="v$.itemPrice.$error">
        {{ v$.itemPrice.$errors[0].$message }}
      </div>
      <div class="user-message">
        {{ userMessage }}
      </div>
      <div class="controls my-5">
        <button
          class="btn btn-warning me-3"
          :style="{ opacity: updateFlag ? '1' : '0.5' }"
          @click="updateFlag ? updateItem() : (updateFlag = !updateFlag)"
        >
          Update Now
        </button>
        <button class="btn btn-link" @click="goBack()">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { between, maxLength, minLength, required } from "@vuelidate/validators";
import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";

export default {
  name: "UpdateItem",
  data() {
    return {
      updateFlag: false,
      locId: this.$route.params.locationId,
      catId: this.$route.params.categoryId,
      itemId: this.$route.params.itemId,
      itemName: "",
      itemQuantity: "",
      itemPrice: "",
      itemDesc: "",
      v$: useVuelidate(),
      userMessage: "",
      messageFlag: "",
      categoriesList: [],
    };
  },
  validations() {
    return {
      itemName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(12),
      },
      itemQuantity: { required, between: between(1, 10000) },
      itemPrice: { required, between: between(0, 10000000) },
      itemDesc: {
        required,
        minLength: minLength(20),
        maxLength: maxLength(1000),
      },
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    ...mapState(["itemInfo", "locInfo", "catInfo", "userLogin"]),
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisItem({
      locId: this.locId,
      catId: this.catId,
      itemId: this.itemId,
    });
    this.setLocInfo(this.locId);
    this.setCatInfo(this.catId);
    this.setItemInfo(this.itemId);
    this.setItemInfoInFields();
  },
  methods: {
    ...mapActions([
      "isUserLoggedIn",
      "redirectTo",
      "goHome",
      "goBack",
      "setLocInfo",
      "setItemInfo",
      "canUserAccessThisItem",
      "setCatInfo",
    ]),
    setItemInfoInFields() {
      this.itemName = this.itemInfo.name;
      this.itemQuantity = this.itemInfo.quantity;
      this.itemDesc = this.itemInfo.disc;
      this.itemPrice = this.itemInfo.price;
    },
    updateItem() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.putItemNow();
      }
    },
    async putItemNow() {
      let item = await axios.put(`http://localhost:3000/items/${this.itemId}`, {
        name: this.itemName,
        quantity: this.itemQuantity,
        price: this.itemPrice,
        disc: this.itemDesc,
        userId: this.getUserInfo.id,
        locId: this.locId,
        catId: this.catId,
      });
      if (item.status == 200) {
        this.userMessage = "This Item Updated Successfully";
        this.messageFlag = true;
        setTimeout(() => {
          this.goBack();
        }, 500);
      } else {
        this.userMessage = "Something Wrong, Please Try Again";
        this.messageFlag = false;
      }
    },
  },
};
</script>

<style lang="scss">
.w300 {
  width: 300px !important;
}
</style>
