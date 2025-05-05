// // import React from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Notification } from '@/types/NotificationType';
// // import LiveNotification from './../other components/LiveNotification';

// // interface NotificationContainerProps {
// //     notifications: Notification[];
// //     onClose: (id: number) => void;
// // }

// // const NotificationContainer: React.FC<NotificationContainerProps> = ({
// //     notifications,
// //     onClose
// // }) => {
// //     return (
// //         <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
// //             <AnimatePresence>
// //                 {notifications.map((notification, index) => (
// //                     <motion.div
// //                         key={index}
// //                         layout
// //                         initial={{ opacity: 0, y: -20, scale: 0.8 }}
// //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// //                         exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
// //                         transition={{ duration: 0.3, delay: index * 0.1 }}
// //                     >
// //                         <LiveNotification
// //                             notification={notification}
// //                             onClose={() => onClose(index)}
// //                         />
// //                     </motion.div>
// //                 ))}
// //             </AnimatePresence>
// //         </div>
// //     );
// // };

// // export default NotificationContainer;


// import React from 'react';
// import { X } from 'lucide-react';

// interface SimpleNotificationProps {
//   notifications: { id: string; message: string; type: string }[];
//   onClose: () => void;
// }

// const SimpleNotificationPanel: React.FC<SimpleNotificationProps> = ({ 
//   notifications,
//   onClose
// }) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden w-full max-w-sm">
//       <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//         <h3 className="font-semibold text-gray-800 dark:text-gray-100">Notifications</h3>
//         <button 
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//         >
//           <X size={18} />
//         </button>
//       </div>
      
//       <div className="p-6 text-center">
//         {notifications.length === 0 ? (
//           <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
//         ) : (
//           <ul className="divide-y divide-gray-200 dark:divide-gray-700">
//             {notifications.map((notification) => (
//               <li key={notification.id} className="py-3 px-4">
//                 <p className="text-gray-600 dark:text-gray-300 text-sm">{notification.message}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SimpleNotificationPanel;