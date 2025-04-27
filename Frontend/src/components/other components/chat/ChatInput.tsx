import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
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
  );
};

export default ChatInput;
