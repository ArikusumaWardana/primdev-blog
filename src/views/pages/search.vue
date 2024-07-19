<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import Card from '@/components/card.vue';
import SkeletonCard from '@/components/skeletonCard.vue';
import { BASE_URL, token } from '@/helper/globalVariable';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const blogs = ref([]);
const isLoading = ref(true);
const searchQuery = ref(route.query.search || '');

// Function to fetch blogs based on the search query
const fetchBlogs = async (query) => {
  const url = query
    ? `https://primdev.alwaysdata.net/api/blog/search/${encodeURIComponent(query)}`
    : `${BASE_URL}/blog`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}` // Replace YOUR_API_TOKEN with your actual token
      }
    });
    if (response.status === 200) {
      blogs.value = response.data;
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
  } finally {
    isLoading.value = false;
  }
};

// Watch for changes in the search query from URL and fetch blogs accordingly
watch(() => route.query.search, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery;
    fetchBlogs(searchQuery.value);
  } else {
    // Redirect to blog-list if search query is empty
    router.push('/blog-list');
  }
}, { immediate: true });
</script>

<template>
  <div class="min-h-screen p-4 md:mt-18 mt-14">
    <div class="container mx-auto">
      <div class="mb-8 text-center">
        <form hidden @submit.prevent="() => fetchBlogs(searchQuery.value)">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search blogs..."
            class="w-full md:w-1/2 mx-auto px-4 py-2 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            class="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Search
          </button>
        </form>
      </div>

      <h2 class="text-3xl md:text-4xl font-bold mb-8 md:text-left text-center dark:text-white text-gray-700">
        Results for "{{ searchQuery }}"
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Display Skeleton Loaders while data is loading -->
        <SkeletonCard v-if="isLoading" v-for="n in 6" :key="n" />

        <!-- Display actual cards when data is available -->
        <Card v-for="blog in blogs" 
          :key="blog.id" 
          :title="blog.title" 
          :route="'blog/' + blog.slug"
          :image="blog.image" 
          :content="blog.content" />
      </div>
    </div>
  </div>
</template>
