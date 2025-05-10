import { useState } from 'react'
import ChatList from '../../other components/chatListing/ChatList'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useLoadChatsInfinite } from '@/hooks/ClientCustomHooks'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
import { FormattedChat } from '@/types/chatListing'
import ClientChat from '@/components/Client/ClientChat/ClientChat'
import { useLocation } from 'react-router-dom'

function ClientChatAndMessage() {
    const location = useLocation()
    const stateClientId = location?.state?.clientId
    const stateVendorId = location?.state?.vendorId
    const stateRoomId = stateClientId + stateVendorId
    const [vendorId, setVendorId] = useState<string>('')
    const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
    const selectedRoomId = clientId + vendorId

    const [roomId, setRoomId] = useState<string>(stateRoomId ?? selectedRoomId)
    console.log(clientId, vendorId)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadChatsInfinite(clientId ?? stateClientId)
    // const [selectedChat, setSelectedChat] = useState<FormattedChat>()
    const [chatId, setChatId] = useState<string>('')

    const handleChatSelect = (chat: FormattedChat) => {
        console.log("chat selected")
        const vendorId = chat.contact._id
        setVendorId(vendorId)
        const chatId = chat._id
        setChatId(chatId!)
        setRoomId(clientId + vendorId)
    }
    const loaderRef = useInfiniteScrollObserver()



    const chats = data?.pages.flatMap(page => page.chats) ?? []
    return (
        <div className='flex flex-col md:flex-row w-full gap-0 '>
            <div className='md:flex-1/4 '>
                <ChatList chats={chats} onChatSelect={handleChatSelect} userId={clientId ?? stateClientId} userModel='client' selectedChatId='' />
                <div ref={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />
            </div>
            <ClientChat clientId={clientId ?? stateClientId} vendorId={stateVendorId ?? vendorId} roomId={roomId} chatId={chatId} />
        </div>
    )
}

export default ClientChatAndMessage
