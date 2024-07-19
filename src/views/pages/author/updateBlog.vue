<script setup>
import BaseInput from '@/components/baseInput.vue';
import BaseTextArea from '@/components/baseTextArea.vue';
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios'
import { BASE_URL, token } from '@/helper/globalVariable'
import { useRoute, useRouter } from 'vue-router';

const inputData = reactive({
    title: '',
    content: '',
    image: null
})

const isLoading = ref(false)
const previewImage = ref(null)
const router = useRouter()
const slug = useRoute().params.slug
const blogId = ref(null)

const getBlogDetail = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(BASE_URL + 'blog/' + slug)
    if (response.status === 200) {
      inputData.title = response.data.title
      inputData.content = response.data.content
      previewImage.value = response.data.image
      blogId.value = response.data.id
    }
  } catch (error) {
    console.error('Error fetching blog detail:', error)
  } finally {
    isLoading.value = false
  }
}

const updateBlog = async () => {
  // set loading jadi true
  isLoading.value = true
  // handle data yang ingin dikirim
  try {
    const formData = new FormData()
    formData.append('_method', 'put')
    formData.append('title', inputData.title)
    formData.append('content', inputData.content)
    if (inputData.image) {
      formData.append('image', inputData.image)
    }

    // mengirimkan datanya
    const response = await axios.post(BASE_URL + 'blog/' + blogId.value, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      }
    })
    // handle data jika berhasil dikirim
    if (response.status === 200 || response.status === 201) {
      isLoading.value = false
      router.push('/dashboard')
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    previewImage.value = URL.createObjectURL(file)
    inputData.image = file
  } else {
    previewImage.value = null
    inputData.image = null
  }
}

onMounted(() => {
  getBlogDetail()
})
</script>

<template>
  <div class="mx-auto px-4 lg:px-10 py-8 md:mt-18 mt-14">
    <div class="">
      <form @submit.prevent="updateBlog">
        <BaseInput 
        v-model="inputData.title"
        input-title="Title"
        input-name="title"
        input-placeholder="Type blog title"
        input-type="text" 
        />
        <BaseTextArea 
        v-model="inputData.content"
        input-title="Content"
        input-name="content"
        input-placeholder="Type blog content..."
        input-type="text"
        />
        <div class="mb-4">
          <label for="image" class="block text-gray-700 dark:text-gray-300 font-bold mb-2" >Upload Image</label>
          <input 
            type="file" 
            id="image"
            name="image"
            @change="handleImageChange"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div class="mb-4"><img v-show="previewImage" :src="previewImage" alt="Preview Image"></div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center">
          <div v-if="isLoading" role="status">
            <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
          <span v-else>Update Blog</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>
