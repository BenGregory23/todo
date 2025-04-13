export default class TmdbService {

    private apiKey: string;


    constructor() {
        const config = useRuntimeConfig()
        if (!config.public.TMDB_API_KEY) {
            throw new Error("TMDB API Key is not defined in the runtime config.");
        }
        this.apiKey = config.public.TMDB_API_KEY;
    }

    async searchMovieByName(name: string, params: any = {}) {
        return fetch(" https://api.themoviedb.org/3/search/movie?query="+name,{
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            }
        }).then((response)=>response.json())
    }

    async getMovieDetails(id: number) {
        return fetch("https://api.themoviedb.org/3/movie/"+id,{
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            }
        }).then((response)=>response.json())
    }

    async searchTvShowByName(name: string, params: any = {}) {
        return fetch("https://api.themoviedb.org/3/search/tv?query="+name,{
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            }
        }).then((response)=>response.json())
    }

    async getTvShowDetails(id: number) {
        return fetch(" https://api.themoviedb.org/3/tv/"+name,{
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
            }
        }).then((response)=>response.json())
    }
}