import { useEffect, useState } from 'react'
import socket from '../../../hooks/ConnectSocketIo'
import Chat from '@/components/other components/chat/SingleChat'
import { MessageTypeFromBackend as Message, MessageTypeFromBackend } from '@/types/MessageTypeFromBackend'
import { MessageEntity } from '@/types/messageEntity'
import { useLoadMessageInfiniteVendor } from '@/hooks/VendorCustomHooks'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
import { useQueryClient } from '@tanstack/react-query'

interface ClientChatProps {
    clientId: string
    vendorId: string
    roomId: string
    chatId: string
    isChatSelected: boolean
}

function VendorChat({ chatId, clientId, roomId, vendorId, isChatSelected }: ClientChatProps) {


    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadMessageInfiniteVendor(chatId, { enabled: !!chatId })
    const loaderRef = useInfiniteScrollObserver()
    const [chats, setChats] = useState<Message[]>([])
    const queryClient = useQueryClient()
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
    }, [roomId])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendMessage = (message: any) => {
        const sendMessage: MessageEntity = {
            messageContent: message,
            senderId: vendorId,
            senderModel: 'vendors',
        }
        console.log('sender', sendMessage)
        socket.emit('sendMessage', { sendMessage, roomId, receiverId: clientId, receiverModel: 'client' }, (newChat: MessageTypeFromBackend) => {
            setChats((prev) => [...prev, newChat])
            queryClient.invalidateQueries({ queryKey: ['chats', vendorId] })
        })
    }


    return (
        <div className='flex-3/4'>
            {isChatSelected ?
                <Chat messages={chats} sendMessage={sendMessage} currentUserId={vendorId} topMessageRef={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />
                : <div className="flex items-center justify-center h-full bg-black text-white">
                    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 rounded-xl shadow-xl text-center max-w-md">
                        <p className="text-lg font-semibold tracking-wide text-gray-100">
                            Please select a chat to start a conversation
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            Choose a contact from the list to begin chatting
                        </p>
                    </div>
                </div>}

        </div>
    )
}

export default VendorChat

