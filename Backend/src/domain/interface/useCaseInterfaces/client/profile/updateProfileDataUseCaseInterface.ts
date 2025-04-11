import { ClientUpdateProfileEntity } from "../../../../entities/client/clientUpdateProfileDTO";
import { clientEntity } from "../../../../entities/clientEntity";

export interface IupdateProfileDataUseCase {
    updateClientProfile(client: ClientUpdateProfileEntity): Promise<clientEntity | null>
}