import { clientEntity } from "../../../entities/clientEntity"
export interface IadminRepository{
    findbyEmail(email:string):Promise<clientEntity | null>
}