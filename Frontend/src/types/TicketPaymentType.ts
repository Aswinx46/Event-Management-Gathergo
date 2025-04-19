export interface TicketEntity {
  
    phone: string;
    email: string;
    eventId: string;
    clientId: string;
    totalAmount:number
    purchasedTicketCount:number
    // razorPayOrderId?:string
}