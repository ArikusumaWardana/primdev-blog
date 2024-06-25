<script setup>
import { ref, onMounted } from 'vue'
import Logo from '@/assets/logo/logo.png'

const isMenuOpen = ref(false)
const isDarkMode = ref(false)

// List Menu yang isi pada navbar
const navMenu = ref([
  {name: 'Home', route: '/'},
  {name: 'Blog', route: '/blog'},
  {name: 'About', route: '/about'},
])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Check local storage for theme preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <nav class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 flex justify-between items-center py-4">

      <!-- Left section: Website name -->
      <div class="flex items-center space-x-4">
        <img :src="Logo" alt="Logo" class="h-8 w-8">
        <span class="text-xl font-bold">Digital Tales</span>
      </div>

      <!-- Middle section: Menu items -->
      <div class="hidden md:flex space-x-8">
        <router-link v-for="(data, index) in navMenu" :key="index" :to="data.route" class="hover:text-gray-300">{{ data.name }}</router-link>
      </div>

      <!-- Right section: Search form, dark mode toggle, and login button -->
      <div class="flex items-center space-x-4">
        <form class="relative">
          <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none">
          <button type="submit" class="absolute left-0 top-0 mt-2 ml-2 text-gray-400">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        <button @click="toggleDarkMode" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-12 text-center">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>

      <!-- Hamburger menu for mobile -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-gray-400 focus:outline-none">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden">
      <router-link v-for="(data, index) in navMenu" :key="index" :to="data.route" class="block px-4 py-2 hover:bg-gray-700">{{ data.name }}</router-link>
    </div>
  </nav>
</template>