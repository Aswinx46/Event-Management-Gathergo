// src/components/Sidebar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaCalendarCheck, 
  FaList, 
  FaWallet, 
  FaUserFriends, 
  FaCalendarAlt 
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  // Animation variants for the sidebar
  const sidebarVariants = {
    hidden: { x: -250, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin/dashboard' },
    { name: 'User Management', icon: <FaUsers />, path: '/admin/userManagement' },
    { name: 'Booking Management', icon: <FaCalendarCheck />, path: '/booking-management' },
    { name: 'Category Management', icon: <FaList />, path: '/category-management' },
    { name: 'Wallet', icon: <FaWallet />, path: '/wallet' },
    { name: 'Event Providers', icon: <FaUserFriends />, path: '/admin/eventProviders' },
    { name: 'Event Management', icon: <FaCalendarAlt />, path: '/event-management' },
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64 h-screen bg-gray-800 text-white  top-0 left-0 shadow-lg"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;