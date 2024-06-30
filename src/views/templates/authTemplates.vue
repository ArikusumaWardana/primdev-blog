<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Reactive variable to track whether dark mode is enabled
const isDarkMode = ref(false)

// Hook that runs when the component is mounted
onMounted(() => {
  // Check if a theme preference is stored in local storage
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})


</script>

<template>
  <div class="body-website">
    <router-view />
  </div>
</template>

<style scoped>
.body-website {
  font-family: 'Poppins', sans-serif;
}
</style>