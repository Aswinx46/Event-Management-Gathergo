export interface IclientBlockUseCase {
    blockClient(clientId: string): Promise<boolean>
}