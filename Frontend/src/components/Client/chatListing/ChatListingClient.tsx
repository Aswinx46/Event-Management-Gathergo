import ChatList from '@/components/other components/chatListing/ChatList'
import { useLoadChatsInfinite } from '@/hooks/ClientCustomHooks'
import { useInfiniteScrollObserver } from '@/hooks/useInfiniteScrollObserver'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

function ChatListingClient() {

  const userId = useSelector((state: RootState) => state.clientSlice.client?._id)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadChatsInfinite(userId!)

  const loaderRef = useInfiniteScrollObserver()

  // const observerRef = useRef<IntersectionObserver | null>(null)
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const loaderRef = useCallback((node: HTMLDivElement | null) => {
  //   if (isLoading || isFetchingNextPage) return
  //   if (observerRef.current) observerRef.current.disconnect()
  //   observerRef.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasNextPage) {
  //       fetchNextPage()
  //     }
  //   })
  //   if (node) observerRef.current.observe(node)

  // }, [hasNextPage, fetchNextPage, isFetchingNextPage, isLoading])
  const chats = data?.pages.flatMap(page => page.chats) ?? []
  const handleChatSelect = (chatId: string) => {
    // You can navigate or update UI state
    console.log('Selected chat:', chatId)
  }

  return (
    <div>
      <ChatList chats={chats} onChatSelect={handleChatSelect} userId={userId!} userModel='client' selectedChatId='' />
      <div ref={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />
    </div>
  )
}

export default ChatListingClient
