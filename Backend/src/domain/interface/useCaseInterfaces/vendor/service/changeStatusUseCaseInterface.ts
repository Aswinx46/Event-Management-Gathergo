export interface IchangeStatusServiceUseCase {
    changeStatus(serviceId: string): Promise<boolean>
}