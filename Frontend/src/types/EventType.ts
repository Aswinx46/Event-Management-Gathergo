export interface EventType {
    _id:string
    title: string;
    description: string;
    location: {
        longitude: number,
        latitude: number
    },
    startTime: Date;
    endTime: Date;
    posterImage: File[] | string[] | null;
    pricePerTicket: number;
    maxTicketsPerUser: number;
    totalTicket: number;
    date: Date[];
    createdAt: Date;
    ticketPurchased: number
    address?: string
    venueName?: string
    category: string
    status: "upcoming" | "completed" | "cancelled"
}