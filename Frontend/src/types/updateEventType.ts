export interface EventUpdateEntity {
    title: string;
    description: string;
    location: {
        type: string,
        coordinates: [number, number];
    },
    startTime: Date;
    endTime: Date;
    posterImage: string[];
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