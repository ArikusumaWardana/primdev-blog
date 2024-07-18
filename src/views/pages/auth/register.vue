<script setup>
  import baseInput from '@/components/baseInput.vue';
  import {reactive, ref} from 'vue';
  import axios from 'axios';

  const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  });
</script>

<template>
    <div class="min-h-screen flex items-center justify-center dark:bg-gray-900">
      <div class="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm mx-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center dark:text-white">Register</h2>
        <form @submit.prevent="" class="text-sm">
          <base-input v-model="registerForm.username" input-title="Username" input-name="username" input-placeholder="Type your username" input-icon="fas fa-user"></base-input>
          <base-input v-model="registerForm.email" input-title="Email" input-name="email" input-placeholder="Type your email" input-icon="fas fa-envelope" input-type="email"></base-input>
          <base-input v-model="registerForm.password" input-title="Password" input-name="password" input-placeholder="Type your password" input-icon="fas fa-lock" input-type="password"></base-input>
          <base-input v-model="registerForm.repeatPassword" input-title="Repeat Password" input-name="repeatPassword" input-placeholder="Repeat your password" input-icon="fas fa-repeat" input-type="password"></base-input>
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
  