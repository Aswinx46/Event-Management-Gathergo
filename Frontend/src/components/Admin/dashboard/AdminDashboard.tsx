// src/components/AdminDashboard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaStore, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';
interface DashboardStats {
    totalVendors: number;
    totalClients: number;
    totalBookings: number;
    totalRevenue: number;
}

const AdminDashboard: React.FC = () => {
    // Sample data - in a real app, this would come from an API
    const stats: DashboardStats = {
        totalVendors: 45,
        totalClients: 128,
        totalBookings: 342,
        totalRevenue: 156780,
    };

    // Animation variants for the cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.2
            }
        }
    };

    // Animation variants for the numbers
    const numberVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                delay: 0.3
            }
        }
    };

    return (
        <div className=" bg-gray-100 p-8">
          
            <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8 text-gray-800"
            >
                Admin Dashboard
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Vendors Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl"
                >
                    <div className="p-3 bg-blue-100 rounded-full">
                        <FaStore className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Total Vendors</p>
                        <motion.p
                            variants={numberVariants}
                            className="text-2xl font-bold text-gray-800"
                        >
                            {stats.totalVendors}
                        </motion.p>
                    </div>
                </motion.div>

                {/* Total Clients Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl"
                >
                    <div className="p-3 bg-green-100 rounded-full">
                        <FaUsers className="text-green-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Total Clients</p>
                        <motion.p
                            variants={numberVariants}
                            className="text-2xl font-bold text-gray-800"
                        >
                            {stats.totalClients}
                        </motion.p>
                    </div>
                </motion.div>

                {/* Total Bookings Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl"
                >
                    <div className="p-3 bg-purple-100 rounded-full">
                        <FaCalendarCheck className="text-purple-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                        <motion.p
                            variants={numberVariants}
                            className="text-2xl font-bold text-gray-800"
                        >
                            {stats.totalBookings}
                        </motion.p>
                    </div>
                </motion.div>

                {/* Total Revenue Card */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-4 hover:shadow-xl"
                >
                    <div className="p-3 bg-yellow-100 rounded-full">
                        <FaDollarSign className="text-yellow-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                        <motion.p
                            variants={numberVariants}
                            className="text-2xl font-bold text-gray-800"
                        >
                            ${stats.totalRevenue.toLocaleString()}
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;