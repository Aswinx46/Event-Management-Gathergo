// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChatEntityDTO, FormattedChat, UserInfo } from "@/types/chatListing";
// import ChatItem from "./ChatItem";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";

// interface ChatListProps {
//     chats: ChatEntityDTO[];
//     userId: string;
//     userModel: 'client' | 'vendors';
//     onChatSelect: (chat: FormattedChat) => void;
//     selectedChatId?: string;
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const ChatList = ({ chats, userId, userModel, onChatSelect, selectedChatId }: ChatListProps) => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [formattedChats, setFormattedChats] = useState<FormattedChat[]>([]);

//     // Format chats to get the appropriate contact for each chat
//     useEffect(() => {
//         const formatted = chats.map(chat => {
//             // Determine if the user is the sender or receiver
//             const isSender = typeof chat.senderId === 'object' && '_id' in chat.senderId
//                 ? chat.senderId._id === userId
//                 : chat.senderId === userId;

//             // Get the contact (the other person)
//             const contact = isSender
//                 ? (typeof chat.receiverId === 'object' && '_id' in chat.receiverId
//                     ? chat.receiverId as UserInfo
//                     : { _id: chat.receiverId as string, name: "Unknown", profileImage: "" })
//                 : (typeof chat.senderId === 'object' && '_id' in chat.senderId
//                     ? chat.senderId as UserInfo
//                     : { _id: chat.senderId as string, name: "Unknown", profileImage: "" });

//             // Get the model of the contact
//             const model = isSender ? chat.receiverModel : chat.senderModel;

//             return {
//                 _id: chat._id,
//                 lastMessage: chat.lastMessage,
//                 lastMessageAt: chat.lastMessageAt,
//                 contact,
//                 model
//             };
//         });

//         // Sort by most recent message
//         formatted.sort((a, b) =>
//             new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
//         );

//         setFormattedChats(formatted);
//     }, [chats, userId]);

//     // Filter chats based on search term
//     const filteredChats = formattedChats.filter(chat =>
//         chat.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="h-full flex flex-col bg-background border-r border-border">
//             <div className="p-4 border-b border-border">
//                 <h2 className="text-xl font-bold mb-4">Messages</h2>
//                 <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                     <Input
//                         placeholder="Search conversations..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="pl-9 bg-muted/50"
//                     />
//                 </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-2">
//                 <AnimatePresence>
//                     {filteredChats.length > 0 ? (
//                         filteredChats.map((chat) => (
//                             <ChatItem
//                                 key={chat._id}
//                                 chat={chat}
//                                 isSelected={selectedChatId === chat._id}
//                                 onClick={() => chat._id && onChatSelect(chat)}
//                             />
//                         ))
//                     ) : (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center"
//                         >
//                             {searchTerm ? (
//                                 <>
//                                     <p className="mb-2">No conversations found matching "{searchTerm}"</p>
//                                     <button
//                                         onClick={() => setSearchTerm("")}
//                                         className="text-primary hover:underline"
//                                     >
//                                         Clear search
//                                     </button>
//                                 </>
//                             ) : (
//                                 <p>No conversations yet</p>
//                             )}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default ChatList;
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
        <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-blue-100 dark:border-gray-700">
            <div className="p-6 border-b border-blue-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
                <h2 className="text-3xl font-bold mb-5 text-blue-800 dark:text-blue-200 bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Messages</h2>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 dark:text-blue-300 h-6 w-6 transition-colors" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 py-3 bg-blue-50 dark:bg-gray-700 border border-blue-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-blue-900 dark:text-blue-100 placeholder-blue-400 dark:placeholder-gray-400 shadow-sm transition-all duration-300 hover:bg-blue-100 dark:hover:bg-gray-600"
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
                            className="flex flex-col items-center justify-center h-full text-blue-600 dark:text-blue-300 p-8 text-center"
                        >
                            {searchTerm ? (
                                <>
                                    <p className="mb-4 text-xl font-medium">No conversations found matching "{searchTerm}"</p>
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-all duration-300 shadow-md"
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