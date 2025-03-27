<template>
  <div>
    <TooltipProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TooltipProvider>

  </div>
</template>


<script setup lang="ts">
const {$pb} = useNuxtApp()
</script>