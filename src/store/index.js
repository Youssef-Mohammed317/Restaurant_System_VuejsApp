import { createStore } from "vuex";
import router from "@/router/index";
import axios from "axios";

const state = {
  userLogin: {
    id: "",
    email: "",
    password: "",
    name: "",
    userMessage: "",
    messageFlag: false,
  },
  locInfo: {},
  catInfo: {},
  itemInfo: {},
};
const getters = {
  getUserInfo(state) {
    return state.userLogin;
  },
  getLocInfo(state) {
    return state.locInfo;
  },
  getCatInfo(state) {
    return state.catInfo;
  },
  getItemInfo(state) {
    return state.itemInfo;
  },
  getUserId(state) {
    return state.userLogin.id;
  },
  getUserEmail(state) {
    return state.userLogin.email;
  },
  getUserPassword(state) {
    return state.userLogin.password;
  },
  getEmailFlag(state) {
    return state.emailFlag;
  },
  getEmailId(state) {
    return state.emailId;
  },
};
const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  goBack(state) {
    router.go(-1);
  },
  goForward(state) {
    router.go(1);
  },
  goHome(state) {
    this.commit("redirectTo", "Home");
  },
  async isUserLoggedIn(state) {
    let user = localStorage.getItem("user-info");
    if (user) {
      state.userLogin.id = JSON.parse(user).id;
      state.userLogin.email = JSON.parse(user).email;
      state.userLogin.password = JSON.parse(user).pass;
      state.userLogin.name = JSON.parse(user).name;
    } else {
      this.commit("redirectTo", "Login");
    }
  },
  isUserLogOut(state) {
    localStorage.removeItem("user-info");
    state.userLogin.id = "";
    state.userLogin.email = "";
    state.userLogin.password = "";
    state.userLogin.name = "";
    state.userLogin.locations = [];
    state.userLogin.userMessage = "";
    state.userLogin.messageFlag = false;
    state.locInfo = {};
    state.catInfo = {};
    setTimeout(() => {
      this.commit("redirectTo", "Login");
    }, 300);
  },
  async deleteProfile(state) {
    this.commit("delAllLocations");
    await axios
      .delete(`http://localhost:3000/users/${state.userLogin.id}`)
      .then(() => {
        state.userLogin.userMessage = "This Account Is Successfully Deleted ";
        state.userLogin.messageFlag = true;
        setTimeout(() => {
          this.commit("isUserLogOut");
        }, 500);
      })
      .catch(() => {
        state.userLogin.userMessage = "Something Wrong, Please Try Again";
        state.userLogin.messageFlag = false;
        this.commit("goHome");
      });
  },
  emptyUserMessage(state) {
    setTimeout(() => {
      state.userLogin.userMessage = "";
      state.userLogin.messageFlag = false;
    }, 1000);
  },
  async canUserAccessThisLocation(state, locId) {
    let locations = [];
    let locs = await axios
      .get(`http://localhost:3000/locations?userId=${state.userLogin.id}`)
      .then((res) => {
        for (let j of res.data) {
          locations.push(j.id);
        }
      })
      .catch(() => {
        this.commit("goHome");
      });
    if (!locations.includes(locId)) {
      this.commit("goHome");
    }
  },
  async setLocInfo(state, locId) {
    let loc = await axios
      .get(`http://localhost:3000/locations/${locId}`)
      .then((res) => {
        state.locInfo = res.data;
      })
      .catch(() => {
        this.commit("goHome");
      });
  },
  async deleteLocation(state, locId) {
    this.commit("delAllCategories", locId);
    let loc = await axios
      .delete(`http://localhost:3000/locations/${locId}`)
      .then((res) => {
        state.userLogin.userMessage = "This Location Is Successfully Deleted ";
        state.userLogin.messageFlag = true;
        setTimeout(() => {
          this.commit("goHome");
        }, 500);
      })
      .catch(() => {
        state.userLogin.userMessage = "Something Wrong, Please try again";
        state.userLogin.messageFlag = false;
        this.commit("goHome");
      });
    this.commit("emptyUserMessage");
  },
  async delAllLocations(state) {
    let locsFlags = [];
    let locs = await axios
      .get(`http://localhost:3000/locations?userId=${state.userLogin.id}`)
      .then(async (res) => {
        for (let j of res.data) {
          this.commit("delAllCategories", j.id);
          let loc = await axios
            .delete(`http://localhost:3000/locations/${j.id}`)
            .then(() => {
              locsFlags.push(true);
            })
            .catch(() => {
              locsFlags.push(false);
            });
        }
      })
      .catch(() => {
        state.userLogin.userMessage = "Something Wrong, Please try again";
        state.userLogin.messageFlag = false;
        this.commit("goHome");
      });
    if (!locsFlags.includes(false)) {
      state.userLogin.userMessage = "All Locations Are Successfully Deleted ";
      state.userLogin.messageFlag = true;
      setTimeout(() => {
        this.commit("goHome");
      }, 500);
    } else {
      state.userLogin.userMessage = "Something Wrong, Please try again";
      state.userLogin.messageFlag = false;
    }
    this.commit("emptyUserMessage");
  },
  async canUserAccessThisCategory(state, payload) {
    let categories = [];
    let cats = await axios
      .get(
        `http://localhost:3000/categories?userId=${state.userLogin.id}&locId=${payload.locId}`
      )
      .then((res) => {
        for (let j of res.data) {
          categories.push(j.id);
        }
      })
      .catch(() => {
        this.commit("goHome");
      });
    if (!categories.includes(payload.categoryId)) {
      this.commit("goHome");
    }
  },
  async setCatInfo(state, catId) {
    let cat = await axios
      .get(`http://localhost:3000/categories/${catId}`)
      .then((res) => {
        state.catInfo = res.data;
      })
      .catch(() => {
        this.commit("goHome");
      });
  },
  async deleteCategory(state, catId) {
    this.commit("delAllItems", catId);
    let cat = await axios
      .delete(`http://localhost:3000/categories/${catId}`)
      .then(() => {
        state.userLogin.userMessage =
          "This Category And His Items Is Successfully Deleted ";
        state.userLogin.messageFlag = true;
        setTimeout(() => {
          this.commit("goBack");
        }, 500);
      })
      .catch(() => {
        state.userLogin.userMessage = "Something Wrong, Please try again";
        state.userLogin.messageFlag = false;
        this.commit("goHome");
      });
    this.commit("emptyUserMessage");
  },
  async delAllCategories(state, locId) {
    let catsFlags = [];
    let cats = await axios
      .get(
        `http://localhost:3000/categories?userId=${state.userLogin.id}&locId=${locId}`
      )
      .then(async (res) => {
        for (let j of res.data) {
          this.commit("delAllItems", j.id);
          let cat = await axios
            .delete(`http://localhost:3000/categories/${j.id}`)
            .then(() => {
              catsFlags.push(true);
            })
            .catch(() => {
              catsFlags.push(false);
              this.commit("goBack");
            });
        }
      })
      .catch(() => {
        state.userLogin.userMessage = "Something Wrong, Please try again";
        state.userLogin.messageFlag = false;
        this.commit("goBack");
      });
    if (!catsFlags.includes(false)) {
      state.userLogin.userMessage = "All Categories Are Successfully Deleted ";
      state.userLogin.messageFlag = true;
      setTimeout(() => {
        this.commit("goBack");
      }, 500);
    } else {
      state.userLogin.userMessage = "Something Wrong, Please try again";
      state.userLogin.messageFlag = false;
    }
    this.commit("emptyUserMessage");
  },
  async canUserAccessThisItem(state, payload) {
    let itemsArray = [];
    let items = await axios
      .get(
        `http://localhost:3000/items?userId=${state.userLogin.id}&locId=${payload.locId}&catId=${payload.catId}`
      )
      .then((res) => {
        for (let j of res.data) {
          itemsArray.push(j.id);
        }
      })
      .catch(() => {
        this.commit("goBack");
      });
    if (!itemsArray.includes(payload.itemId)) {
      this.commit("goBack");
    }
  },
  async setItemInfo(state, itemId) {
    let item = await axios
      .get(`http://localhost:3000/items/${itemId}`)
      .then((res) => {
        state.itemInfo = res.data;
      })
      .catch(() => {
        this.commit("goBack");
      });
  },
  async deleteItem(state, itemId) {
    let item = await axios
      .delete(`http://localhost:3000/items/${itemId}`)
      .then(() => {
        state.userLogin.userMessage = "This Item Is Successfully Deleted ";
        state.userLogin.messageFlag = true;
        setTimeout(() => {
          this.commit("goBack");
        }, 500);
      })
      .catch(() => {
        state.userLogin.userMessage = "Something Wrong, Please try again";
        state.userLogin.messageFlag = false;
      });
    this.commit("emptyUserMessage");
  },
  async delAllItems(state, catId) {
    let itemsFlags = [];
    let items = await axios
      .get(
        `http://localhost:3000/items?userId=${state.userLogin.id}&catId=${catId}`
      )
      .then(async (res) => {
        for (let j of res.data) {
          let item = await axios
            .delete(`http://localhost:3000/items/${j.id}`)
            .then(() => {
              itemsFlags.push(true);
            })
            .catch(() => {
              itemsFlags.push(false);
            });
        }
      })
      .catch(() => {
        state.userLogin.userMessage = "Something Wrong, Please try again";
        state.userLogin.messageFlag = false;
      });
    if (!itemsFlags.includes(false)) {
      state.userLogin.userMessage = "All Items Are Successfully Deleted ";
      state.userLogin.messageFlag = true;
      setTimeout(() => {
        this.commit("goBack");
      }, 500);
    } else {
      state.userLogin.userMessage = "Something Wrong, Please try again";
      state.userLogin.messageFlag = false;
    }
    this.commit("emptyUserMessage");
  },
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload);
  },
  goBack({ commit }) {
    commit("goBack");
  },
  goHome({ commit }) {
    commit("goHome");
  },
  goForward({ commit }) {
    commit("goForward");
  },
  isUserLoggedIn({ commit }) {
    commit("isUserLoggedIn");
  },
  isUserLogOut({ commit }) {
    commit("isUserLogOut");
  },
  deleteProfile({ commit }) {
    commit("deleteProfile");
  },
  canUserAccessThisLocation({ commit }, locId) {
    commit("canUserAccessThisLocation", locId);
  },
  setLocInfo({ commit }, locId) {
    commit("setLocInfo", locId);
  },
  deleteLocation({ commit }, locId) {
    commit("deleteLocation", locId);
  },
  delAllLocations({ commit }) {
    commit("delAllLocations");
  },
  canUserAccessThisCategory({ commit }, payload) {
    commit("canUserAccessThisCategory", payload);
  },
  setCatInfo({ commit }, catId) {
    commit("setCatInfo", catId);
  },
  deleteCategory({ commit }, catId) {
    commit("deleteCategory", catId);
  },
  delAllCategories({ commit }, locId) {
    commit("delAllCategories", locId);
  },
  canUserAccessThisItem({ commit }, payload) {
    commit("canUserAccessThisItem", payload);
  },
  setItemInfo({ commit }, catId) {
    commit("setItemInfo", catId);
  },
  deleteItem({ commit }, catId) {
    commit("deleteItem", catId);
  },
  delAllItems({ commit }, locId) {
    commit("delAllItems", locId);
  },
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
