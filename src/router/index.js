import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";
// Profile
import Signup from "@/views/Profile/Signup.vue";
import Login from "@/views/Profile/Login.vue";
import Profile from "@/views/Profile/Profile.vue";
import UpdateProfile from "@/views/Profile/Update.vue";
import DeleteProfile from "@/views/Profile/Delete.vue";
// Location
import AddLocation from "@/views/Locations/AddLocation.vue";
import DeleteLocation from "@/views/Locations/DeleteLocation.vue";
import UpdateLocation from "@/views/Locations/UpdateLocation.vue";
import DeleteAllLocations from "@/views/Locations/DeleteAllLocations.vue";
// Menu
import Menu from "@/views/Menu/Menu.vue";
// Category
import ViewCategories from "@/views/Categories/ViewCategories.vue";
import AddCategory from "@/views/Categories/AddCategory.vue";
import UpdateCategory from "@/views/Categories/UpdateCategory.vue";
import DeleteCategory from "@/views/Categories/DeleteCategory.vue";
import DeleteAllCategories from "@/views/Categories/DeleteAllCategories.vue";
// Item
import ViewItems from "@/views/Items/ViewItems.vue";
import AddItem from "@/views/Items/AddItem.vue";
import AddItemDirect from "@/views/Items/AddItemDirect.vue";
import DeleteAllItems from "@/views/Items/DeleteAllItems.vue";
import DeleteItem from "@/views/Items/DeleteItem.vue";
import UpdateItem from "@/views/Items/UpdateItem.vue";
import ViewItem from "@/views/Items/ViewItem.vue";
import ErrorPage from "@/views/ErrorPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/update",
    name: "UpdateProfile",
    component: UpdateProfile,
  },
  {
    path: "/delete",
    name: "DeleteProfile",
    component: DeleteProfile,
  },
  {
    path: "/add-location",
    name: "AddLocation",
    component: AddLocation,
  },
  {
    path: "/delete-location/:locationId",
    name: "DeleteLocation",
    component: DeleteLocation,
  },
  {
    path: "/update-location/:locationId",
    name: "UpdateLocation",
    component: UpdateLocation,
  },
  {
    path: "/delete-all-locations",
    name: "DeleteAllLocations",
    component: DeleteAllLocations,
  },
  {
    path: "/menu/:locationId",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/view-categories/:locationId",
    name: "ViewCategories",
    component: ViewCategories,
  },
  {
    path: "/add-category/:locationId",
    name: "AddCategory",
    component: AddCategory,
  },
  {
    path: "/delete-category/:locationId/:categoryId",
    name: "DeleteCategory",
    component: DeleteCategory,
  },
  {
    path: "/update-category/:locationId/:categoryId",
    name: "UpdateCategory",
    component: UpdateCategory,
  },
  {
    path: "/delete-all-categories/:locationId",
    name: "DeleteAllCategories",
    component: DeleteAllCategories,
  },
  {
    path: "/category/items/:locationId/:categoryId",
    name: "ViewItems",
    component: ViewItems,
  },
  {
    path: "/category/items/add-item/:locationId",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/category/items/add-item/:locationId/:categoryId",
    name: "AddItemDirect",
    component: AddItemDirect,
  },
  {
    path: "/category/items/delete-all-item/:locationId/:categoryId",
    name: "DeleteAllItems",
    component: DeleteAllItems,
  },
  {
    path: "/category/items/delete-item/:locationId/:categoryId/:itemId",
    name: "DeleteItem",
    component: DeleteItem,
  },
  {
    path: "/category/items/update-item/:locationId/:categoryId/:itemId",
    name: "UpdateItem",
    component: UpdateItem,
  },
  {
    path: "/category/items/view-item/:locationId/:categoryId/:itemId",
    name: "ViewItem",
    component: ViewItem,
  },
  // error Page
  {
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== undefined) {
    document.title = `${to.name} | ${process.env.VUE_APP_TITLE}`;
  } else {
    document.title = `Page Not Found | ${process.env.VUE_APP_TITLE}`;
  }
  next();
});

export default router;
