import { motion } from "framer-motion";
import { FormattedChat } from "@/types/chatListing";
import { formatMessageTime } from "@/utils/dateUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CloudinaryPreset } from "@/utils/cloudinaryPresetFile";

interface ChatItemProps {
  chat: FormattedChat;
  isSelected: boolean;
  onClick: () => void;
}

const ChatItem = ({ chat, isSelected, onClick }: ChatItemProps) => {
  const { contact, lastMessage, lastMessageAt } = chat;
  const formattedTime = formatMessageTime(lastMessageAt);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className={`p-4 rounded-xl mb-3 cursor-pointer transition-all duration-300 ${isSelected
          ? "bg-zinc-800 border-l-4 border-white shadow-lg"
          : "bg-zinc-900 hover:bg-zinc-800 border-l-4 border-transparent"
        }`}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-white/10 transition-all duration-300">
          <AvatarImage src={CloudinaryPreset + contact.profileImage} alt={contact.name} />
          <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-600 text-white font-semibold">
            {getInitials(contact.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-white truncate">
              {contact.name}
            </h3>
            <span className="text-xs text-zinc-400 font-medium ml-3 whitespace-nowrap">
              {formattedTime}
            </span>
          </div>

          <p className="text-sm text-zinc-300 truncate mt-1.5 line-clamp-2">
            {lastMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatItem;