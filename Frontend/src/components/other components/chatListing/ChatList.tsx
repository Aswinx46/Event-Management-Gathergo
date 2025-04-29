import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatEntityDTO, FormattedChat, UserInfo } from "@/types/chatListing";
import ChatItem from "./ChatItem";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatListProps {
    chats: ChatEntityDTO[];
    userId: string;
    userModel: 'client' | 'vendors';
    onChatSelect: (chat: FormattedChat) => void;
    selectedChatId?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatList = ({ chats, userId, userModel, onChatSelect, selectedChatId }: ChatListProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [formattedChats, setFormattedChats] = useState<FormattedChat[]>([]);

    // Format chats to get the appropriate contact for each chat
    useEffect(() => {
        const formatted = chats.map(chat => {
            // Determine if the user is the sender or receiver
            const isSender = typeof chat.senderId === 'object' && '_id' in chat.senderId
                ? chat.senderId._id === userId
                : chat.senderId === userId;

            // Get the contact (the other person)
            const contact = isSender
                ? (typeof chat.receiverId === 'object' && '_id' in chat.receiverId
                    ? chat.receiverId as UserInfo
                    : { _id: chat.receiverId as string, name: "Unknown", profileImage: "" })
                : (typeof chat.senderId === 'object' && '_id' in chat.senderId
                    ? chat.senderId as UserInfo
                    : { _id: chat.senderId as string, name: "Unknown", profileImage: "" });

            // Get the model of the contact
            const model = isSender ? chat.receiverModel : chat.senderModel;

            return {
                _id: chat._id,
                lastMessage: chat.lastMessage,
                lastMessageAt: chat.lastMessageAt,
                contact,
                model
            };
        });

        // Sort by most recent message
        formatted.sort((a, b) =>
            new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );

        setFormattedChats(formatted);
    }, [chats, userId]);

    // Filter chats based on search term
    const filteredChats = formattedChats.filter(chat =>
        chat.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col bg-background border-r border-border">
            <div className="p-4 border-b border-border">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 bg-muted/50"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <AnimatePresence>
                    {filteredChats.length > 0 ? (
                        filteredChats.map((chat) => (
                            <ChatItem
                                key={chat._id}
                                chat={chat}
                                isSelected={selectedChatId === chat._id}
                                onClick={() => chat._id && onChatSelect(chat)}
                            />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center"
                        >
                            {searchTerm ? (
                                <>
                                    <p className="mb-2">No conversations found matching "{searchTerm}"</p>
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="text-primary hover:underline"
                                    >
                                        Clear search
                                    </button>
                                </>
                            ) : (
                                <p>No conversations yet</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChatList;