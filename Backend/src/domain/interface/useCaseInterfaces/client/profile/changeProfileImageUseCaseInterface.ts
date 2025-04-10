import { clientEntity } from "../../../../entities/clientEntity";

export interface IchangeProfileImageClientUseCase {
    changeProfileImage(cliendId: string, profileImage: string): Promise<clientEntity | null>
}