<script setup>
const props = defineProps({
    inputTitle: String,
    inputName: String,
    inputPlaceholder: String,
    inputType: String,
    modelValue: [String, Number]
})
</script>

<template>
    <div class="mb-4">
        <label :for="props.inputName" class="block text-gray-700 dark:text-gray-300 font-bold mb-2">{{ props.inputTitle }}</label>
        <textarea 
        :type="props.inputType"
        :placeholder="props.inputPlaceholder"
        :value="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        rows="10">
        </textarea>
    </div>
</template>