import ChatList from '@/components/other components/chatListing/ChatList'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
import { useLoadChatsInfiniteVendor } from '@/hooks/VendorCustomHooks'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

function ChatListingVendor() {
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadChatsInfiniteVendor(vendorId!)
    const loaderRef = useInfiniteScrollObserver()
    const chats = data?.pages.flatMap(page => page.chats) ?? []
    const handleChatSelect = (chatId: string) => {
        // You can navigate or update UI state
        console.log('Selected chat:', chatId)
    }
    return (
        <div>
            <ChatList chats={chats} onChatSelect={handleChatSelect} userId={vendorId!} userModel='vendors' />
            <div ref={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />

        </div>
    )
}

export default ChatListingVendor

