import { IqrServiceInterface } from "../../domain/interface/serviceInterface/!qrService";
import QRcode from 'qrcode'
export class QrService implements IqrServiceInterface {
    async createQrLink(ticketId: string): Promise<string> {
        try {
            const qrCode = await QRcode.toDataURL(ticketId)
            return qrCode
        } catch (error) {
            console.log('error while creating qr code', error)
            throw new Error(error instanceof Error ? error.message : 'error while creating qr code')
        }
    }
}