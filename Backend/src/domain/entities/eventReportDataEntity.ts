// export interface EventReportData {
//     eventName: string;
//     totalTicketsSold: number;
//     totalIncome: number;
//     bookings: {
//       serviceTitle: string;
//       servicePrice: number;
//       bookingDate: Date;
//       paymentStatus: string;
//       status: string;
//       clientEmail: string;
//     }[];
//   }

import { EventEntity } from "./event/eventEntity";
import { BookingPdfDTO } from "./pdf/bookingsPdfDTO";

export interface VendorPdfReportInput {
    events: EventEntity[];
    bookings: BookingPdfDTO[];
  }