
export interface IuserExistenceService {
    emailExits(email: string): Promise<Boolean>
}