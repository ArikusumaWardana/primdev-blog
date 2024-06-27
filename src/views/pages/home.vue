<script setup>
import backgroundImage from '@/assets/jumbotron/jumbotron.jpg'

// Dummy data for card
const recentBlogs = [
  {
    title: 'The Future of Web Development',
    image: '@/assets/blog/blog1.jpg',
    excerpt: 'Discover the latest trends and technologies shaping the future of web development. This is a really long excerpt to demonstrate the truncation feature.',
  },
  {
    title: 'A Guide to Modern JavaScript',
    image: '@/assets/blog/blog2.jpg',
    excerpt: 'JavaScript has evolved significantly over the years. Here\'s a guide to understanding modern JavaScript.',
  },
  {
    title: 'Tips for Responsive Web Design',
    image: '@/assets/blog/blog3.jpg',
    excerpt: 'Responsive web design is crucial in today\'s mobile-first world. Here are some tips to get you started.',
  },
  {
    title: 'Understanding Vue.js Lifecycle Hooks',
    image: '@/assets/blog/blog4.jpg',
    excerpt: 'Lifecycle hooks are an essential part of Vue.js. This article explains how they work and how to use them.',
  },
  {
    title: 'Exploring CSS Grid',
    image: '@/assets/blog/blog5.jpg',
    excerpt: 'CSS Grid is a powerful layout system available in CSS. Let’s explore how it works and how you can use it.',
  },
]

// Fungsi untuk melakukan truncate pada card desc
const truncateText = (text, length) => {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}
</script>

<template>
  <div>
    <!-- Jumbotron Section -->
    <div class="relative bg-cover bg-center h-screen" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="absolute inset-0 bg-black opacity-70"></div>
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to Digital Tales</h1>
        <p class="text-lg md:text-xl mb-8">Your go-to place for amazing digital stories and content</p>
        <router-link to="/blog" class="btn-jumbotron bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg">Visit our Blog</router-link>
      </div>
    </div>

    <!-- Recent Blog Section -->
    <section class="dark:bg-gray-900 py-12 dark:text-white">
      <div class="container mx-auto px-8 lg:px-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-8 text-left dark:text-white text-gray-700">Recent Blog Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(blog, index) in recentBlogs" :key="index" class="flex dark:bg-gray-800 bg-gray-100 p-4 rounded-lg shadow-md">
            <img :src="blog.image" alt="Blog Image" class="w-1/3 h-20 object-cover rounded-lg mr-4">
            <div class="w-2/3">
              <h3 class="text-xl font-semibold mb-2">{{ blog.title }}</h3>
              <p class="text-gray-400">{{ truncateText(blog.excerpt, 80) }}</p>
            </div>
          </div>
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
