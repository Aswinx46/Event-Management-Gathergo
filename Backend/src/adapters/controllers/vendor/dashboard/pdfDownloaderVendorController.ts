import { Request, Response } from "express";
import { IpdfGenerateVendorUseCase } from "../../../../domain/interface/useCaseInterfaces/vendor/dashboard/pdfGenereateVendorUseCaseInterface";
import { HttpStatus } from "../../../../domain/entities/httpStatus";

export class PdfDownloaderVendorController {
    private pdfGenerateVendorUseCase: IpdfGenerateVendorUseCase
    constructor(pdfGenerateVendorUseCase: IpdfGenerateVendorUseCase) {
        this.pdfGenerateVendorUseCase = pdfGenerateVendorUseCase
    }
    async handlePdfDownloaderVendor(req: Request, res: Response): Promise<void> {
        try {
            const { vendorId } = req.body
            const pdf = await this.pdfGenerateVendorUseCase.execute(vendorId)
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=vendor-report.pdf");
            res.send(pdf);
        } catch (error) {
            console.log('error while downloading the pdf in the vendor side', error)
            res.status(HttpStatus.BAD_REQUEST).json({
                message: 'error while downloading the pdf in the vendor side',
                error: error instanceof Error ? error.message : 'error while downloading the pdf in the vendor side'
            })
        }
    }
}