<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Logo from '@/assets/logo/logo.png';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isMenuOpen = ref(false);
const isDarkMode = ref(false);
const isScrolled = ref(false);
const getToken = ref(localStorage.getItem('token'));

// List of menu items for the navbar
const navMenu = ref([
  { name: 'Home', route: '/', icon: 'fas fa-home' },
  { name: 'Blog List', route: '/blog-list', icon: 'fas fa-blog' },
]);

// Function to toggle the menu's visibility
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// Function to toggle dark mode
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

// Function to handle scroll events and update isScrolled
function handleScroll() {
  isScrolled.value = window.scrollY > 0;
}

// Function to handle logout
function logout() {
  alert('Logged out');
  localStorage.removeItem('token');
  location.reload();
}

// Function to handle search submission
function handleSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.searchInput.value.trim();
  if (searchQuery) {
    router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
  } else {
    router.push('/blog-list');
  }
}

// Hook that runs when the component is mounted
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
  window.addEventListener('scroll', handleScroll);
});

// Hook that runs before the component is unmounted
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav :class="['fixed top-0 w-full z-50 transition-colors duration-300', isScrolled ? 'dark:bg-gray-800 bg-gray-100' : 'bg-transparent']">
    <div class="container mx-auto px-4 flex justify-between items-center py-4 text-white">
      <!-- Left section: Website name -->
      <div class="flex items-center space-x-4">
        <img :src="Logo" alt="Logo" class="h-8 w-8">
        <span class="text-xl font-bold uppercase dark:text-white text-gray-500">PRIMDEV BLOG</span>
      </div>

      <!-- Middle section: Menu items -->
      <div class="hidden md:flex space-x-4">
        <router-link 
          v-for="(data, index) in navMenu" 
          :key="index" 
          :to="data.route" 
          class="px-4 py-2 rounded dark:text-white text-gray-500 hover:bg-blue-600 hover:text-white"
          :class="{ 'bg-blue-600 rounded text-white': route.path === data.route }"
        >
          {{ data.name }}
        </router-link>
      </div>

      <!-- Right section: Search form, dark mode toggle, and user dropdown -->
      <div class="hidden md:flex items-center space-x-4">
        <form @submit="handleSearch" class="relative">
          <input 
            name="searchInput" 
            type="text" 
            placeholder="Search..." 
            class="pl-10 pr-4 py-2 rounded dark:bg-gray-700 dark:text-white bg-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button type="submit" class="absolute left-0 top-0 mt-2 ml-2 text-gray-400">
            <i class="fas fa-search"></i>
          </button>
        </form>
        <button @click="toggleDarkMode" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-12 text-center">
          <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
        </button>
        <div v-if="getToken" class="relative">
          <button @click="toggleMenu" class="text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2 rounded">User</button>
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
        <form @submit="handleSearch" class="relative">
          <input 
            name="searchInput" 
            type="text" 
            placeholder="Search..." 
            class="w-full pl-10 pr-4 py-2 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button type="submit" class="absolute left-0 top-0 mt-2 ml-2 text-gray-400">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div v-for="(data, index) in navMenu" :key="index" class="flex items-center px-4 py-2 hover:bg-gray-700">
        <router-link 
          :to="data.route" class="flex items-center space-x-2 w-full">
          <i :class="data.icon"></i>
          <span>{{ data.name }}</span>
        </router-link>
      </div>
      <div v-if="getToken">
        <div class="flex items-center px-4 py-2 hover:bg-gray-700">
          <span>User</span>
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
