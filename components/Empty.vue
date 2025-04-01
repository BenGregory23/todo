<script setup lang="ts">
const {text} = defineProps({
    text: {
        type: String,
        required: false,
        default: "No content to display"
    }
});
</script>

<template>
<main class="w-full min-h-40 h-full rounded-md p-10 border border-dashed flex items-center justify-center">
    <p class="text-sm text-muted-foreground">
      {{ text }}
    </p>
</main>
</template>

<style scoped>

</style>