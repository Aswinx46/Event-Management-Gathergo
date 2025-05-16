import ChatList from "@/components/other components/chatListing/ChatList"
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver"
import { useLoadChatsInfiniteVendor } from "@/hooks/VendorCustomHooks"
import { RootState } from "@/store/store"
import { FormattedChat } from "@/types/chatListing"
import { useState } from "react"
import { useSelector } from "react-redux"
import VendorChat from "../vendorChat/VendorChat"
import { useLocation } from "react-router-dom"

function VendorChatAndMessage() {
  const location = useLocation()
  const stateClientId = location?.state?.clientId
  const stateVendorId = location?.state?.vendorId
  const stateChatId = location?.state?.chatId
  const stateRoomId = stateClientId + stateVendorId
  console.log(stateClientId, stateVendorId)
  const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
  const [clientId, setClientId] = useState<string>(stateClientId)
  const [chatId, setChatId] = useState<string>(stateChatId)
  const [isChatSelected, setIsChatSelected] = useState<boolean>(false)
  const selectedRoomId = clientId + vendorId
  // console.log('state room id',stateRoomId)
  const [roomId, setRoomId] = useState<string>(stateRoomId ?? selectedRoomId)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useLoadChatsInfiniteVendor(vendorId!)
  const loaderRef = useInfiniteScrollObserver()
  const chats = data?.pages.flatMap(page => page.chats) ?? []
  const handleChatSelect = (chat: FormattedChat) => {
    setClientId(chat.contact._id)
    setChatId(chat._id!)
    setRoomId(chat.contact._id + vendorId)
    setIsChatSelected(true)
  }
  return (
    <div className="flex  w-full gap-0">
      <div className="flex-1/4">
        <ChatList chats={chats} onChatSelect={handleChatSelect} userId={vendorId!} userModel='vendors' />
        <div ref={(node) => loaderRef(node, { hasNextPage, fetchNextPage, isFetchingNextPage, isLoading })} />
      </div>
      <VendorChat isChatSelected={isChatSelected} chatId={chatId} clientId={clientId} roomId={roomId} vendorId={vendorId!} />
    </div>
  )
}

export default VendorChatAndMessage
