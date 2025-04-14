export interface IvendorBlockUseCase {
    blockVendor(vendorId: string): Promise<boolean>
}