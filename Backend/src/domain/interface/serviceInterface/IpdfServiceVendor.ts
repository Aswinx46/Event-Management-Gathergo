import { VendorPdfReportInput } from "../../entities/eventReportDataEntity"

export interface IpdfServiceVendor {
    generateVendorReportPdf(data: VendorPdfReportInput): Promise<Buffer>
}