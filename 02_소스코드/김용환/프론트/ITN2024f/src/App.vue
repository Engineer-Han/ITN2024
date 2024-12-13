<template>
  <!-- 머리말 : HeaderCom -->
  <HeaderCom />
  <!-- 본문 -->
  <div class="container mt-3 mb-200" >
    <router-view />
  </div>
  <!-- <FooterCom /> -->


</template>
<script>
import HeaderCom from "./components/HeaderCom.vue";
// import FooterCom from "./components/FooterCom.vue";
export default {
  components: {
    HeaderCom,
    // FooterCom,
  },
};
</script>
<style>
@import "@/assets/css/main.css";
</style>
