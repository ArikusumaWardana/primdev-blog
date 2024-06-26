<script setup>

import backgroundImage from '@/assets/jumbotron/jumbotron.jpg'

</script>

<template>
    <div class="relative bg-cover bg-center h-screen" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="absolute inset-0 bg-black opacity-70"></div>
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 class="title-jumbotron text-4xl md:text-6xl font-bold mb-4">Welcome to Digital Tales</h1>
        <p class="text-lg md:text-xl mb-8">Your go-to place for amazing digital stories and content</p>
        <router-link to="/blog" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg">Visit our Blog</router-link>
      </div>
    </div>
</template>

<style scoped>
.title-jumbotron {
    font-family: "Poppins", sans-serif;
}
</style>