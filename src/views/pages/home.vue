<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Card from '@/components/card.vue'
import backgroundImage from '@/assets/jumbotron/jumbotron.jpg'
import { BASE_URL } from '@/helper/globalVariable'

const recentBlogs = ref([]);

const fetchRecentBlog = async () => {
  try {
    const response = await axios.get(BASE_URL + 'blog')
    if(response.status == 200) {
      recentBlogs.value = response.data.slice(0,6)
    }
  } catch(error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchRecentBlog();
})

</script>

<template>
  <div>
    <!-- Jumbotron Section -->
    <div class="relative bg-cover bg-center h-screen" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="absolute inset-0 bg-black opacity-70"></div>
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to Digital Tales</h1>
        <p class="text-lg md:text-xl mb-8">Your go-to place for amazing digital stories and content</p>
        <router-link to="/blog-list" class="btn-jumbotron bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg">Visit our Blog</router-link>
      </div>
    </div>

    <!-- Recent Blog Section -->
    <section class="dark:bg-gray-900 py-12 dark:text-white">
      <div class="container mx-auto px-8 lg:px-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-8 text-left dark:text-white text-gray-700">Recent Blog Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="blog in recentBlogs" 
          :key="blog.title" 
          :title="blog.title" 
          :image= "blog.image" 
          :content="blog.content" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
h1, p, .btn-jumbotron {
  font-family: "Poppins", sans-serif;
}

h2, h3 {
  font-family: "Poppins", sans-serif;
}

.btn-jumbotron {
  font-family: "Poppins", sans-serif;
}
</style>
