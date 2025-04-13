export type User = {
    id:string,
    email:string,
    emailVisibility:boolean,
    verified:boolean,
    name:string,
    avatar:string,
    createdAt:Date,
    updatedAt:Date
}

export type Task = {
    id:string,
    title:string,
    content:string,
    timeLimit:Date | null,
    urgency: Urgency,
    isDone:boolean
    createdBy: string,
    createdAt:Date,
    updatedAt:Date
}

export type Media = {
    id:string | undefined,
    title:string,
    posterPath:string,
    genres: Genre[],
    description:string,
    releaseDate: Date,
    createdBy: string,
    recommended: boolean,
    createdAt:Date| null,
    updatedAt:Date | null,
}

export enum Genre {
    ACTION = 'Action',
    ADVENTURE = 'Adventure',
    ANIMATION = 'Animation',
    COMEDY = 'Comedy',
    CRIME = 'Crime',
    DOCUMENTARY = 'Documentary',
    DRAMA = 'Drama',
    FAMILY = 'Family',
    FANTASY = 'Fantasy',
    HISTORY = 'History',
    HORROR = 'Horror',
    MUSIC = 'Music',
    MYSTERY = 'Mystery',
    ROMANCE = 'Romance',
    SCIENCE_FICTION = 'Science Fiction',
    TV_MOVIE = 'TV Movie',
    THRILLER = 'Thriller',
    WAR = 'War',
    WESTERN = 'Western'
}



export enum Urgency {
    CRITICAL = 'Critical',
    URGENT = 'Urgent',
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low'
}

export type TMDBResponse = {
    id: number,
    original_name: string | null | undefined,
    original_title : string,
    backdrop_path: string,
    poster_path: string,
    release_date : string,
    first_air_date: string,
    overview : string,
    genres: any,

}