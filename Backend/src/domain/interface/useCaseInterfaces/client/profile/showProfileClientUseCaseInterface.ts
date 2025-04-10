import { clientEntity } from "../../../../entities/clientEntity";

export interface IshowProfileClientUseCase {
    showProfile(clientId: string): Promise<clientEntity | null>
}