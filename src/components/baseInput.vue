<script setup>
    const props = defineProps({
        inputTitle: String,
        inputName: String,
        inputPlaceholder: String,
        inputIcon: String,
        inputType: {
            type: String,
            default: 'text'
        },
        modelValue: [String, Number]
    })
</script>

<template>
    <div class="mb-4">
        <label :for="props.inputName" class="block text-gray-600 dark:text-white text-sm font-bold mb-2">{{ props.inputTitle }}</label>
        <div class="flex items-center border-b-2 border-gray-300 py-2">
            <i :class="props.inputIcon + ' text-gray-400 mr-2'"></i>
            <input :type="props.inputType" :id="props.inputName" :name="props.inputName" class="appearance-none bg-transparent border-none w-full dark:text-gray-200 text-gray-700 leading-tight focus:outline-none focus:border-blue-500" :placeholder="props.inputPlaceholder" v-model="props.modelValue" required>
        </div>
    </div>
</template>
