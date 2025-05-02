import { Server } from "socket.io";
import { Server as httpServer } from "http";
import { IfindChatsBetweenClientAndVendorUseCase } from "../../../domain/interface/useCaseInterfaces/chat/findChatBetweenClientAndVendorUseCaseInterface";
import { IcreateChatUseCase } from "../../../domain/interface/useCaseInterfaces/chat/createChatUseCaseInterface";
import { ChatEntity } from "../../../domain/entities/chat/ChatEntity";
import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";
import { IcreateMessageUseCase } from "../../../domain/interface/useCaseInterfaces/message/createMessageUseCaseInterface";
import { IupdateLastMessageOfChatUseCase } from "../../../domain/interface/useCaseInterfaces/chat/updateLastMessageOfChatUseCaseInterface";
export class SocketIoController {
    private io: Server
    private users: Map<string, { socketId: string, name: string }>
    private createChatUseCase: IcreateChatUseCase
    private findChatsBetweenClientAndVendorUseCase: IfindChatsBetweenClientAndVendorUseCase
    private createMessageUseCase: IcreateMessageUseCase
    private updateLastMessageUseCase: IupdateLastMessageOfChatUseCase
    constructor(server: httpServer, FindChatsBetweenClientAndVendor: IfindChatsBetweenClientAndVendorUseCase, createChatUseCase: IcreateChatUseCase, createMessageUseCase: IcreateMessageUseCase, updateLastMessageUseCase: IupdateLastMessageOfChatUseCase) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.ORIGIN,
                credentials: true
            }
        })
        this.users = new Map()
        this.findChatsBetweenClientAndVendorUseCase = FindChatsBetweenClientAndVendor
        this.createChatUseCase = createChatUseCase
        this.createMessageUseCase = createMessageUseCase
      
        this.updateLastMessageUseCase = updateLastMessageUseCase
        this.setUpListeners()
    }
    private setUpListeners() {
        this.io.on('connect', (socket) => {
            console.log(`socket connected ${socket.id}`)

            socket.on('register', (data) => {
                // console.log('cliend id for register', data.userId)
                // console.log('data in the backend', data)
                this.users.set(data.userId, { socketId: socket.id, name: data.name });
                socket.data.userId = data.userId
                // console.log(data.name, data.userId)
                // console.log(this.users)
            })


            socket.on('sendMessage', async (data, response) => {
                // console.log('Received message', data)
                if (data.sendMessage.messageContent.trim().length <= 0) throw new Error("Empty messages are not allowed");
                let chat = await this.findChatsBetweenClientAndVendorUseCase.findChatBetweenClientAndVendor(data.sendMessage.senderId, data.receiverId)
                if (!chat) {
                    const chatData: ChatEntity = {
                        lastMessage: data.sendMessage.messageContent,
                        lastMessageAt: new Date().toString(),
                        receiverId: data.receiverId,
                        senderId: data.sendMessage.senderId,
                        receiverModel: data.receiverModel,
                        senderModel: data.sendMessage.senderModel,
                    }
                    chat = await this.createChatUseCase.createChat(chatData)
                }
                const message: MessageEntity = {
                    chatId: chat._id!,
                    messageContent: data.sendMessage.messageContent.trim(),
                    seen: false,
                    sendedTime: new Date(),
                    senderId: data.sendMessage.senderId,
                    senderModel: data.sendMessage.senderModel,
                }
                const createdMessage = await this.createMessageUseCase.createMessage(message)
                const updateLastMessage = await this.updateLastMessageUseCase.udpateLastMessage(createdMessage)
                response(createdMessage)
                console.log('online users', this.users)
                console.log("room id", data.roomId)
                socket.to(data.roomId).emit('receiveMessage', createdMessage)
                const userData = this.users.get(message.senderId.toString())
              
                const receiverData = this.users.get(data.receiverId)
                const notificationMessage = `Message from ${userData?.name} ${data.sendMessage.messageContent.trim()} `
                if (receiverData) {
                    socket.to(receiverData?.socketId).emit('notification', { from: userData?.name, message: data.sendMessage.messageContent.trim() })
                }
            })

            socket.on('disconnect', () => {
                console.log(`Socket disconnected ${socket.id}`)
                this.users.delete(socket.data.userId)
            })

            socket.on('joinRoom', (data) => {
                // console.log(`data from join room`, data)
                if (!data) throw new Error('No room id available')
                console.log(socket.id, data.roomId)
                socket.join(data.roomId)
            })
        })
    }
    public getSocket() {
        return this.io
    }
}