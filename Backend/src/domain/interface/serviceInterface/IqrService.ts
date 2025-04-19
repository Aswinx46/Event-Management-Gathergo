export interface IqrServiceInterface {
    createQrLink(ticketId: string): Promise<string>
}