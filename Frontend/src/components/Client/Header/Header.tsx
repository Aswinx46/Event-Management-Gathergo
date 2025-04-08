"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Instagram, Facebook, Linkedin, Menu } from "lucide-react"
import ShinyText from '../../../../addon/ShinyText/ShinyText'
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { useClientLogout } from "@/hooks/ClientCustomHooks"
import { toast } from "react-toastify"
import { removeClient } from "@/store/slices/user/userSlice"
import { removeToken } from "@/store/slices/user/userTokenSlice"
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)

  const { mutate } = useClientLogout()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogOut = () => {
    mutate()
    navigate('/login')
    dispatch(removeClient(null))
    dispatch(removeToken(null))
    toast.success('LOGOUT SUCCESSFULL')
  }



  return (
    <motion.header
      className="w-full bg-black py-4 px-6 border-b border-gray-200"
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
          <Link to="https://instagram.com" className="text-white hover:text-gray-600">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Instagram size={20} />
            </motion.div>
          </Link>
          <Link to="https://facebook.com" className="text-white hover:text-gray-600">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Facebook size={20} />
            </motion.div>
          </Link>
          <Link to="https://linkedin.com" className="text-white hover:text-gray-600">
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
            {/* <motion.h1 className="text-lg font-medium tracking-widest text-white" whileHover={{ scale: 1.05 }}>
              GATHERGO
            </motion.h1> */}
            <ShinyText text="GATHERGO" disabled={false} speed={6} className='custom-class' />
          </Link>
        </motion.div>

        {/* Menu Button */}
        <motion.div
          className="cursor-pointer text-white"
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
        className="fixed inset-0 bg-gray-600 z-50 flex flex-col items-center justify-center"
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
          {[
            { name: "Home", path: "/" },
            { name: "Profile", path: "/profile" },
            { name: "Events", path: "/events" }
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Link
                to={item.path}
                className="text-white hover:text-gray-600 tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                <motion.span whileHover={{ scale: 1.05 }}>{item.name}</motion.span>
              </Link>
            </motion.div>
          ))}
          {clientId && <Button onClick={handleLogOut} className="">LOGOUT</Button>}
          {!clientId && <Button onClick={() => navigate('/login')} className="">LOGIN</Button>}
        </nav>

      </motion.div>
    </motion.header>
  )
}
