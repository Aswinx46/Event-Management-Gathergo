

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { MessageTypeFromBackend as Message } from '@/types/MessageTypeFromBackend';

interface ChatProps {
    messages: Message[];
    sendMessage: (message: string) => void;
    currentUserId: string; // to know if the message is sent by this user
    topMessageRef?: (node: HTMLDivElement | null) => void

}

const Chat = ({ messages, sendMessage, currentUserId, topMessageRef }: ChatProps) => {
    const [message, setMessage] = useState('');
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'auto' });
        }, 0); // delay ensures the DOM is rendered before scrolling

        return () => clearTimeout(timeout); // cleanup just in case
    }, [messages]);


    const handleSendMessage = () => {
        if (message.trim().length > 0) {
            sendMessage(message.trim());
            setMessage('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto p-6 rounded-xl shadow-lg bg-white"
        >
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Chat</h2>
            </div>

            <div className="h-[500px] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
                {messages.map((msg, index) => {
                    const isUser = msg.senderId === currentUserId;
                    const isFirstMessage = index === 0;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
                            ref={isFirstMessage ? topMessageRef : null}
                        >
                            <div
                                className={`max-w-[70%] rounded-2xl px-4 py-2 ${isUser
                                    ? 'bg-purple-600 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{msg.messageContent}</p>
                                <span className={`text-xs mt-1 block ${isUser ? 'text-purple-200' : 'text-gray-500'}`}>
                                    {new Date(msg.sendedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            <div ref={bottomRef} /> {/* 👈 Add this */}
            </div>

            <form className="mt-4" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                <div className="flex items-center gap-2">
                    <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors"
                    >
                        <Send size={20} />
                    </motion.button>
                </div>
            </form>

        </motion.div>
    );
};

export default Chat;
