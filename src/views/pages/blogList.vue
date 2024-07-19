<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Card from '@/components/card.vue';
import SkeletonCard from '@/components/skeletonCard.vue';
import { BASE_URL } from '@/helper/globalVariable';

const blogs = ref([]);
const isLoading = ref(true); // Set to true initially

const fetchBlogs = async () => {
  try {
    const response = await axios.get(BASE_URL + 'blog');
    if (response.status === 200) {
      blogs.value = response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false; // Set to false after fetching
  }
};

onMounted(() => {
  fetchBlogs();
});
</script>

<template>
  <div class="min-h-screen p-4 md:mt-18 mt-14">
    <div class="container mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-8 md:text-left text-center dark:text-white text-gray-700">All Blog Posts</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Display Skeleton Loaders while data is loading -->
        <SkeletonCard v-if="isLoading" v-for="n in 6" :key="n" />

        <!-- Display actual cards when data is available -->
        <Card v-for="blog in blogs" 
        :key="blog.id" 
        :title="blog.title" 
        :to="'blog/' + blog.slug"
        :image="blog.image" 
        :content="blog.content" />
      </div>
    </div>
  </div>
</template>
