
// import { motion } from "framer-motion";
// import { FormattedChat } from "@/types/chatListing";
// import { formatMessageTime } from "@/utils/dateUtils";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// interface ChatItemProps {
//   chat: FormattedChat;
//   isSelected: boolean;
//   onClick: () => void;
// }

// const ChatItem = ({ chat, isSelected, onClick }: ChatItemProps) => {
//   const { contact, lastMessage, lastMessageAt } = chat;
//   const formattedTime = formatMessageTime(lastMessageAt);
  
//   // Get initials for avatar fallback
//   const getInitials = (name: string) => {
//     return name
//       .split(' ')
//       .map((part) => part.charAt(0))
//       .join('')
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, x: -10 }}
//       whileHover={{ scale: 1.01 }}
//       whileTap={{ scale: 0.99 }}
//       transition={{ duration: 0.2 }}
//       onClick={onClick}
//       className={`p-4 rounded-lg mb-2 cursor-pointer transition-colors ${
//         isSelected 
//           ? "bg-primary/10 hover:bg-primary/15" 
//           : "hover:bg-muted"
//       }`}
//     >
//       <div className="flex items-center gap-3">
//         <Avatar className="h-12 w-12">
//           <AvatarImage src={contact.profileImage} alt={contact.name} />
//           <AvatarFallback className="bg-primary/10 text-primary">
//             {getInitials(contact.name)}
//           </AvatarFallback>
//         </Avatar>
        
//         <div className="flex-1 min-w-0">
//           <div className="flex justify-between items-start">
//             <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
//             <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
//               {formattedTime}
//             </span>
//           </div>
          
//           <p className="text-sm text-muted-foreground truncate mt-1">
//             {lastMessage}
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ChatItem;

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      className={`p-4 rounded-xl mb-3 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? "bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 dark:border-blue-400 shadow-md" 
          : "bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 border-l-4 border-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 ring-2 ring-blue-200 dark:ring-blue-700/50 transition-all duration-300">
          <AvatarImage src={contact.profileImage} alt={contact.name} />
          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white font-semibold">
            {getInitials(contact.name)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-100 truncate">
              {contact.name}
            </h3>
            <span className="text-xs text-blue-500 dark:text-blue-300 font-medium ml-3 whitespace-nowrap">
              {formattedTime}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1.5 line-clamp-2">
            {lastMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatItem;