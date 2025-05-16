
import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useClientLogout, useDeleteAllNotificationsClient, useReadSingleNotification } from '@/hooks/ClientCustomHooks';
import { removeClient } from '@/store/slices/user/userSlice';
import { removeToken } from '@/store/slices/user/userTokenSlice';
import { NotificationsDropdown } from '@/components/notifications/NotificationsDropdown';
import { clearAllNotifications, removeNotification } from '@/store/slices/notification/notificationSlice';
import { toast } from 'react-toastify';
type NavItem =
  | { name: string; path: string; onClick?: never }
  | { name: string; onClick: () => void; path?: never };

// Variants for the mobile menu
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      staggerDirection: 1
    }
  }
};

// Variants for individual nav items
const itemVariants = {
  closed: { opacity: 0, y: -10 },
  open: { opacity: 1, y: 0 }
};

// Hamburger button animation variants
const topBarVariants = {
  closed: { rotate: 0, translateY: 0 },
  open: { rotate: 45, translateY: 6 }
};

const middleBarVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 }
};

const bottomBarVariants = {
  closed: { rotate: 0, translateY: 0 },
  open: { rotate: -45, translateY: -6 }
};

// Logo animation variants
const logoVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};



const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const client = useSelector((state: RootState) => state.clientSlice.client)
  const toggleMenu = () => setIsOpen(!isOpen);

  const clientLogout = useClientLogout()
  const dispatch = useDispatch()
  const clearAllNotficationClient = useDeleteAllNotificationsClient()
  const readNotificationClient = useReadSingleNotification()
  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    // { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Profile', path: '/profile/home' },
    { name: 'Categories', path: '/categories' },

  ];


  if (client) {
    navItems.push({
      name: 'logout',
      onClick: () => {
        console.log('user logged out')
        clientLogout.mutate(undefined, {
          onSuccess: () => {
            dispatch(removeClient(null))
            dispatch(removeToken(null))
            localStorage.removeItem('id')
          }
        })

      }
    })
  } else {
    navItems.push({
      name: 'Login',
      path: '/login'
    })
  }

  const onClearAllNotifications = () => {
    if (client) {
      clearAllNotficationClient.mutate(client._id!, {
        onSuccess: () => {
          dispatch(clearAllNotifications([]))
        },
        onError: (err) => {
          toast.error(err.message)
        }
      })

    }
  }

  const onClearNotification = (id: string) => {
    if (client) {
      dispatch(removeNotification(id))
    }
  }

  const onReadNotification = (id: string) => {
    if (client) {
      readNotificationClient.mutate(id, {
        onSuccess: () => dispatch(removeNotification(id)),
        onError: (err) => toast.error(err.message)
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial="initial"
            animate="animate"
            variants={logoVariants}
          >
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight">
              GATHER<span className="text-cyan-400">GO</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="nav-link font-medium hover:text-cyan-400 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="nav-link font-medium hover:text-cyan-400 hover:cursor-pointer transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  )}
                </motion.div>
              ))}
              {client && <NotificationsDropdown onMarkAsRead={onReadNotification} onClearAllNotifications={onClearAllNotifications} onClearNotification={onClearNotification} />}

            </nav>
          )}

          {/* Hamburger Menu Button for Mobile */}
          {isMobile && (
            <div className='flex items-center'>
              {client && <NotificationsDropdown />}

              <motion.button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none"
                onClick={toggleMenu}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                aria-label="Toggle menu"
              >
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full absolute"
                  variants={topBarVariants}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full absolute"
                  variants={middleBarVariants}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full absolute"
                  variants={bottomBarVariants}
                  transition={{ duration: 0.3 }}
                  style={{ marginTop: "8px" }}
                />
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isOpen && (


            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden backdrop-blur-sm"
            >

              <nav className="py-4 flex flex-col space-y-3 border-t border-gray-800">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="px-4"
                  >

                    {item.path ? (
                      <Link
                        to={item.path}
                        className="nav-link font-medium hover:text-cyan-400 transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="nav-link font-medium hover:text-cyan-400 hover:cursor-pointer transition-colors duration-300"
                      >
                        {item.name}
                      </button>
                    )}
                  </motion.div>
                ))}

              </nav>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;