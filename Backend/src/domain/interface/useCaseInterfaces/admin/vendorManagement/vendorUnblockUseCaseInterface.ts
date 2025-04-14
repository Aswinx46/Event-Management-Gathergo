export interface IvendorUnblockUsecase {
    vendorUnblock(vendorId: string): Promise<boolean>
}