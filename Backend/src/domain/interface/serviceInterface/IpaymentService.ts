import { TicketFromFrontend } from "../../entities/Ticket/ticketFromFrotendType";

export interface IStripeService {
    createPaymentIntent(
      amount: number,
      purpose: 'ticket' | 'service',
      metadata: Record<string, TicketFromFrontend>
    ): Promise<string>;
  
    confirmPayment(paymentIntentId: string): Promise<any>;
  }