<script setup>
import Header from '@/components/layout/header.vue'
import Footer from '@/components/layout/footer.vue'
</script>

<template>
  <div class="body-website">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<style scoped>
.body-website {
  font-family: 'Poppins', sans-serif;
}
</style>