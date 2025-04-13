import TmdbService from "~/service/tmdb.service";

export default defineNuxtPlugin(() => {
    const tmdb = new TmdbService()
    return {
        provide:{
            tmdb: tmdb
        }
    }
})