export interface MessageEntity {
    // chatId: string,
    seen?: boolean,
    messageContent: string,
    sendedTime?: Date
    senderId: string
    senderModel: 'client' | 'vendors'
}