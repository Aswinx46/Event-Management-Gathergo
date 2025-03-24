import { clientEntity } from "../../../../entities/clientEntity";

export interface IgoogleLoginClientUseCase{
    googleLogin(client:clientEntity):Promise<clientEntity | null>
}