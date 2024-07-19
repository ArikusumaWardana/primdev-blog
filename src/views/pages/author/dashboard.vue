<script setup> 
import { onMounted, ref } from 'vue'
import getAuthor from '@/helper/getAuthor'
import axios from 'axios'
import { BASE_URL, token } from '@/helper/globalVariable'
import Card from '@/components/card.vue';
import SkeletonCard from '@/components/skeletonCard.vue';

const isLoading = ref(false)
const blogs = ref([])

const getData = async () => {
  isLoading.value = true
  try {
    const author = await getAuthor()
    const response = await axios.get(BASE_URL + 'blog/author/' + author.id, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.status === 200) {
      blogs.value = response.data
    }
  } catch (error) {
    console.error('Error fetching blogs:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getData()
})
</script>

<template>
    <div class="flex justify-between items-center pb-4">
      <span class="text-2xl uppercase dark:text-white text-gray-600 font-semibold">Blog</span>
      <router-link to="/dashboard/blog/create" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">Create Blog</router-link>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" v-if="blogs.length">
      <Card 
          v-for="blog in blogs" 
          :key="blog.id" 
          :blogId="blog.id"
          :title="blog.title" 
          :content="blog.content" 
          :image="blog.image" 
          :route="'dashboard/blog/update/' + blog.slug"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" v-else-if="isLoading">
      <SkeletonCard v-for="n in 3" :key="n" />
    </div>

    <div v-else class="flex justify-center dark:text-white text-gray-600">
      <h2 class="text-xl">You didn't have any blogs.</h2>
    </div>
</template>


  