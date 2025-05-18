export interface IadminLogoutUseCase {
    logout(token: string): Promise<boolean>
}