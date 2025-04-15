import { motion, AnimatePresence } from "framer-motion"
import React, { useState } from "react"
import ProfileModal from "./detailViewOfUser"

// interface Client {
//     _id: string
//     name: string
//     email: string
//     phone: string
//     profile?: string
//     status: "active" | "blocked"
//     clientId: string
// }
interface Client {
    _id: string,
    name: string,
    email: string,
    phone: number,
    role: 'client',
    status?: 'active' | 'block',
    profileImage?: string
    createdAt?: string,
    lastLogin?: string,
    onlineStatus?: 'online' | 'offline',
    isAdmin?: boolean
    clientId?: string
}

interface Vendor {
    _id: string;
    vendorId: string;
    name: string;
    email: string;
    phone: number;
    idProof?: string;
    role: 'vendor';
    status: 'active' | 'inactive' | 'blocked';
    vendorStatus: 'pending' | 'approved' | 'rejected';
    onlineStatus: 'online' | 'offline';
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    profileImage?: string | null
}

interface Table {
    data: Client[] | Vendor[],
    blockAndUnblock: ({ userId, userStatus }: { userId: string, userStatus: string }) => void
}

export const Table: React.FC<Table> = ({ data, blockAndUnblock }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<Vendor | Client>()


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }
    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.2 },
        },
    }

    const handleDetailedView = (user: Client | Vendor) => {
        console.log(user)
        setSelectedUser(user)
        setIsOpen(true)
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden">
            {isOpen && selectedUser && <ProfileModal isOpen={isOpen} setIsOpen={setIsOpen} profile={selectedUser} />}
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            NAME
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            EMAIL
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            PHONE
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            PROFILE
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            STATUS
                        </th>
                    </tr>
                </thead>
                <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                    <AnimatePresence mode="wait">
                        {data?.map((user: Client | Vendor) => (
                            <motion.tr
                                key={user._id}
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"

                                className="border-t border-gray-200 dark:border-gray-700"
                                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            >
                                <td onClick={() => handleDetailedView(user)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                                    {"vendorId" in user ? user.vendorId : (user as Client).clientId}
                                </td>
                                <td onClick={() => handleDetailedView(user)} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {user.name}
                                </td>
                                <td onClick={() => handleDetailedView(user)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </td>
                                <td onClick={() => handleDetailedView(user)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    {user.phone}
                                </td>
                                <td onClick={() => handleDetailedView(user)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center">

                                        <img src={user.profileImage ?? '/userImage.jpg'} className="ml-2 w-8 h-8 rounded-full object-cover" />

                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => blockAndUnblock({ userId: user._id, userStatus: user.status! })}
                                        className={`inline-flex hover:cursor-pointer items-center px-3 py-1 rounded-full text-xs font-medium ${user.status === "active"
                                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                                            }`}
                                    >
                                        {user.status === "active" ? "Active" : "Block"}
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </motion.tbody>
            </table>
        </div>
    )
}

export default React.memo(Table)
