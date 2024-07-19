<script setup>
import { truncateText } from '@/helper/globalVariable';
import { ref, onMounted } from 'vue';

const props = defineProps({
    blog_id: Number,
    title: String,
    slug: String,
    image: String,
    content: String,
    route: String
});

// Define reactive variable to hold truncate length
const truncateLength = ref(80);

// Update truncate length based on screen size
const updateTruncateLength = () => {
    if (window.innerWidth <= 640) { // Small devices
        truncateLength.value = 50;
    } else if (window.innerWidth <= 1024) { // Medium devices
        truncateLength.value = 65;
    } else { // Large devices
        truncateLength.value = 80;
    }
};

// Listen to window resize event to dynamically update truncate length
onMounted(() => {
    updateTruncateLength();
    window.addEventListener('resize', updateTruncateLength);
});

</script>

<template>
    <router-link :to="props.route" class="card flex flex-col sm:flex-row dark:bg-gray-800 bg-gray-100 p-4 rounded-lg shadow-md">
        <img :src="props.image" :alt="props.title" class="w-full sm:w-1/3 h-48 sm:h-full object-cover rounded-lg mr-0 sm:mr-4 mb-4 sm:mb-0">
        <div class="w-full sm:w-2/3">
            <h3 class="text-xl font-semibold mb-2 dark:text-white">{{ props.title }}</h3>
            <p class="text-gray-500 dark:text-gray-400">{{ truncateText(props.content, truncateLength) }}</p>
        </div>
    </router-link>
</template>

<style scoped>

.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover h3 {
    color: rgb(0, 76, 252);
}

@media (max-width: 640px) {
    /* Styles for small devices */
    .truncate-length {
        /* Update truncate length dynamically */
        --truncate-length: 50;
    }
}

@media (min-width: 641px) and (max-width: 1024px) {
    /* Styles for medium devices */
    .truncate-length {
        --truncate-length: 65;
    }
}

@media (min-width: 1025px) {
    /* Styles for large devices */
    .truncate-length {
        --truncate-length: 80;
    }
}
</style>
