<template>
  <img src="@/assets/error.avif" alt="" />
  <div class="controls">
    <button
      class="btn btn-primary mx-5"
      @click="$router.push({ name: 'Home' })"
    >
      Go Home
    </button>
    <button class="btn btn-primary" @click="$router.go(-1)">Cancel</button>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style>
img {
  max-width: 100%;
}
</style>
