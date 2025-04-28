import React, { useEffect, useState } from 'react'
import socket from '../../../hooks/ConnectSocketIo'
import { useLocation } from 'react-router-dom'
import Chat from '@/components/other components/chat/SingleChat'
import { MessageTypeFromBackend as Message, MessageTypeFromBackend } from '@/types/MessageTypeFromBackend'
import { MessageEntity } from '@/types/messageEntity'
function VendorChat() {
    const location = useLocation()
    const data = location.state
    const vendorId = data.vendorId
    const clientId = data.clientId
    const roomId = clientId + vendorId

    const [chats, setChats] = useState<Message[]>([])

    socket.connect()
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected with socket id', socket.id)

            socket.emit('register', { userId: vendorId })

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
        })


    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendMessage = (message: any) => {
        const sendMessage: MessageEntity = {
            messageContent: message,
            senderId: vendorId,
            senderModel: 'vendors',
        }
        socket.emit('sendMessage', { sendMessage, roomId, receiverId: clientId, receiverModel: 'client' }, (newChat: MessageTypeFromBackend) => {
            setChats((prev) => [...prev, newChat])

        })
    }
    // socket.emit('sendMessage', { sendMessage, roomId, receiverId: vendorId, receiverModel: 'vendors' })


    return (
        <div>
            <Chat messages={chats} sendMessage={sendMessage} currentUserId={vendorId} />
        </div>
    )
}

export default VendorChat

