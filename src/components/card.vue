<script setup>
    import { useRoute } from 'vue-router';
    import { defineProps } from 'vue';
    import { truncateText } from '@/helper/globalVariable'

    const props = defineProps({
        blog_id: Number,
        title: String,
        slug: String,
        image: String,
        content: String,
    })
</script>

<template>
    <router-link :to="'/blog/' + props.blog_id" class="flex dark:bg-gray-800 bg-gray-100 p-4 rounded-lg shadow-md">
        <img :src="props.image" :alt="props.title" class="w-1/3 h-full object-cover rounded-lg mr-4">
        <div class="w-2/3">
            <h3 class="text-xl font-semibold mb-2">{{ props.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ truncateText(props.content, 80) }}</p>
        </div>
    </router-link>
</template>