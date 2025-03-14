import { clientSchema } from "../schema/clientSchema";
import { clientEntity } from "../../../domain/entities/clientEntity";
import {model,Document,ObjectId} from 'mongoose'

export interface IclientModel extends Omit<clientEntity,"_id">,Document{
    _id:ObjectId;
}

export const ClientModel=model<clientEntity>("client",clientSchema)