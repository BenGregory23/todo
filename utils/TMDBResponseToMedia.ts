import type {TMDBResponse} from "~/types";

export enum MediaType {
    MOVIE= "movie",
    TVSHOW = "tvshow",
    ANIME = "anime"

}


export default function TMDBResponseToMedia(mediaType: MediaType, media:TMDBResponse, createdBy?: string) {

    switch (mediaType){
        case MediaType.MOVIE :
            return {
                title: media.original_title,
                posterPath: media.poster_path,
                genres: media.genres,
                description: media.overview,
                releaseDate: media.release_date,
                recommended: false,
                createdBy: createdBy,
            }
        case MediaType.TVSHOW :
            return {
                title: media.original_name,
                posterPath: media.poster_path,
                genres: media.genres,
                description: media.overview,
                releaseDate: media.first_air_date,
                recommended: false,
            }
        case MediaType.ANIME :
            return {
                title: media.original_title,
                posterPath: media.poster_path,
                genres: media.genres,
                description: media.overview,
                releaseDate: media.release_date,
                recommended: false,
            }
    }
}