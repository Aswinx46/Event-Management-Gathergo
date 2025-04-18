import { EventType } from "./EventType";

export interface EventEntity extends EventType {
    _id: string
    posterImage: string[]
}