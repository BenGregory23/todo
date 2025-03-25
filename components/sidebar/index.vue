<script setup lang="ts">
import {Umbrella, Home, List, Film, Tv, Shrimp } from "lucide-vue-next";


const activeRoute = ref("Home");
const routes = [
  {
    name: 'Home',
    icon: Home,
    path: '/',
  },
  {
    name: 'Tasks',
    icon: List,
    path: '/tasks',
  },
  {
    name: 'Movies',
    icon: Film,
    path: '/movies',
  },
  {
    name: 'TV Shows',
    icon: Tv,
    path: '/shows',
  },
  {
    name: 'Restaurants',
    icon: Shrimp,
    path: '/restaurants',
  },
]

</script>

<template>
<div class="h-svh w-20 border-r border-black  flex flex-col justify-between items-center">

  <div class="flex flex-col items-center space-y-5">
    <span class="py-4">
      <NuxtImg src="https://cdn.discordapp.com/icons/696675534364606565/5fba0f63f22f6f1ade53ca32d934a06b.webp?size=240" alt="Logo" class="size-14 rounded-full" />
  </span>

    <div class="flex flex-col items-center space-y-4">

      <Tooltip v-for="route in routes" :key="route.name">
        <NuxtLink  :to="route.path"  variant="ghost">
        <TooltipTrigger  @click="()=>{
        console.log(route.name);
        activeRoute = route.name;
      }"  class="" :class="`border   border-2 hover:bg-gray-100 flex justify-center items-center rounded-lg p-3 ${activeRoute === route.name ? 'border-black' : 'border-transparent'}`">

            <component :is="route.icon" class="size-6"/>
        </TooltipTrigger>
        </NuxtLink>

        <TooltipContent>
          <p>{{route.name}}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  </div>



  <div>
    <Avatar>
      <AvatarImage src="https://github.com/unovue.png" alt="@unovue" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</div>
</template>

<style scoped>

</style>