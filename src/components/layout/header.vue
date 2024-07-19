<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Logo from '@/assets/logo/logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive variable to track whether the menu is open
const isMenuOpen = ref(false)

// Reactive variable to track whether dark mode is enabled
const isDarkMode = ref(false)

// Reactive variable to track whether the user has scrolled down the page
const isScrolled = ref(false)

// Reactive variable to track if user is logged in
const userName = ref(localStorage.getItem('name'))

// List of menu items for the navbar
const navMenu = ref([
  { name: 'Home', route: '/', icon: 'fas fa-home' },
  { name: 'Blog', route: '/blog', icon: 'fas fa-blog' },
  { name: 'About', route: '/about', icon: 'fas fa-info-circle' },
])

// Function to toggle the menu's visibility
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

// Function to toggle dark mode
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    // Add 'dark' class to the document element for dark mode styling
    document.documentElement.classList.add('dark')
    // Store the theme preference in local storage
    localStorage.setItem('theme', 'dark')
  } else {
    // Remove 'dark' class from the document element for light mode styling
    document.documentElement.classList.remove('dark')
    // Store the theme preference in local storage
    localStorage.setItem('theme', 'light')
  }
}

// Function to handle scroll events and update isScrolled
function handleScroll() {
  isScrolled.value = window.scrollY > 0
}

// Function to handle logout
function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('name')
  userName.value = null
  router.push('/')
}

// Hook that runs when the component is mounted
onMounted(() => {
  // Check if a theme preference is stored in local storage
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
  // Add an event listener for scroll events
  window.addEventListener('scroll', handleScroll)
})

// Hook that runs before the component is unmounted
onBeforeUnmount(() => {
  // Remove the scroll event listener to prevent memory leaks
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

      <!-- Right section: Search form, dark mode toggle, and user dropdown -->
      <div class="hidden md:flex items-center space-x-4">
        <form class="relative">
          <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none">
          <button type="submit" class="absolute left-0 top-0 mt-2 ml-2 text-gray-400">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button @click="toggleDarkMode" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-12 text-center">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <div v-if="userName" class="relative">
          <button @click="toggleMenu" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">{{ userName }}</button>
          <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <router-link to="/dashboard" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</router-link>
            <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
          </div>
        </div>
        <router-link v-else to="/auth/login" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Login</router-link>
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
      <div v-if="userName">
        <div class="flex items-center px-4 py-2 hover:bg-gray-700">
          <span>{{ userName }}</span>
        </div>
        <router-link to="/dashboard" class="block px-4 py-2 hover:bg-blue-600 bg-blue-500 space-x-2 w-full"><i class="fa-solid fa-arrow-right-to-bracket"></i> Dashboard</router-link>
        <button @click="logout" class="block px-4 py-2 w-full text-left hover:bg-blue-600 bg-blue-500">Logout</button>
      </div>
      <router-link v-else to="/auth/login" class="block px-4 py-2 hover:bg-blue-600 bg-blue-500 space-x-2 w-full"><i class="fa-solid fa-arrow-right-to-bracket"></i> Login</router-link>
    </div>
  </nav>
</template>

<style scoped>
nav {
  font-family: 'Poppins', sans-serif;
}
</style>
