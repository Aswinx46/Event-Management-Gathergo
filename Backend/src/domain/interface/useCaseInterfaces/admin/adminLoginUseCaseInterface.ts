import { clientEntity } from "../../../entities/clientEntity"
export interface IadminLoginUseCase{
    handleLogin(email:string,password:string):Promise<clientEntity | null>
}