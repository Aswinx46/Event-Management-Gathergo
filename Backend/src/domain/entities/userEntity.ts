import { ObjectId } from "mongoose"

export interface User{
    _id?:ObjectId,
    name:string,
    email:string,
    phone:number,
    password?:string,
    role:'client'|'vendor' | 'admin',
    status?:'active'|'block',
    profileImage?:string
    createdAt?:Date,
    lastLogin?:Date,
    onlineStatus?:'online'|'offline',
    isAdmin?:boolean
}