export interface IpdfGenerateVendorUseCase {
    execute(vendorId:string):Promise<Buffer>
}