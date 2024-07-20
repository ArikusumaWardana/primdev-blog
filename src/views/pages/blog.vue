<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { BASE_URL } from '@/helper/globalVariable'
import Card from '@/components/card.vue';
import SkeletonCard from '@/components/skeletonCard.vue';

const route = useRoute();
const slug = ref(route.params.slug);
const blogDetail = ref(null);
const relatedBlogs = ref([]);
const randomBlogs = ref([]);
const isLoading = ref(false);

const getBlogDetail = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(BASE_URL + 'blog/' + slug.value);
    if (response.status === 200) {
      blogDetail.value = response.data;
      document.title = blogDetail.value.title + ' | Primdev Blog'
      await getRelatedBlogs();
      await getRandomBlogs();
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const getRelatedBlogs = async () => {
  try {
    const response = await axios.get(BASE_URL + 'blog');
    if (response.status === 200) {
      relatedBlogs.value = response.data.slice(0, 4);
    }
  } catch (error) {
    console.log(error);
  }
};

const getRandomBlogs = async () => {
  try {
    const response = await axios.get(BASE_URL + 'blog/random');
    if (response.status === 200) {
      randomBlogs.value = response.data.slice(0, 4);
    }
  } catch (error) {
    console.log(error);
  }
};

// Initial fetch
onMounted(() => {
  getBlogDetail();
});

// Watch for changes in route params
watch(() => route.params.slug, (newSlug) => {
  slug.value = newSlug;
  getBlogDetail();
});

const shareUrl = 'https://example.com/blog/the-future-of-web-development';

const shareToWhatsApp = () => {
  window.open(`https://api.whatsapp.com/send?text=${shareUrl}`, '_blank');
};

const shareToInstagram = () => {
  alert('Instagram does not support direct sharing from web. You can copy the URL and share it manually.');
};

const shareToFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
};

</script>

<template>
  <div class="container mx-auto px-4 lg:px-16 py-8 md:mt-18 mt-14">
    <div class="flex flex-col lg:flex-row">
      <!-- Left Section: Blog Details -->
      <div class="lg:w-2/3 pr-4">
        <div v-if="isLoading" class="p-6 mb-8 border-b-2 dark:border-gray-800 border-gray-300">
          <!-- Skeleton Loader -->
          <div :class="{'animate-pulse': isLoading}">
            <!-- Title Skeleton -->
            <div class="h-8 rounded mb-4 w-3/4 skeleton-loader"></div>
            <!-- Image Skeleton -->
            <div class="h-64 rounded mb-4 w-full skeleton-loader"></div>
            <!-- Content Skeleton -->
            <div class="space-y-4">
              <div class="h-4 rounded w-full skeleton-loader"></div>
              <div class="h-4 rounded w-4/5 skeleton-loader"></div>
              <div class="h-4 rounded w-3/4 skeleton-loader"></div>
            </div>
          </div>
        </div>
        <div v-else-if="blogDetail" class="p-6 mb-8 border-b-2 dark:border-gray-800 border-gray-300">
          <!-- Blog Details -->
          <h1 class="text-3xl font-bold mb-2 dark:text-white">{{ blogDetail.title }}</h1>
          <p class="text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-end">
            <div class="ml-4 flex space-x-2">
              <button @click="shareToWhatsApp" class="text-green-500 hover:text-green-600 dark:bg-gray-700 bg-gray-200 rounded-lg py-1 px-2">
                <i class="fab fa-whatsapp"></i>
              </button>
              <button @click="shareToInstagram" class="text-pink-500 hover:text-pink-600 dark:bg-gray-700 bg-gray-200 rounded-lg py-1 px-2">
                <i class="fab fa-instagram"></i>
              </button>
              <button @click="shareToFacebook" class="text-blue-600 hover:text-blue-700 dark:bg-gray-700 bg-gray-200 rounded-lg py-1 px-2">
                <i class="fab fa-facebook-f"></i>
              </button>
            </div>
          </p>
          <img :src="blogDetail.image" alt="Blog Image" class="w-full h-64 object-cover rounded-lg mb-6">
          <div class="text-gray-700 dark:text-gray-300 mb-4" v-html="blogDetail.content"></div>
        </div>
        <div v-else class="p-6 mb-8 border-b-2 dark:border-gray-800 border-gray-300">
          <p class="text-gray-500 dark:text-gray-400">Blog not found.</p>
        </div>

        <h2 class="text-2xl font-bold mt-12 mb-6 dark:text-white">You might also like</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <SkeletonCard v-if="isLoading" v-for="n in 4" :key="n" />
            <Card 
                v-for="blog in randomBlogs" 
                v-else
                :key="blog.id" 
                :title="blog.title" 
                :route="'/blog/' + blog.slug"
                :image="blog.image" 
                :content="blog.content" 
            />
        </div>
      </div>

      <!-- Right Section: Related Blogs -->
      <div class="lg:w-1/3 mt-8 lg:mt-0">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">Related Blogs</h2>
        <div class="border-t border-gray-300 dark:border-gray-700 mb-6"></div>
        <div class="space-y-6">
            <div v-if="isLoading" class="space-y-6">
                <SkeletonCard v-for="n in 4" :key="n" />
            </div>
            <Card 
                v-for="blog in relatedBlogs" 
                v-else
                :key="blog.id" 
                :title="blog.title"
                :route="'/blog/' + blog.slug"
                :image="blog.image" 
                :content="blog.content" 
            />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Skeleton Loader Styles */
h1, h2, p, .btn {
  font-family: "Poppins", sans-serif;
}

img {
  object-fit: cover;
  height: auto;
  width: 100%;
}

button {
  font-size: 1rem;
}

/* Skeleton loader styles for light and dark themes */
.skeleton-loader {
  background-color: #e0e0e0; /* Default light mode */
  background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: pulse 1.5s infinite ease-in-out;
}

.dark .skeleton-loader {
  background-color: #4a4a4a; /* Dark mode */
  background-image: linear-gradient(90deg, #6a6a6a 25%, #4a4a4a 50%, #6a6a6a 75%);
  background-size: 200% 100%;
}

@keyframes pulse {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
