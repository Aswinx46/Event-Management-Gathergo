import ChatList from "@/components/other components/chatListing/ChatList"
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver"
import { useLoadChatsInfiniteVendor } from "@/hooks/VendorCustomHooks"
import { RootState } from "@/store/store"
import { FormattedChat } from "@/types/chatListing"
import { useState } from "react"
import { useSelector } from "react-redux"
import VendorChat from "../vendorChat/VendorChat"

function VendorChatAndMessage() {
  const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
  const [clientId, setClientId] = useState<string>('')
  const [chatId, setChatId] = useState<string>('')
  const selectedRoomId = clientId + vendorId
  const [roomId, setRoomId] = useState<string>(selectedRoomId)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadChatsInfiniteVendor(vendorId!)
  const loaderRef = useInfiniteScrollObserver()
  const chats = data?.pages.flatMap(page => page.chats) ?? []
  const handleChatSelect = (chat: FormattedChat) => {
    // You can navigate or update UI state
    console.log(chat)
    // navigate('/vendor/chats/messages', {
    //   state: {
    //     clientId: chat.contact._id,
    //     vendorId,
    //     chatId: chat._id
    //   }
    // })
    setClientId(chat.contact._id)
    setChatId(chat._id!)
    setRoomId(chat.contact._id + vendorId)
  }
  return (
    <div className="flex  w-full gap-0">
      <div className="flex-1/4">
        <ChatList chats={chats} onChatSelect={handleChatSelect} userId={vendorId!} userModel='vendors' />
        <div ref={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />
      </div>
      <VendorChat chatId={chatId} clientId={clientId} roomId={roomId} vendorId={vendorId!} />
    </div>
  )
}

export default VendorChatAndMessage
