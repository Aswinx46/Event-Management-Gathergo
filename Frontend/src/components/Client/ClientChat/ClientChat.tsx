import React, { useEffect, useState } from 'react'
import socket from '../../../hooks/ConnectSocketIo'
import Chat from '@/components/other components/chat/SingleChat'
import { useLocation } from 'react-router-dom'
function ClientChat() {
    const location = useLocation()
    const data = location.state
    const cliendId = data.clientId
    const roomId = data.clientId + data.vendorId
    socket.connect()
    const [chats, setChats] = useState<string[]>([])
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected with socket id', socket.id)
        })

        socket.emit('register', { userId: cliendId })

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
        // console.log(message)
        socket.emit('sendMessage', {message,roomId})
    }

    return (
        <div>
            <Chat socket={socket} messages={chats} sendMessage={sendMessage}/>
        </div>
    )
}

export default ClientChat
