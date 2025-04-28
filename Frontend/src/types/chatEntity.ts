export interface ChatEntity {
    lastMessage: string,
    lastMessageAt: string,
    senderId: string,
    receiverId: string
    senderModel: 'client' | 'vendors'
    receiverModel: 'client' | 'vendors'
}