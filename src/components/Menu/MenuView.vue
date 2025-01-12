<template>
  <div class="container">
    <div class="box">
      <h1 class="my-1 pb-0 display-5"># {{ locInfo.name }} #</h1>
      <div class="box d-flex justify-content-center gap-3">
        <p class="text-muted mt--1 pt-0">
          / <i>Address: {{ locInfo.address }}</i> /
        </p>
        <p class="text-muted mt--1 pt-0">
          / <i>Phone: {{ locInfo.phone }}</i> /
        </p>
      </div>
    </div>
    <div class="controls row">
      <div class="box my-3 d-flex justify-content-between">
        <router-link
          :to="{ name: 'ViewCategories', params: { locationId: locId } }"
        >
          <button class="btn btn-success me-3">View / Add Category</button>
        </router-link>

        <div class="box">
          <router-link
            :to="{ name: 'AddItem', params: { locationId: locId } }"
            v-if="state.catFlag"
          >
            <button class="btn btn-primary me-3">Add Item</button>
          </router-link>
          <button class="btn btn-link me-3" type="button" @click="goBack()">
            Go Back
          </button>
        </div>
      </div>
    </div>
    <div class="menu" v-if="state.data.length > 0">
      <div v-for="(obj, objIndex) in state.data" :key="objIndex">
        <div
          class="title-cat mb-1 text-white p-2 fs-2 category"
          @click.stop="slideCategory($event)"
        >
          #{{ objIndex + 1 }}: {{ obj.category.name }}
        </div>
        <div class="items">
          <div v-if="obj.items.length == 0">
            <div class="alert alert-warning">
              There Is No Items In This Category
            </div>
          </div>
          <div v-else v-for="(item, itemIndex) in obj.items" :key="itemIndex">
            <div class="item">
              <div class="item-separate fs-2" @click.stop="slideItem($event)">
                # {{ itemIndex + 1 }} # {{ item.name }}
              </div>
              <div class="item-info">
                <div class="title-item p-2"><b>Name: </b> {{ item.name }}</div>
                <div class="price p-2"><b>Price: </b>{{ item.price }}</div>
                <div class="desc p-2"><b>Description: </b>{{ item.disc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="alert alert-warning" v-if="!(state.data.length > 0)">
      There Is No Menu Yet
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import { mapActions, mapGetters, mapState } from "vuex";
import $ from "jquery";

export default {
  name: "MenuView",
  data() {
    return {
      locId: this.$route.params.locationId,
    };
  },
  setup() {
    let state = reactive({
      catFlag: false,
      data: [],
    });
    return {
      state,
    };
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisLocation(this.locId);
    this.setLocInfo(this.locId);
    this.checkIfTheirCats();
    this.getData();
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
    ]),
    async checkIfTheirCats() {
      await axios
        .get(`http://localhost:3000/categories?locId=${this.locId}`)
        .then((res) => {
          this.state.catFlag = res.data.length > 0;
        });
    },
    async getData() {
      await axios
        .get(
          `http://localhost:3000/categories?userId=${this.getUserInfo.id}&locId=${this.locId}`
        )
        .then(async (resCat) => {
          for (let j of resCat.data) {
            let object = {
              category: "",
              items: [],
            };
            object.category = j;
            await axios
              .get(
                `http://localhost:3000/items?userId=${this.getUserInfo.id}&locId=${this.locId}&catId=${j.id}`
              )
              .then((resItems) => {
                object.items = resItems.data;
              })
              .catch(() => {
                this.goHome();
              });
            this.state.data.push(object);
          }
        })
        .catch(() => {
          this.goHome();
        });
    },
    slideCategory: function (event) {
      if ($(event.target).hasClass("category")) {
        $(event.target).next().slideToggle();
      }
      if ($(event.target).hasClass("item-separate")) {
        $(event.target).next().slideToggle();
      }
    },
    slideItem: function (event) {
      if ($(event.target).hasClass("item-separate")) {
        $(event.target).next().slideToggle();
      }
      console.log($(event.target));
      console.log($(event.target).next());
    },
  },
};
</script>

<style lang="scss">
.mt--1 {
  margin-top: -8px;
}
.item {
  div {
    margin-bottom: 5px;
  }
  .title-item {
    background-color: rgb(112 171 237 / 67%);
  }
  .price {
    background-color: rgb(125 219 144 / 67%);
  }
  .desc {
    background-color: rgb(173 145 87 / 67%);
  }
}
.title-cat {
  background-color: rgb(34 30 30);
  cursor: pointer;
}
.item-separate {
  cursor: pointer;
}
</style>
