<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Logo from '@/assets/logo/logo.png'

const isDarkMode = ref(false);
const isOpen = ref(false);
const router = useRouter();

function logout() {
  alert('Logged out');
  router.push('/');
}

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

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<template>
  <div class="h-screen dark:bg-gray-900 flex flex-col justify-between p-4">
    <div>
      <div class="flex items-center mb-8">
        <img :src="Logo" alt="Logo" class="w-12 h-12 mr-2" />
        <h1 class="text-2xl font-bold dark:text-white">Primdev Blog</h1>
      </div>
      <ul>
        <li>
          <router-link to="/dashboard" class="block py-2 px-4 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            Dashboard
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>



