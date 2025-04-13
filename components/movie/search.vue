<script setup lang="ts">
import type {TMDBResponse} from "~/types";
import {MediaType} from "~/utils/TMDBResponseToMedia";

const query = ref('');
const {$pb} = useNuxtApp()
const results = ref<TMDBResponse[]>();
const selectedResults = ref<Set<TMDBResponse>>(new Set())

const {onMediaAdd, onSearch, mediaType} = defineProps({
  onSearch: Function,
  onMediaAdd: Function,
  mediaType: {
    type: MediaType,
    required: true
  }
})

async function search(){
  if(onSearch == null || onMediaAdd == null){
    throw  new Error("onSearch and onMediaAdd props are undefined")
  }
  results.value = await onSearch(query.value)
}

function selectResult(result:TMDBResponse){
  if(selectedResults.value.has(result)){
    selectedResults.value.delete(result)
  }
  else {
    selectedResults.value.add(result)
  }
}

function isSelectedResult(media:any){
  let isSelected = false;
  if(!media){
    throw new Error("A media is required")
  }
 selectedResults.value.forEach((object:TMDBResponse)=>{
   if(object.id == media.id) isSelected = true;
 })

  return isSelected
}
</script>

<template>


  <Drawer v-if="onMediaAdd && onSearch && mediaType">
    <DrawerTrigger><Button>Add</Button></DrawerTrigger>
    <DrawerContent class="p-4">
      <DrawerHeader class="w-full flex justify-center">
        <div class="flex items-center gap-2">
          <Input v-model="query" type="text" placeholder="Type something" @keydown.enter="search" ref="" />
          <Button @click="search" >Search</Button>
          <Button v-if="selectedResults.size > 0" @click="onMediaAdd(Array.from(selectedResults).map((media:TMDBResponse) => TMDBResponseToMedia(mediaType,media,$pb.authStore.record!.id)))">
            Add {{selectedResults.size}}
          </Button>
        </div>

      </DrawerHeader>

      <div class="flex flex-col items-center gap-4 w-full">


        <Carousel class="w-2/3 " v-if="results?.length > 0">
          <CarouselContent>
            <CarouselItem @click="()=>selectResult(media)" v-for="(media) in results" class="relative  basis-1/6 hover:cursor-pointer" >


              <NuxtImg v-if="media.poster_path" :src="'https://image.tmdb.org/t/p/w500/'+media.poster_path" class="object-cover w-full transition-all rounded-md border" :class="`${isSelectedResult(media) ? 'scale-95 ring ring-blue-500 opacity-85 ' : ''}`" />
              <span v-else class="border border-dashed rounded-md flex justify-center items-center text-muted-foreground h-full flex-grow p-3">
                    No poster to display
              </span>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div v-else class="lg:h-72 border border-dashed rounded-md flex justify-center items-center text-muted-foreground w-full h-full flex-grow p-3">
          Enter something to search
        </div>
      </div>
    </DrawerContent>
  </Drawer>



</template>