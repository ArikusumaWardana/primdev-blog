<script setup>
  import baseInput from '@/components/baseInput.vue';
  import {reactive, ref} from 'vue';
  import axios from 'axios';
  import { BASE_URL } from '@/helper/globalVariable';
  import router from '@/router/routes';

  const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  // const isLoading = ref(false)

  const register = async () => {
  if (registerForm.repeatPassword == registerForm.password) {
    try {
      const response = await axios.post('https://primdev.alwaysdata.net/api/register', registerForm)
      if (response.status == 200) {
        localStorage.setItem('token', response.data.token)
        router.push('/auth/login')
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    console.log('Confirm Password dan Password tidak sama')
  }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div class="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm mx-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center dark:text-white">Register</h2>
        <form @submit.prevent="register" method="post" class="text-sm">
          <baseInput v-model="registerForm.username" input-title="Username" input-name="username" input-placeholder="Type your username" input-icon="fas fa-user"/>
          <baseInput v-model="registerForm.email" input-title="Email" input-name="email" input-placeholder="Type your email" input-icon="fas fa-envelope" input-type="email"/>
          <baseInput v-model="registerForm.password" input-title="Password" input-name="password" input-placeholder="Type your password" input-icon="fas fa-lock" input-type="password"/>
          <baseInput v-model="registerForm.repeatPassword" input-title="Repeat Password" input-name="repeatPassword" input-placeholder="Repeat your password" input-icon="fas fa-repeat" input-type="password"/>
          <div class="flex items-center justify-between mb-6">
            <button type="submit" class="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold focus:outline-none focus:ring focus:ring-blue-500 uppercase">
              Register
            </button>
          </div>
          <div class="text-center dark:text-gray-200 text-gray-500 text-sm">
            Already have an account? 
            <router-link to="/auth/login" class="text-blue-500 hover:text-blue-700 font-bold">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <style scoped>
  
  input::placeholder {
    color: #a0aec0;
  }
  </style>
  