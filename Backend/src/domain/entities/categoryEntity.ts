import { ObjectId } from "mongoose";

export interface categoryEntity{
    _id?:ObjectId;
    categoryId:string;
    title:string;
    image:string;
    status?:string
}