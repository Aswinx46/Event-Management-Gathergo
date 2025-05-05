import { ObjectId } from "mongoose";
import { EventEntity } from "../../../entities/event/eventEntity";
import { EventUpdateEntity } from "../../../entities/event/eventUpdateEntity";

export interface IeventRepository {
    createEvent(event: EventEntity): Promise<EventEntity>
    findAllEventsClient(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
    findEventsOfAVendor(vendorId: string, pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
    editEvent(eventId: string, update: EventUpdateEntity): Promise<EventEntity | null>
    findEventById(eventId: string): Promise<EventEntity | null>
    updateTicketPurchaseCount(eventId: string | ObjectId, newCount: number): Promise<EventEntity | null>
    findTotalTicketCountAndticketPurchased(eventId: string | ObjectId): Promise<{ totalTicket: number, ticketPurchased: number }>
    findEventByIdForTicketVerification(eventId: string): Promise<EventEntity | null>
    findTotalTicketAndBookedTicket(eventId: string): Promise<EventEntity | null>
    findEventsBaseOnCategory(category: string, pageNo: number, sortBy: string): Promise<{ events: EventEntity[] | [], totalPages: number }>
    findEventsBasedOnQuery(query: string): Promise<EventEntity[] | []>
    findEventsNearToYou(latitude: number, longitude: number, totalPages: number, range: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
    listingEventsInAdminSide(pageNo: number): Promise<{ events: EventEntity[] | [], totalPages: number }>
    findTotalEvents(vendorId: string, datePeriod: Date | null): Promise<number>
    findRecentEvents(vendorId: string): Promise<EventEntity[] | []>
    findTotalticketsSold(vendorId: string,datePeriod:Date | null): Promise<number>
}