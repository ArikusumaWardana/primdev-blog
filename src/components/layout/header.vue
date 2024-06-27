<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Logo from '@/assets/logo/logo.png'

const isMenuOpen = ref(false)
const isDarkMode = ref(false)
const isScrolled = ref(false)

// List Menu yang isi pada navbar
const navMenu = ref([
  { name: 'Home', route: '/', icon: 'fas fa-home' },
  { name: 'Blog', route: '/blog', icon: 'fas fa-blog' },
  { name: 'About', route: '/about', icon: 'fas fa-info-circle' },
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

function handleScroll() {
  isScrolled.value = window.scrollY > 0
}

// Check local storage for theme preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['fixed top-0 w-full z-50 transition-colors duration-300', isScrolled ? 'bg-gray-800' : 'bg-transparent']">
    <div class="container mx-auto px-4 flex justify-between items-center py-4 text-white">

      <!-- Left section: Website name -->
      <div class="flex items-center space-x-4">
        <img :src="Logo" alt="Logo" class="h-8 w-8">
        <span class="text-xl font-bold uppercase">Digital Tales</span>
      </div>

      <!-- Middle section: Menu items -->
      <div class="hidden md:flex space-x-4">
        <router-link v-for="(data, index) in navMenu" :key="index" :to="data.route" class="px-4 py-2 rounded hover:bg-blue-600">{{ data.name }}</router-link>
      </div>

      <!-- Right section: Search form, dark mode toggle, and login button -->
      <div class="hidden md:flex items-center space-x-4">
        <form class="relative">
          <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none">
          <button type="submit" class="absolute left-0 top-0 mt-2 ml-2 text-gray-400">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Login</button>
        <button @click="toggleDarkMode" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-12 text-center">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
      </div>

      <!-- Hamburger menu for mobile -->
      <div class="md:hidden flex items-center space-x-4">
        <button @click="toggleDarkMode" class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-2 rounded w-10 text-center">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <button @click="toggleMenu" class="text-gray-400 focus:outline-none">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-gray-800 transition-all duration-300 ease-in-out z-40 text-white">
      <div class="px-4 py-2 relative">
        <form class="relative">
          <input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none">
          <button type="submit" class="absolute left-0 top-0 mt-2 ml-2 text-gray-400">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div v-for="(data, index) in navMenu" :key="index" class="flex items-center px-4 py-2 hover:bg-gray-700">
        <router-link :to="data.route" class="flex items-center space-x-2 w-full">
          <i :class="data.icon"></i>
          <span>{{ data.name }}</span>
        </router-link>
      </div>     
      <router-link to="/login" class="block px-4 py-2 hover:bg-blue-600 bg-blue-500 space-x-2 w-full"><i class="fa-solid fa-arrow-right-to-bracket"></i> Login</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  font-family: 'Poppins', sans-serif;
}
</style>