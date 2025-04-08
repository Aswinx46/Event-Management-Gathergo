export interface IvendorLogoutUseCase {
    vendorLogout(token:string):Promise<boolean>
}