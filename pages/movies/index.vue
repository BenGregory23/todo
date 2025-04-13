<script setup lang="ts">

import {useMovieStore} from "~/store/movies";
import {MediaType} from "~/utils/TMDBResponseToMedia";

const {$tmdb} = useNuxtApp()
const movieStore =useMovieStore()

movieStore.fetch();


async function addMovies(movies: []){

  if(movies.length > 0){
    await movieStore.batchAdd(movies);
  }
}

async function searchMedia(query:string){
  const response = await $tmdb.searchMovieByName(query);
  if(response && response) {
    return response.results
  }
}

</script>

<template>

  <main class=" w-full p-10">
    <MovieSearch :on-media-add="addMovies" :on-search="searchMedia" :media-type="MediaType.MOVIE" />
    <div class="flex gap-3 mt-10">
     <div v-for="movie in movieStore.movies" :key="movie.id" class="flex flex-col gap-2">
        <div class="hover:cursor-pointer rounded-md hover:ring ring-blue-500 transition-all" @click="movieStore.delete(movie)">
          <NuxtImg :src="'https://image.tmdb.org/t/p/w500/'+movie.posterPath" alt="" class=" aspect-auto h-full  rounded-md"/>
        </div>
      </div>
    </div>
  </main>


</template>

<style scoped>

</style>