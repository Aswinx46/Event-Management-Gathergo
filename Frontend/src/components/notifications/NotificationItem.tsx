
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Notification } from '@/types/NotificationType';
// import { MessageCircle, CheckCircle, AlertCircle, AlertTriangle, X } from 'lucide-react';
// import { formatDistanceToNow } from 'date-fns';

// interface NotificationItemProps {
//   notification: Notification;
//   delay?: number;
// }

// const NotificationItem: React.FC<NotificationItemProps> = ({ notification, delay = 0 }) => {
//   const { markAsRead, clearNotification } = useNotifications();

//   const handleNotificationClick = () => {
//     if (!notification.read) {
//       markAsRead(notification.id);
//     }
//   };

//   const getIcon = () => {
//     switch (notification.type) {
//       case 'info':
//         return <MessageCircle className="w-5 h-5 text-blue-500" />;
//       case 'success':
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case 'warning':
//         return <AlertCircle className="w-5 h-5 text-yellow-500" />;
//       case 'error':
//         return <AlertTriangle className="w-5 h-5 text-red-500" />;
//       default:
//         return <MessageCircle className="w-5 h-5 text-blue-500" />;
//     }
//   };

//   return (
//     <motion.li
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay }}
//       className={`border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
//         !notification.read ? 'bg-purple-50 dark:bg-purple-900/10' : ''
//       }`}
//       onClick={handleNotificationClick}
//     >
//       <div className="p-4 flex items-start gap-3 relative">
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             clearNotification(notification.id);
//           }}
//           className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
//         >
//           <X size={14} />
//         </button>
        
//         <div className="mt-0.5">{getIcon()}</div>
        
//         <div className="flex-1 pr-6">
//           <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
//             {notification.title}
//             {!notification.read && (
//               <span className="ml-2 w-2 h-2 bg-purple-500 rounded-full inline-block" />
//             )}
//           </h4>
//           <p className="text-gray-600 dark:text-gray-300 text-sm mt-0.5">{notification.message}</p>
//           <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
//             {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
//           </p>
//         </div>
//       </div>
//     </motion.li>
//   );
// };

// export default NotificationItem;