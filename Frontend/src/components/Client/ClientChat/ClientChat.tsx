import { useEffect, useState } from 'react'
import socket from '../../../hooks/ConnectSocketIo'
import Chat from '@/components/other components/chat/SingleChat'
import { MessageEntity } from '@/types/messageEntity'
import { MessageTypeFromBackend as Message, MessageTypeFromBackend } from '@/types/MessageTypeFromBackend'
import { useLoadMessageInfinite } from '@/hooks/ClientCustomHooks'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
import { useQueryClient } from '@tanstack/react-query'

interface ClientChatProps{
    clientId:string
    vendorId:string
    roomId:string
    chatId:string
}

function ClientChat({clientId,roomId,vendorId,chatId}:ClientChatProps) {
    // const location = useLocation()
    // const stateData = location.state
    // const clientId = stateData.clientId
    // const vendorId = stateData.vendorId
    // const roomId = clientId + vendorId
    // const chatIdFromState = location.state?.chatId || null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [chatId, setChatId] = useState(chatIdFromState);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadMessageInfinite(chatId, { enabled: !!chatId })
    const [chats, setChats] = useState<Message[]>([])
    const queryClient=useQueryClient()

    useEffect(() => {
        if (data?.pages) {
            const allMessages = data.pages.flatMap(page => page.messages)
            setChats(allMessages.reverse())
        }
    }, [data])

    const loaderRef = useInfiniteScrollObserver()

    // socket.connect()
    useEffect(() => {
        if (!socket.connected) socket.connect(); // optional safety check
        console.log("connecting chat websocket")
        socket.on('connect', () => {
            // console.log('Connected with socket id', socket.id)
        })

        // socket.emit('register', { userId: clientId })

        console.log("room id", roomId)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendMessage = (message: any) => {
        const sendMessage: MessageEntity = {
            messageContent: message,
            senderId: clientId,
            senderModel: 'client',
        }
        // console.log(message)
        socket.emit('sendMessage', { sendMessage, roomId, receiverId: vendorId, receiverModel: 'vendors' }, (newChat: MessageTypeFromBackend) => {
            console.log('acknoledgement',newChat)
            setChats((prev) => [...prev, newChat])
            queryClient.invalidateQueries({queryKey: ['chats', clientId]})

        })
    }

    return (
        <div className='flex-3/4'>
            <Chat messages={chats} sendMessage={sendMessage} currentUserId={clientId} topMessageRef={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />
        </div>
    )
}

export default ClientChat
