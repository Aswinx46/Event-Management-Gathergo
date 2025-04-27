import React, { useEffect, useState } from 'react'
import socket from '../../../hooks/ConnectSocketIo'
import Chat from '@/components/other components/chat/SingleChat'
function ClientChat() {
    socket.connect()
    const [chats, setChats] = useState<string[]>([])
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected with socket id', socket.id)
        })

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

    return (
        <div>
            <Chat socket={socket} messages={chats} />
        </div>
    )
}

export default ClientChat
