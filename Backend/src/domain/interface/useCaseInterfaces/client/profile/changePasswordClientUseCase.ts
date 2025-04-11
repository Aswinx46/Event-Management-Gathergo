import { clientEntity } from "../../../../entities/clientEntity";

export interface IchangePasswordClientUseCAse {
    changePasswordClient(clientId: string, Oldpassword: string, newPassword: string): Promise<clientEntity | null>
}