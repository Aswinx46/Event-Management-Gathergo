import { clientEntity } from "../../../../entities/clientEntity";

export interface IforgetPasswordClientUseCase {
    forgetPassword(email: string, newPassword: string,otp:string): Promise<clientEntity>
}