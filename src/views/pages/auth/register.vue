<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <div class="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm mx-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
        <form @submit.prevent="" class="text-sm">
          <div class="mb-4">
            <label for="username" class="block text-gray-600 text-sm font-bold mb-2">Username</label>
            <div class="flex items-center border-b-2 border-gray-300 py-2">
              <i class="fas fa-user text-gray-400 mr-2"></i>
              <input type="text" id="username" class="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500" placeholder="Type your username" required>
            </div>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-600 text-sm font-bold mb-2">Email</label>
            <div class="flex items-center border-b-2 border-gray-300 py-2">
              <i class="fas fa-envelope text-gray-400 mr-2"></i>
              <input type="email" id="email" class="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500" placeholder="Type your email" required>
            </div>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-gray-600 text-sm font-bold mb-2">Password</label>
            <div class="flex items-center border-b-2 border-gray-300 py-2">
              <i class="fas fa-lock text-gray-400 mr-2"></i>
              <input type="password" id="password" class="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500" placeholder="Type your password" required>
            </div>
          </div>
          <div class="mb-6">
            <label for="repeatPassword" class="block text-gray-600 text-sm font-bold mb-2">Repeat Password</label>
            <div class="flex items-center border-b-2 border-gray-300 py-2">
              <i class="fas fa-repeat text-gray-400 mr-2"></i>
              <input type="repeatPassword" id="repeatPassword" class="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500" placeholder="Repeat your password" required>
            </div>
          </div>
          <div class="flex items-center justify-between mb-6">
            <button type="submit" class="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold focus:outline-none focus:ring focus:ring-blue-500 uppercase">
              Register
            </button>
          </div>
          <div class="text-center text-gray-500 text-sm">
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
  