
import { motion } from "framer-motion";
import { FormattedChat } from "@/types/chatListing";
import { formatMessageTime } from "@/utils/dateUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`p-4 rounded-lg mb-2 cursor-pointer transition-colors ${
        isSelected 
          ? "bg-primary/10 hover:bg-primary/15" 
          : "hover:bg-muted"
      }`}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={contact.profileImage} alt={contact.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(contact.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
            <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
              {formattedTime}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground truncate mt-1">
            {lastMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatItem;