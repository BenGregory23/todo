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

export enum Urgency {
    CRITICAL = 'Critical',
    URGENT = 'Urgent',
    HIGH = 'Hig',
    MEDIUM = 'Medium',
    LOW = 'Low'
}