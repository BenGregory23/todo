import { defineStore } from 'pinia';
import type {Media} from "~/types";
import PocketBase from "pocketbase";

const $pb = new PocketBase("https://wind.oxyjen.io")


export const useShowStore = defineStore('showStore', {
    state: ():{shows:Media[]} => ({
        shows: [],
    }),
    actions: {
        async fetch() {
            this.shows = await $pb.collection('series').getFullList();
        },
        async add(show:Media) {
            this.shows.push(show);
            const result = await $pb.collection("series").create(show);

            if(result){
                this.shows.push(result);
                return result;
            }
            else return null;
        },
        async batchAdd(shows:Media[]) {
            const batch = $pb.createBatch();
            shows.map((show)=>batch.collection("series").create(show))
            const result = await batch.send();
            if(result){
                result.forEach((res)=>this.shows.push(res.body))
            }
        },
        async delete(show:Media) {
            const result = await $pb.collection('shows').delete(show.id!);

            if(result){
                this.shows = this.shows.filter((s:Media) => s.id !== show.id);
                return result;
            }
            else return null;
        },
        async update(show:Media){
            const result = await $pb.collection("shows").update(show.id!,show)
            if(result){
                const localShow = this.shows.find((s:Media)=>s.id == show.id)
                if(localShow){
                    show.updatedAt = result.updatedAt
                }
            }
        }

    }
});