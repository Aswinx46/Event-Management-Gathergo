export interface IclientUnblockUseCase {
    unblockClient(clientId: string): Promise<boolean>
}