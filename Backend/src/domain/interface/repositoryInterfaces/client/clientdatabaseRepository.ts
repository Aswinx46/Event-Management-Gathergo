import { clientEntity } from "../../../entities/clientEntity";
export interface IClientDatabaseRepository {
    createClient(client: clientEntity): Promise<clientEntity | null>
    findByEmail(email: string): Promise<clientEntity | null>
    findAllClients(pageNo: number): Promise<{ clients: clientEntity[]; totalPages: number }>
    googleLogin(client: clientEntity): Promise<clientEntity | null>
    forgotPassword(email: string, newPassword: string): Promise<clientEntity | null>
    findById(id: string): Promise<clientEntity | null>
    changeProfileImage(clientId: string, profileImage: string): Promise<clientEntity | null>
    showProfileDetails(cliendId: string): Promise<clientEntity | null>
    updateProfile(client: clientEntity): Promise<clientEntity>
}