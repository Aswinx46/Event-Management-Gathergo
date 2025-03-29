import { Document, model, ObjectId } from "mongoose";
import { categorySchema } from "../schema/categorySchema";
import { categoryEntity } from "../../../domain/entities/categoryEntity";

export interface ICategoryModel extends Omit<categoryEntity,"_id">,Document{
    _id:ObjectId;
}
export const categoryModel=model<categoryEntity>('category',categorySchema)