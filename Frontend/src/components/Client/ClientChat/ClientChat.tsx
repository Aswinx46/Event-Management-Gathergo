import React, { useEffect, useState } from 'react'
import socket from '../../../hooks/ConnectSocketIo'
import Chat from '@/components/other components/chat/SingleChat'
import { useLocation } from 'react-router-dom'
import { MessageEntity } from '@/types/messageEntity'
import { MessageTypeFromBackend as Message, MessageTypeFromBackend } from '@/types/MessageTypeFromBackend'
function ClientChat() {
    const location = useLocation()
    const data = location.state
    const clientId = data.clientId
    const vendorId = data.vendorId
    const roomId = clientId + vendorId
    socket.connect()
    const [chats, setChats] = useState<Message[]>([])
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected with socket id', socket.id)
        })

        socket.emit('register', { userId: clientId })

        if (!roomId) return
        socket.emit('joinRoom', { roomId })

        socket.on('receiveMessage', (data) => {
            console.log('message from backend', data)
            setChats((prev) => [...prev, data])
        })


        socket.on('disconnect', () => {
            console.log('socket disconneced with', socket.id)
        })

        return (() => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off('receiveMessage')
        })
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendMessage = (message: any) => {
        const sendMessage: MessageEntity = {
            messageContent: message,
            senderId: clientId,
            senderModel: 'client',
        }
        // console.log(message)
        socket.emit('sendMessage', { sendMessage, roomId, receiverId: vendorId, receiverModel: 'vendors' }, (newChat: MessageTypeFromBackend) => {
            setChats((prev) => [...prev, newChat])

        })
    }

    return (
        <div>
            <Chat messages={chats} sendMessage={sendMessage} currentUserId={clientId} />
        </div>
    )
}

export default ClientChat
