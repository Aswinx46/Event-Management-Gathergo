import { User } from "./userEntity";
export interface clientEntity extends User{
    clientId:string,
    googleVerified?:boolean
}