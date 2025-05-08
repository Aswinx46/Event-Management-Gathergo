import React, { useState } from 'react'
import Chat from '../../other components/chat/SingleChat'
import ChatList from '../../other components/chatListing/ChatList'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useLoadChatsInfinite } from '@/hooks/ClientCustomHooks'
import { useNavigate } from 'react-router-dom'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
import { FormattedChat } from '@/types/chatListing'
import ClientChat from '@/components/Client/ClientChat/ClientChat'

function ClientChatAndMessage() {

    const [vendorId, setVendorId] = useState<string>(null)
    const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
    const roomId = clientId + vendorId
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadChatsInfinite(clientId!)
    // const [selectedChat, setSelectedChat] = useState<FormattedChat>()
    const [chatId, setChatId] = useState<string>('')

    const handleChatSelect = (chat: FormattedChat) => {
        const vendorId = chat.contact._id
        setVendorId(vendorId)
        const chatId = chat._id
        setChatId(chatId!)
    }
    const loaderRef = useInfiniteScrollObserver()



    const chats = data?.pages.flatMap(page => page.chats) ?? []
    return (
        <div className='flex  w-full gap-0'>
            <div className='flex-1/4'>
                <ChatList chats={chats} onChatSelect={handleChatSelect} userId={clientId!} userModel='client' selectedChatId='' />
                <div ref={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />
            </div>
            <ClientChat clientId={clientId!} vendorId={vendorId} roomId={roomId} chatId={chatId}/>
        </div>
    )
}

export default ClientChatAndMessage
