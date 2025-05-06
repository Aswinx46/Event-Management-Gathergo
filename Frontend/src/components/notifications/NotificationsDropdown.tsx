
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BellRing, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { clearAllNotifications } from "@/store/slices/notification/notificationSlice";

export interface NotificationDTO {
    _id?: string;
    from: {
        _id: string;
        name: string;
        profileImage?: string;
    };
    to: string;
    message: string;
    read: boolean;
    senderModel: "client" | "vendors";
    receiverModel: "client" | "vendors";
}

interface NotificationsDropdownProps {

    onMarkAsRead?: (id: string) => void;
    onMarkAllAsRead?: () => void;
    onClearNotification?: (id: string) => void;
    // onClearAllNotifications?: () => void;
}

export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
    onMarkAsRead,
    // onMarkAllAsRead,
    onClearNotification,
    // onClearAllNotifications,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const notifications = useSelector((state: RootState) => state.notificationSlice.notification).flat()
    console.log(notifications)
    const unreadNotifications = notifications.filter((notif) => !notif.read);
    const hasUnread = unreadNotifications.length > 0;
    const hasNotifications = notifications.length > 0;
    const dispatch = useDispatch()
    const onClearAllNotifications = () => {
        dispatch(clearAllNotifications([]))
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleMarkAsRead = (id: string) => {
        if (onMarkAsRead) {
            onMarkAsRead(id);
        }
    };

    // const handleMarkAllAsRead = () => {
    //     if (onMarkAllAsRead) {
    //         onMarkAllAsRead();
    //     }
    // };

    const handleClearNotification = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (onClearNotification) {
            onClearNotification(id);
        }
    };

    const handleClearAllNotifications = () => {
        if (onClearAllNotifications) {
            onClearAllNotifications();
            setIsOpen(false)
        }
    };

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        console.log('name for split', name)
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase();
    };

    return (
        <>
            {notifications &&

                <div className="relative z-50">
                    {/* Bell Icon with notification indicator */}
                    <motion.button
                        onClick={toggleDropdown}
                        className="relative p-2 text-gray-700 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        { !hasUnread && <BellRing className="h-6 w-6" />}
                        {hasUnread && (
                            <motion.button
                            onClick={toggleDropdown}
                            className="relative p-2  rounded-full hover:bg-gray-100 transition-colors focus:outline-none text-white hover:text-black"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            >
                            <BellRing className="h-6 w-6 " />
                          {hasUnread && (
                              <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                                  layoutId="notification-dot"
                              >
                                  <motion.div
                                      className="absolute inset-0 rounded-full bg-red-500"
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{
                                          repeat: Infinity,
                                          duration: 2,
                                          repeatType: "loop",
                                      }}
                                  />
                                  <span className="relative z-10">{unreadNotifications.length}</span>
                              </motion.div>
                          )}
                      </motion.button>
                      
                        )}
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="absolute -left-25  mt-2 w-80 max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-xl border text-white border-gray-200"
                                style={{
                                    transformOrigin: "top right",
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                                        {hasUnread && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full"
                                            >
                                                {unreadNotifications.length}
                                            </motion.div>
                                        )}
                                    </div>
                                    {/* <div className="flex gap-2">
                                        {hasUnread && (
                                            <button
                                                onClick={handleMarkAllAsRead}
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                Mark all as read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div> */}
                                </div>

                                {/* Body */}
                                <div className="divide-y divide-gray-100">
                                    {notifications.length === 0 ? (
                                        <div className="py-16 text-center text-gray-500">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center justify-center"
                                            >
                                                <BellRing className="h-12 w-12 text-gray-300 mb-3" />
                                                <p className="text-gray-400">No notifications</p>
                                            </motion.div>
                                        </div>
                                    ) : (
                                        notifications.map((notification, index) => (
                                            <motion.div
                                                key={notification._id || index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={cn(
                                                    "p-4 hover:bg-gray-50 cursor-pointer transition-colors relative group",
                                                    !notification.read && "bg-blue-50"
                                                )}
                                                onClick={() => notification._id && handleMarkAsRead(notification._id)}
                                            >
                                                <div className="flex gap-3">
                                                    {/* Avatar */}
                                                    <div className="flex-shrink-0">
                                                        {notification.from?.profileImage ? (
                                                            <img
                                                                src={notification.from.profileImage}
                                                                alt={notification.from.name}
                                                                className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
                                                                {getInitials(notification.from.name)}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between mb-1">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {notification.from.name}
                                                            </p>
                                                            <span className="text-xs text-gray-500">Just now</span>
                                                        </div>
                                                        <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
                                                    </div>

                                                    {/* Unread indicator */}
                                                    {!notification.read && (
                                                        <div className="flex-shrink-0">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Delete Button (visible on hover) */}
                                                <motion.button
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="absolute right-2 top-2 p-1 bg-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={(e) => notification._id && handleClearNotification(notification._id, e)}
                                                >
                                                    <Trash2 size={14} className="text-gray-600" />
                                                </motion.button>
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                                {/* Footer */}
                                {hasNotifications && (
                                    <motion.div
                                        className="p-3 border-t border-gray-100 text-center bg-gradient-to-r from-gray-50 to-white"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Button
                                            onClick={handleClearAllNotifications}
                                            variant="outline"
                                            size="sm"
                                            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                        >
                                            <Trash2 className="mr-1 h-4 w-4" />
                                            Clear All
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            }
        </>
    );
};