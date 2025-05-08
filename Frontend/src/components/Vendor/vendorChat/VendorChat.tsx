import { useEffect, useState } from 'react'
import socket from '../../../hooks/ConnectSocketIo'
import Chat from '@/components/other components/chat/SingleChat'
import { MessageTypeFromBackend as Message, MessageTypeFromBackend } from '@/types/MessageTypeFromBackend'
import { MessageEntity } from '@/types/messageEntity'
import { useLoadMessageInfiniteVendor } from '@/hooks/VendorCustomHooks'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'

interface ClientChatProps{
    clientId:string
    vendorId:string
    roomId:string
    chatId:string
}

function VendorChat({chatId,clientId,roomId,vendorId}:ClientChatProps) {


    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadMessageInfiniteVendor(chatId, { enabled: !!chatId })
    const loaderRef = useInfiniteScrollObserver()
    const [chats, setChats] = useState<Message[]>([])
    useEffect(() => {
        if (data?.pages) {
            const allMessages = data.pages.flatMap(page => page.messages);
            setChats(allMessages.reverse()); // reverse if you want older ones first
        }
    }, [data]);
    useEffect(() => {
        if (!socket.connected) socket.connect(); // optional safety check

        console.log("room id", roomId)
        if (!roomId) return
        socket.emit('joinRoom', { roomId })

        socket.on('receiveMessage', (data) => {
            // console.log('message from backend', data)
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


        // eslint-disable-next-line react-hooks/exhaustive-deps
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


    return (
        <div className='flex-3/4'>
            <Chat messages={chats} sendMessage={sendMessage} currentUserId={vendorId} topMessageRef={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />

        </div>
    )
}

export default VendorChat

