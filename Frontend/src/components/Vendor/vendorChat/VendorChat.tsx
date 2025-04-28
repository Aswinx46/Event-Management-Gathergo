import React, { useEffect, useState } from 'react'
import socket from '../../../hooks/ConnectSocketIo'
import { useLocation } from 'react-router-dom'
import Chat from '@/components/other components/chat/SingleChat'
function VendorChat() {
    const location = useLocation()
    const data = location.state
    const vendorId = data.vendorId
    const clientId = data.clientId
    const roomId = clientId + vendorId
    console.log('client id',clientId)
    console.log('vendor id',vendorId)
    console.log('room id',roomId)
    const [chats, setChats] = useState<string[]>([])

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
        socket.emit('sendMessage', {message,roomId})
    }
    return (
        <div>
            <Chat messages={chats} sendMessage={sendMessage} socket={socket} />
        </div>
    )
}

export default VendorChat

