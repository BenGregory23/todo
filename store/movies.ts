import { defineStore } from 'pinia';
import type {Media} from "~/types";
import PocketBase from "pocketbase";

const $pb = new PocketBase("https://wind.oxyjen.io")


export const useMovieStore = defineStore('movieStore', {
    state: ():{movies:Media[]} => ({
        movies: [],
    }),
    actions: {
        async fetch() {
            this.movies = await $pb.collection('movies').getFullList();
        },
        async add(movie:Media) {
            this.movies.push(movie);
            const result = await $pb.collection('movies').create(movie);

            if(result){
                this.movies.push(result);
                return result;
            }
            else return null;
        },
        async batchAdd(medias:Media[]) {
            const batch = $pb.createBatch();
            medias.map((media)=>batch.collection("movies").create(media))
            const result = await batch.send();
            if(result){
                result.forEach((res)=>this.movies.push(res.body))
            }
        },
        async delete(movie:Media) {
            const result = await $pb.collection('movies').delete(movie.id!);

            if(result){
                this.movies = this.movies.filter((m:Media) => m.id !== movie.id);
                return result;
            }
            else return null;
        },
        async update(movie:Media){
            const result = await $pb.collection("movies").update(movie.id!,movie)
            if(result){
                const localMovie = this.movies.find((m:Media)=>m.id == movie.id)
                if(localMovie){
                    movie.updatedAt = result.updatedAt
                }
            }
        }

    }
});