import { ImageBufferType } from "../../../../entities/bufferType/ImageBufferType";
import { ClientUpdateProfileEntity } from "../../../../entities/client/clientUpdateProfileDTO";
import { clientEntity } from "../../../../entities/clientEntity";

export interface IupdateProfileDataUseCase {
    updateClientProfile(client: ClientUpdateProfileEntity,imageDetails:ImageBufferType[]): Promise<clientEntity | null>
}