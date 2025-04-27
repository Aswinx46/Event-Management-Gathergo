import { useState } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: string;
}

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi there! How can I help you today?",
            isUser: false,
            timestamp: "12:00 PM"
        }
    ]);

    const handleSendMessage = (text: string) => {
        const newMessage: Message = {
            id: messages.length + 1,
            text,
            isUser: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);

        // Simulate bot response
        setTimeout(() => {
            const botResponse: Message = {
                id: messages.length + 2,
                text: "Thanks for your message! I'll get back to you soon.",
                isUser: false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
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
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        message={message.text}
                        isUser={message.isUser}
                        timestamp={message.timestamp}
                    />
                ))}
            </div>

            <ChatInput onSendMessage={handleSendMessage} />
        </motion.div>
    );
};

export default Chat;