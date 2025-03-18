import { clientEntity } from "../../entities/clientEntity";

export interface IuserExistenceService {
    emailExits(email: string): Promise<Boolean>
}