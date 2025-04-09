import { clientEntity } from "../../../entities/clientEntity"
export interface IadminRepository {
    findbyEmail(email: string): Promise<clientEntity | null>
    findById(id: string): Promise<clientEntity | null>
    findState(id:string):Promise<string | null>
}