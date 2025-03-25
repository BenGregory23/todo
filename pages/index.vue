<script setup lang="ts">


import {Film, Gamepad, List, Shrimp, Tv, AlarmClock} from "lucide-vue-next";

const routes = [

  {
    name: 'Tasks',
    icon: List,
    path: '/tasks',
  },
  {
    name: 'Events',
    icon: AlarmClock,
    path: '/events',
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
    name: 'Games',
    icon: Gamepad,
    path: '/games',
  },
  {
    name: 'Restaurants',
    icon: Shrimp,
    path: '/restaurants',
  },
]

</script>

<template>

  <div class="bg-white py-24 sm:py-32 w-full flex flex-col items-center justify-center">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
        <NuxtLink :to="route.path" class="bg-gray-400/10 p-8 sm:p-10 flex flex-col justify-center items-center" v-for="route in routes" :key="route.name">
          <component :is="route.icon" class="max-h-12 w-full object-contain" />
          <p class="text-lg font-semibold mt-4">
            {{ route.name }}
          </p>
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

