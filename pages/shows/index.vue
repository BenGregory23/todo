<script setup lang="ts">

import {MediaType} from "~/utils/TMDBResponseToMedia";
import {useShowStore} from "~/store/shows";

const {$tmdb} = useNuxtApp()
const showStore = useShowStore()

showStore.fetch();

async function addShow(shows: []){
  if(shows.length > 0){
    await showStore.batchAdd(shows);
  }
}

async function searchMedia(query:string){
  const response = await $tmdb.searchTvShowByName(query);
  if(response && response) {
    return response.results
  }
}

</script>

<template>

  <main class=" w-full p-10">
    <MovieSearch :on-media-add="addShow" :on-search="searchMedia" :media-type="MediaType.TVSHOW" />
    <div class="flex gap-3 mt-10">
      <div v-for="show in showStore.shows" :key="show.id" class="flex flex-col gap-2">
        <div class="hover:cursor-pointer rounded-md hover:ring ring-blue-500 transition-all" @click="showStore.delete(show)">
          <NuxtImg :src="'https://image.tmdb.org/t/p/w500/'+show.posterPath" alt="" class=" aspect-auto h-full  rounded-md"/>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>