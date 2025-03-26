"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Instagram, Facebook, Linkedin, Menu } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      className="w-full bg-[#f8f6f2] py-4 px-6 border-b border-gray-200"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Social Media Icons */}
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to="https://instagram.com" className="text-black hover:text-gray-600">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Instagram size={20} />
            </motion.div>
          </Link>
          <Link to="https://facebook.com" className="text-black hover:text-gray-600">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Facebook size={20} />
            </motion.div>
          </Link>
          <Link to="https://linkedin.com" className="text-black hover:text-gray-600">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Linkedin size={20} />
            </motion.div>
          </Link>
        </motion.div>

        {/* Logo */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/">
            <motion.h1 className="text-lg font-medium tracking-widest" whileHover={{ scale: 1.05 }}>
              GATHERGO
            </motion.h1>
          </Link>
        </motion.div>

        {/* Menu Button */}
        <motion.div
          className="cursor-pointer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <motion.div
        className="fixed inset-0 bg-[#f8f6f2] z-50 flex flex-col items-center justify-center"
        initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
        animate={
          isMenuOpen
            ? {
                opacity: 1,
                clipPath: "circle(150% at top right)",
                display: "flex",
              }
            : {
                opacity: 0,
                clipPath: "circle(0% at top right)",
                transitionEnd: { display: "none" },
              }
        }
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <motion.button
          className="absolute top-5 right-6"
          onClick={() => setIsMenuOpen(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        <nav className="flex flex-col items-center space-y-6 text-xl">
          {["Home", "About", "Services", "Contact"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Link
                to={`/${item.toLowerCase()}`}
                className="text-black hover:text-gray-600 tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                <motion.span whileHover={{ scale: 1.05 }}>{item}</motion.span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  )
}
// import { useState } from "react";
// import {
//   IconBook,
//   IconChartPie3,
//   IconChevronDown,
//   IconCode,
//   IconCoin,
//   IconFingerprint,
//   IconNotification,
// } from "@tabler/icons-react";

// const mockdata = [
//   {
//     icon: IconCode,
//     title: "Open source",
//     description: "This Pokémon’s cry is very loud and distracting",
//   },
//   {
//     icon: IconCoin,
//     title: "Free for everyone",
//     description: "The fluid of Smeargle’s tail secretions changes",
//   },
//   {
//     icon: IconBook,
//     title: "Documentation",
//     description: "Yanma is capable of seeing 360 degrees without",
//   },
//   {
//     icon: IconFingerprint,
//     title: "Security",
//     description: "The shell’s rounded shape and the grooves on its.",
//   },
//   {
//     icon: IconChartPie3,
//     title: "Analytics",
//     description: "This Pokémon uses its flying ability to quickly chase",
//   },
//   {
//     icon: IconNotification,
//     title: "Notifications",
//     description: "Combusken battles with the intensely hot flames it spews",
//   },
// ];

// export default function HeaderMegaMenu() {
//   const [drawerOpened, setDrawerOpened] = useState(false);
//   const [linksOpened, setLinksOpened] = useState(false);

//   const links = mockdata.map((item) => (
//     <div
//       key={item.title}
//       className="w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//     >
//       <div className="flex items-start space-x-3">
//         <div className="p-1.5 bg-gray-200 dark:bg-gray-600 rounded-md">
//           <item.icon size={22} className="text-blue-500" />
//         </div>
//         <div>
//           <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
//         </div>
//       </div>
//     </div>
//   ));

//   return (
//     <div className="pb-32">
//       {/* Header */}
//       <header className="h-16 px-4 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-between">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-gray-900 dark:text-white">Logo</div>

//         {/* Desktop Navigation */}
//         <div className="hidden sm:flex items-center space-x-6">
//           <a href="#" className="text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200">
//             Home
//           </a>

//           {/* Features Dropdown */}
//           <div className="relative group">
//             <a
//               href="#"
//               className="text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-1"
//             >
//               <span>Features</span>
//               <IconChevronDown size={16} className="text-blue-500" />
//             </a>
//             <div className="absolute left-0 hidden group-hover:block w-[600px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
//               <div className="flex justify-between px-4 py-2">
//                 <p className="font-medium text-gray-900 dark:text-white">Features</p>
//                 <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:underline">
//                   View all
//                 </a>
//               </div>
//               <hr className="my-2 border-gray-200 dark:border-gray-700" />
//               <div className="grid grid-cols-2 gap-0">{links}</div>
//               <div className="bg-gray-100 dark:bg-gray-700 mt-2 p-4 border-t border-gray-200 dark:border-gray-600">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-sm font-medium text-gray-900 dark:text-white">Get started</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Their food sources have decreased, and their numbers
//                     </p>
//                   </div>
//                   <button className="px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
//                     Get started
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <a href="#" className="text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200">
//             Learn
//           </a>
//           <a href="#" className="text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-md transition-colors duration-200">
//             Academy
//           </a>
//         </div>

//         {/* Desktop Buttons */}
//         <div className="hidden sm:flex items-center space-x-4">
//           <button className="px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
//             Log in
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
//             Sign up
//           </button>
//         </div>

//         {/* Mobile Burger */}
//         <button className="sm:hidden text-gray-900 dark:text-white" onClick={() => setDrawerOpened(!drawerOpened)}>
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//           </svg>
//         </button>
//       </header>

//       {/* Mobile Drawer */}
//       {drawerOpened && (
//         <div className="fixed inset-0 z-50 bg-gray-800/90 sm:hidden">
//           <div className="h-full w-full max-w-xs bg-white dark:bg-gray-800 p-4 flex flex-col">
//             <div className="flex justify-between items-center mb-4">
//               <p className="text-lg font-bold text-gray-900 dark:text-white">Navigation</p>
//               <button className="text-gray-900 dark:text-white" onClick={() => setDrawerOpened(false)}>
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <hr className="my-2 border-gray-200 dark:border-gray-700" />
//             <div className="flex-1 overflow-y-auto">
//               <a href="#" className="block py-2 px-4 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
//                 Home
//               </a>
//               <button
//                 className="w-full text-left py-2 px-4 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center justify-between"
//                 onClick={() => setLinksOpened(!linksOpened)}
//               >
//                 <span>Features</span>
//                 <IconChevronDown size={16} className="text-blue-500" />
//               </button>
//               {linksOpened && <div className="pl-4">{links}</div>}
//               <a href="#" className="block py-2 px-4 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
//                 Learn
//               </a>
//               <a href="#" className="block py-2 px-4 text-gray-900 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
//                 Academy
//               </a>
//             </div>
//             <hr className="my-2 border-gray-200 dark:border-gray-700" />
//             <div className="flex flex-col space-y-4 pt-4">
//               <button className="w-full px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
//                 Log in
//               </button>
//               <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200">
//                 Sign up
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
