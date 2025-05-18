import { IbookingRepository } from "../../../domain/interface/repositoryInterfaces/booking/bookingsRepositoryInterface";
import { IeventRepository } from "../../../domain/interface/repositoryInterfaces/event/eventRepositoryInterface";
import { IpdfServiceVendor } from "../../../domain/interface/serviceInterface/IpdfServiceVendor";
import { IpdfGenerateVendorUseCase } from "../../../domain/interface/useCaseInterfaces/vendor/dashboard/pdfGenereateVendorUseCaseInterface";

export class PdfGenerateVendorUseCase implements IpdfGenerateVendorUseCase {
    private eventDatabase: IeventRepository
    private bookingDatabase: IbookingRepository
    private pdfServiceVendor: IpdfServiceVendor
    constructor(eventDatabase: IeventRepository, bookingDatabase: IbookingRepository, pdfServiceVendor: IpdfServiceVendor) {
        this.eventDatabase = eventDatabase
        this.bookingDatabase = bookingDatabase
        this.pdfServiceVendor = pdfServiceVendor
    }
    async execute(vendorId: string): Promise<Buffer> {
        const events = await this.eventDatabase.findAllEventsOfAVendor(vendorId)

        const bookings = await this.bookingDatabase.findBookingsOfAVendor(vendorId)

        return await this.pdfServiceVendor.generateVendorReportPdf({ events, bookings });
    }
}