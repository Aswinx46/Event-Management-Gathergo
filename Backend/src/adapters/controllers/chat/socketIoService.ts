import { Server } from "socket.io";
import { Server as httpServer } from "http";
import { IfindChatsBetweenClientAndVendorUseCase } from "../../../domain/interface/useCaseInterfaces/chat/findChatBetweenClientAndVendorUseCaseInterface";
import { IcreateChatUseCase } from "../../../domain/interface/useCaseInterfaces/chat/createChatUseCaseInterface";
import { ChatEntity } from "../../../domain/entities/chat/ChatEntity";
import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";
import { IcreateMessageUseCase } from "../../../domain/interface/useCaseInterfaces/message/createMessageUseCaseInterface";
import { IupdateLastMessageOfChatUseCase } from "../../../domain/interface/useCaseInterfaces/chat/updateLastMessageOfChatUseCaseInterface";
import { IredisService } from "../../../domain/interface/serviceInterface/IredisService";
import { InotificationRepository } from "../../../domain/interface/repositoryInterfaces/notification/InotificationRepositoryInterface";
import { NotificationEntity } from "../../../domain/entities/NotificationEntity";

export class SocketIoController {
    private io: Server
    private users: Map<string, { socketId: string, name: string }>
    private createChatUseCase: IcreateChatUseCase
    private findChatsBetweenClientAndVendorUseCase: IfindChatsBetweenClientAndVendorUseCase
    private createMessageUseCase: IcreateMessageUseCase
    private updateLastMessageUseCase: IupdateLastMessageOfChatUseCase
    private redisService: IredisService
    private notificationDatabase: InotificationRepository
    constructor(server: httpServer, FindChatsBetweenClientAndVendor: IfindChatsBetweenClientAndVendorUseCase, createChatUseCase: IcreateChatUseCase, createMessageUseCase: IcreateMessageUseCase, updateLastMessageUseCase: IupdateLastMessageOfChatUseCase, redisService: IredisService, notificationDatabase: InotificationRepository) {
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
        this.redisService = redisService
        this.updateLastMessageUseCase = updateLastMessageUseCase
        this.notificationDatabase = notificationDatabase
        this.setUpListeners()
    }
    private setUpListeners() {
        this.io.on('connect', (socket) => {
            console.log(`socket connected ${socket.id}`)

            socket.on('register', async (data, response) => {
                const notificationOfTheUser = await this.notificationDatabase.findNotifications(data.userId)
                response(notificationOfTheUser)
                //  await this.notificationDatabase.deleteNotifications(data.userId)
                // console.log('data in the backend', data)
                await this.redisService.set(data.userId, 86400, JSON.stringify({ socketId: socket.id, name: data.name }))
                this.users.set(data.userId, { socketId: socket.id, name: data.name });
                socket.data.userId = data.userId

            })


            socket.on('sendMessage', async (data, response) => {
                // console.log('Received message', data)
                if (data.sendMessage.messageContent.trim().length <= 0) throw new Error("Empty messages are not allowed");
                let chat = await this.findChatsBetweenClientAndVendorUseCase.findChatBetweenClientAndVendor(data.sendMessage.senderId, data.receiverId)
                if (!chat) {
                    const chatData: ChatEntity = {
                        lastMessage: data.sendMessage.messageContent.trim(),
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
                socket.to(data.roomId).emit('receiveMessage', createdMessage)
                const userData = this.users.get(message.senderId.toString())

                const receiverData = this.users.get(data.receiverId)
                // const notificationMessage = `Message from ${userData?.name} ${data.sendMessage.messageContent.trim()} `
                const notification: NotificationEntity = {
                    from: data.sendMessage.senderId,
                    senderModel: data.sendMessage.senderModel,
                    message: data.sendMessage.messageContent.trim(),
                    to: data.receiverId,
                    receiverModel: data.receiverModel,
                    read: false
                }
                // console.log('inside notification else case')

                const saveNotification = await this.notificationDatabase.createNotification(notification)

                if (receiverData) {
                    const notification = {
                        _id: saveNotification._id,
                        from: {
                            _id: data.sendMessage.senderId,
                            name: userData?.name
                        },
                        senderModel: data.sendMessage.senderModel,
                        message: data.sendMessage.messageContent.trim(),
                        to: data.receiverId,
                        receiverModel: data.receiverModel,
                        read: false
                    }
                    socket.to(receiverData?.socketId).emit('notification', { from: userData?.name, message: data.sendMessage.messageContent.trim(), notification })
                }
            })

            socket.on('disconnect', () => {
                console.log(`Socket disconnected ${socket.id}`)
                this.users.delete(socket.data.userId)
                this.redisService.del(socket.data.userId)
            })

            socket.on('joinRoom', (data) => {
                console.log("joining room ", data.roomId)
                // console.log(`data from join room`, data)
                if (!data) throw new Error('No room id available')
                socket.join(data.roomId)
            })
        })
    }
    public getSocket() {
        return this.io
    }
}