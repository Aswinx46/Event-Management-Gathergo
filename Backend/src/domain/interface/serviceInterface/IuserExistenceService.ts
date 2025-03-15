import { clientEntity } from "../../entities/clientEntity";

export interface IuserExistenceService {
    clientFindByEmail(email: string): Promise<clientEntity | null>
}