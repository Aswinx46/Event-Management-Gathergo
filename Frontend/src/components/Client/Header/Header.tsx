// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Link, useNavigate } from "react-router-dom"
// import { Instagram, Facebook, Linkedin, Menu } from "lucide-react"
// import ShinyText from '../../../../addon/ShinyText/ShinyText'
// import { Button } from "@/components/ui/button"
// import { useDispatch, useSelector } from "react-redux"
// import { RootState } from "@/store/store"
// import { useClientLogout } from "@/hooks/ClientCustomHooks"
// import { toast } from "react-toastify"
// import { removeClient } from "@/store/slices/user/userSlice"
// import { removeToken } from "@/store/slices/user/userTokenSlice"
// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)

//   const { mutate } = useClientLogout()

//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const handleLogOut = () => {
//     mutate(undefined, {
//       onSuccess: () => {
//         dispatch(removeClient(null))
//         dispatch(removeToken(null))
//         navigate('/login')
//         toast.success('LOGOUT SUCCESSFULL')
//       }
//     })

//   }



//   return (
//     <motion.header
//       className="w-full bg-black py-4 px-6 border-b border-gray-200"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="flex items-center justify-between">
//         {/* Social Media Icons */}
//         <motion.div
//           className="flex items-center space-x-4"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <Link to="https://instagram.com" className="text-white hover:text-gray-600">
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Instagram size={20} />
//             </motion.div>
//           </Link>
//           <Link to="https://facebook.com" className="text-white hover:text-gray-600">
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Facebook size={20} />
//             </motion.div>
//           </Link>
//           <Link to="https://linkedin.com" className="text-white hover:text-gray-600">
//             <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Linkedin size={20} />
//             </motion.div>
//           </Link>
//         </motion.div>

//         {/* Logo */}
//         <motion.div
//           className="absolute left-1/2 transform -translate-x-1/2"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//         >
//           <Link to="/">
//             {/* <motion.h1 className="text-lg font-medium tracking-widest text-white" whileHover={{ scale: 1.05 }}>
//               GATHERGO
//             </motion.h1> */}
//             <ShinyText text="GATHERGO" disabled={false} speed={6} className='custom-class' />
//           </Link>
//         </motion.div>

//         {/* Menu Button */}
//         <motion.div
//           className="cursor-pointer text-white"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//         >
//           <motion.button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             aria-label="Toggle menu"
//           >
//             <Menu size={24} />
//           </motion.button>
//         </motion.div>
//       </div>

//       {/* Mobile Menu (hidden by default) */}
//       <motion.div
//         className="fixed inset-0 bg-gray-600 z-50 flex flex-col items-center justify-center"
//         initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
//         animate={
//           isMenuOpen
//             ? {
//               opacity: 1,
//               clipPath: "circle(150% at top right)",
//               display: "flex",
//             }
//             : {
//               opacity: 0,
//               clipPath: "circle(0% at top right)",
//               transitionEnd: { display: "none" },
//             }
//         }
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//       >
//         <motion.button
//           className="absolute top-5 right-6"
//           onClick={() => setIsMenuOpen(false)}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </motion.button>

//         <nav className="flex flex-col items-center space-y-6 text-xl">
//           {[
//             { name: "Home", path: "/" },
//             { name: "Profile", path: "/profile" },
//             { name: "Events", path: "/events" }
//           ].map((item, index) => (
//             <motion.div
//               key={item.name}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 * index, duration: 0.5 }}
//               exit={{ opacity: 0, y: 20 }}
//             >
//               <Link
//                 to={item.path}
//                 className="text-white hover:text-gray-600 tracking-wide"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <motion.span whileHover={{ scale: 1.05 }}>{item.name}</motion.span>
//               </Link>
//             </motion.div>
//           ))}
//           {clientId && <Button onClick={handleLogOut} className="">LOGOUT</Button>}
//           {!clientId && <Button onClick={() => navigate('/login')} className="">LOGIN</Button>}
//         </nav>

//       </motion.div>
//     </motion.header>
//   )
// }

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsOpen(!isOpen);

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
                  <Link 
                    to={item.path} 
                    className="nav-link font-medium hover:text-cyan-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          )}

          {/* Hamburger Menu Button for Mobile */}
          {isMobile && (
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
                    <Link
                      to={item.path}
                      className="block py-2 font-medium hover:text-cyan-400 transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
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