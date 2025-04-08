import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Wallet,
  Lock,
  Calendar,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    path: "/",
  },
  {
    icon: User,
    label: "My Profile",
    path: "/profile",
  },
  {
    icon: BookOpen,
    label: "Bookings",
    path: "/profile/bookings",
  },
  {
    icon: Wallet,
    label: "Wallet",
    path: "/wallet",
  },
  {
    icon: Lock,
    label: "Change Password",
    path: "/change-password",
  },
  {
    icon: Calendar,
    label: "Booked Events",
    path: "/events",
  },
  {
    icon: LogOut,
    label: "Logout",
    path: "/profile/logout",
  },
];

export function ClientSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black z-30"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed md:static top-0 left-0 z-40 h-screen w-64 bg-white shadow-lg flex flex-col overflow-hidden"
      >
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold text-gray-800">Client Dashboard</h2>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMenuItemClick(item.path)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-colors duration-300 ${
                    isActive(item.path)
                      ? "bg-black text-white"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                >
                  <item.icon size={18} className="mr-3" />
                  <span>{item.label}</span>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </motion.button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={18} className="text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">Client</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
