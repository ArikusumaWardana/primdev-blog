<script setup>
import Sidebar from '@/components/layout/sidebar.vue';
import { ref, onMounted } from 'vue';

const isDarkMode = ref(false);
const isOpen = ref(false);
const isMenuOpen = ref(false);
const username = localStorage.getItem('name');

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

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function logout() {
  alert('Logged out');
  localStorage.removeItem('token')
  location.reload()
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<template>
  <div class="flex h-screen" style="font-family: Poppins, sans-serif;">
    <Sidebar class="w-64 hidden lg:block" />

    <div class="flex-1 p-8">
      <div class="flex justify-between items-center mb-8 border-b-2 pb-3 border-gray-600">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button @click="toggleMenu" class="block lg:hidden py-2 px-4 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
              <i class="fas fa-bars"></i>
            </button>
            <div v-if="isMenuOpen" class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
              <router-link to="/" class="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                Dashboard
              </router-link>
            </div>
          </div>
          <h1 class="text-3xl font-bold dark:text-white hidden lg:block">Welcome to Dashboard!</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="toggleDarkMode" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-12 text-center">
            <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
          <div class="relative">
            <button @click="isOpen = !isOpen" class="block py-2 px-4 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
              User
            </button>
            <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
              <router-link to="/" class="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                Home
              </router-link>
              <button @click="logout"class="w-full text-left py-2 px-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>


      <routerView />
    </div>
  </div>
</template>

