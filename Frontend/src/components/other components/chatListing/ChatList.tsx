/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatEntityDTO, FormattedChat, UserInfo } from "@/types/chatListing";
import ChatItem from "./ChatItem";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatListProps {
    chats: ChatEntityDTO[];
    userId: string;
    userModel?: 'client' | 'vendors';
    onChatSelect: (chat: FormattedChat) => void;
    selectedChatId?: string;
}

const ChatList = ({ chats, userId, onChatSelect, selectedChatId }: ChatListProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [formattedChats, setFormattedChats] = useState<FormattedChat[]>([]);

    useEffect(() => {
        const formatted = chats.map(chat => {
            const isSender = typeof chat.senderId === 'object' && '_id' in chat.senderId
                ? chat.senderId._id === userId
                : chat.senderId === userId;

            const contact = isSender
                ? (typeof chat.receiverId === 'object' && '_id' in chat.receiverId
                    ? chat.receiverId as UserInfo
                    : { _id: chat.receiverId as string, name: "Unknown", profileImage: "" })
                : (typeof chat.senderId === 'object' && '_id' in chat.senderId
                    ? chat.senderId as UserInfo
                    : { _id: chat.senderId as string, name: "Unknown", profileImage: "" });

            const model = isSender ? chat.receiverModel : chat.senderModel;

            return {
                _id: chat._id,
                lastMessage: chat.lastMessage,
                lastMessageAt: chat.lastMessageAt,
                contact,
                model
            };
        });

        formatted.sort((a, b) =>
            new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );

        setFormattedChats(formatted);
    }, [chats, userId]);

    const filteredChats = formattedChats.filter(chat =>
        chat.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="md:h-screen  flex flex-col bg-gradient-to-b from-black  to-zinc-900 border-r border-white/10">
            <div className="p-6 border-b border-white/10 bg-black/50 backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-5 text-white bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                    Messages
                </h2>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 h-6 w-6 transition-colors" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 py-3 bg-zinc-900 border border-white/10 rounded-xl focus:ring-2 focus:ring-white/20 text-white placeholder-zinc-500 shadow-lg transition-all duration-300 hover:bg-zinc-800"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center h-full text-zinc-400 p-8 text-center"
                        >
                            {searchTerm ? (
                                <>
                                    <p className="mb-4 text-xl font-medium">No conversations found matching "{searchTerm}"</p>
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-300 shadow-lg"
                                    >
                                        Clear Search
                                    </button>
                                </>
                            ) : (
                                <p className="text-xl font-medium">Start a new conversation!</p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChatList;