export interface MessageTypeFromBackend {
    _id?:  string;
    chatId: string;
    seen: boolean;
    messageContent: string;
    sendedTime: string; // or Date, depending on backend
    senderId: string;
    senderModel: 'client' | 'vendors';
   
}