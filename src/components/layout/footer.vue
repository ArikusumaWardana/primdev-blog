<script setup>
import { ref } from 'vue'

// Array of navigation links, used for creating a navigation menu
const navigations = ref([
  { name: 'Home', route: '/' }, 
  { name: 'Blog', route: '/blog' }, 
  { name: 'About', route: '/about' } 
])

// Array of contact information, used for displaying contact details
const contact = ref([
  { name: 'Email', icon: 'fas fa-envelope', value: 'arikusumawardana09@gmail.com' }, 
  { name: 'Phone', icon: 'fas fa-phone', value: '+62 853 3930 7788' }
])

// Array of social media links, used for linking to social media profiles
const socialMedia = ref([
  { name: 'Github', icon: 'fab fa-github', route: 'https://github.com/ArikusumaWardana' }, 
  { name: 'Instagram', icon: 'fab fa-instagram', route: 'https://www.instagram.com/arikusuma.05/' }
])

</script>

<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4 md:px-8 lg:px-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 class="text-lg font-bold mb-4">Digital Tales</h4>
          <p class="text-sm">
            Your go-to place for amazing digital stories and content. We strive to bring you the latest in technology, design, and development.
          </p>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4">Navigations</h4>
          <ul class="text-sm">
            <li class="mb-2" v-for="(data, index) in navigations" :key="index">
              <router-link :to="data.route" class="hover:text-blue-500">{{data.name}}</router-link>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4">Contact</h4>
          <ul class="text-sm">
            <li class="mb-2" v-for="(data, index) in contact" :key="index">
              <i :class="data.icon" class="mr-2"></i> {{data.value}} 
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            <a v-for="(data, index) in socialMedia" :key="index" :href="data.route" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-blue-500">
              <i :class="data.icon"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="text-center mt-8 border-t border-gray-700 pt-4">
        <p class="text-sm">&copy; 2023 Digital Tales. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
