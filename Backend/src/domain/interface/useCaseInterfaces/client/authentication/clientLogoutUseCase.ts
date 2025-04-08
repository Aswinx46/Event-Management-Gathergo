import { IjwtInterface } from "../../../serviceInterface/IjwtService";
import { IredisService } from "../../../serviceInterface/IredisService";

export interface IclientLogoutUseCase {
    clientLogout(token:string):Promise<boolean>
}