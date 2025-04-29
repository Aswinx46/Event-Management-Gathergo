import ChatList from '@/components/other components/chatListing/ChatList'
import { useLoadChatsInfinite } from '@/hooks/ClientCustomHooks'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
import { RootState } from '@/store/store'
import { FormattedChat } from '@/types/chatListing'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ChatListingClient() {

  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadChatsInfinite(clientId!)
  const navigate = useNavigate()
  const loaderRef = useInfiniteScrollObserver()

  const chats = data?.pages.flatMap(page => page.chats) ?? []
  const handleChatSelect = (chat: FormattedChat) => {
    // You can navigate or update UI state
    navigate('/profile/chat/messages', {
      state: {
        clientId: clientId,
        vendorId: chat.contact._id,
        chatId: chat._id
      }
    })
  }

  return (
    <div>
      <ChatList chats={chats} onChatSelect={handleChatSelect} userId={clientId!} userModel='client' selectedChatId='' />
      <div ref={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />
    </div>
  )
}

export default ChatListingClient
