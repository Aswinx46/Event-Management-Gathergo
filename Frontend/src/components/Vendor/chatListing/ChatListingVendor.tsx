import ChatList from '@/components/other components/chatListing/ChatList'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
import { useLoadChatsInfiniteVendor } from '@/hooks/VendorCustomHooks'
import { RootState } from '@/store/store'
import { FormattedChat } from '@/types/chatListing'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ChatListingVendor() {
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadChatsInfiniteVendor(vendorId!)
    const navigate = useNavigate()
    const loaderRef = useInfiniteScrollObserver()
    const chats = data?.pages.flatMap(page => page.chats) ?? []
    const handleChatSelect = (chat: FormattedChat) => {
        // You can navigate or update UI state
        console.log(chat)
        navigate('/vendor/chats/messages', {
            state: {
                clientId: chat.contact._id,
                vendorId,
                chatId: chat._id
            }
        })
        console.log('Selected chat:', chat)
    }
    return (
        <div>
            <ChatList chats={chats} onChatSelect={handleChatSelect} userId={vendorId!} userModel='vendors' />
            <div ref={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />

        </div>
    )
}

export default ChatListingVendor

