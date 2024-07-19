<script setup>
import { ref } from 'vue';
import Card from '@/components/card.vue';

const blogDetail = ref({
  title: 'The Future of Web Development',
  image: 'https://via.placeholder.com/800x400',
  content: '<p>Discover the latest trends and technologies shaping the future of web development. This article delves into the advancements in frameworks, tools, and best practices that are driving the web forward.</p><p>From AI-driven development to the increasing importance of performance and accessibility, we cover the key areas that developers need to focus on.</p>',
  author: 'John Doe',
});

const relatedBlogs = ref([
  {
    id: 2,
    title: 'A Guide to Modern JavaScript',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'JavaScript has evolved significantly over the years. Here\'s a guide to understanding modern JavaScript.',
  },
  {
    id: 3,
    title: 'Tips for Responsive Web Design',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'Responsive web design is crucial in today\'s mobile-first world. Here are some tips to get you started.',
  },
  {
    id: 4,
    title: 'Understanding Vue.js Lifecycle Hooks',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'Lifecycle hooks are an essential part of Vue.js. This article explains how they work and how to use them.',
  },
  {
    id: 5,
    title: 'Exploring CSS Grid',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'CSS Grid is a powerful layout system available in CSS. Let’s explore how it works and how you can use it.',
  },
  {
    id: 6,
    title: 'Advanced React Patterns',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'Take your React skills to the next level with these advanced patterns and techniques.',
  },
]);

const randomBlogs = ref([
  {
    id: 7,
    title: 'Getting Started with TypeScript',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'TypeScript is a powerful tool for building large-scale JavaScript applications. Learn how to get started.',
  },
  {
    id: 8,
    title: 'Effective State Management in Vue',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'State management is crucial in complex applications. Here\'s how to manage state effectively in Vue.',
  },
  {
    id: 9,
    title: 'Building Progressive Web Apps',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'Progressive Web Apps offer a native app-like experience on the web. Learn how to build one.',
  },
  {
    id: 10,
    title: 'Introduction to WebAssembly',
    image: 'https://via.placeholder.com/200x150',
    excerpt: 'WebAssembly is a game-changer for web development. This introduction covers the basics you need to know.',
  },
]);

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
        <div class="p-6 mb-8 border-b-2 dark:border-gray-800 border-gray-300">
          <h1 class="text-3xl font-bold mb-2 dark:text-white">{{ blogDetail.title }}</h1>
          <p class="text-gray-500 dark:text-gray-400 mb-4 flex items-center justify-between">
            By: {{ blogDetail.author }}
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

        <h2 class="text-2xl font-bold mt-12 mb-6 dark:text-white">You might also like</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card 
            v-for="blog in randomBlogs" 
            :key="blog.id" 
            :blog_id="blog.id" 
            :title="blog.title" 
            :image="blog.image" 
            :content="blog.excerpt" 
          />
        </div>
      </div>

      <!-- Right Section: Related Blogs -->
      <div class="lg:w-1/3 mt-8 lg:mt-0">
        <h2 class="text-2xl font-bold mb-6 dark:text-white">Related Blogs</h2>
        <div class="border-t border-gray-300 dark:border-gray-700 mb-6"></div>
        <div class="space-y-6">
          <Card 
            v-for="blog in relatedBlogs" 
            :key="blog.id" 
            :blog_id="blog.id" 
            :title="blog.title" 
            :image="blog.image" 
            :content="blog.excerpt" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
