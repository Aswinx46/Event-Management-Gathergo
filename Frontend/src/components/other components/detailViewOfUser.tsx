// // ProfileModal.tsx
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Vendor {
//   createdAt: string;
//   email: string;
//   idProof?: string;
//   lastLogin: string;
//   name: string;
//   onlineStatus: string;
//   phone: number;
//   rejectionReason?: string;
//   role: string;
//   status: string;
//   vendorId?: string;
//   vendorStatus?: string;
//   __v?: number;
//   _id: string;
//   clientId?:string
// }



// interface Client{
//     _id?:string,
//     name:string,
//     email:string,
//     phone:number,
//     role:'client',
//     status?:'active'|'block',
//     profileImage?:string
//     createdAt?:string,
//     lastLogin?:string,
//     onlineStatus?:'online'|'offline',
//     isAdmin?:boolean
//     clientId?: string
// }

// type ProfileData = Client | Vendor;

// interface ProfileModalProps {
//   isOpen: boolean;
//   setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>;
//   profile: ProfileData;
// }

// const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, setIsOpen, profile }) => {
//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.95 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: { duration: 0.2 }
//     },
//     exit: { 
//       opacity: 0, 
//       scale: 0.95,
//       transition: { duration: 0.15 }
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleString();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             className="fixed inset-0 bg-black/50 z-40"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             // onClick={()=>setIsOpen(false)}
//           />
          
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center z-50 p-4"
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//           >
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[80vh] overflow-y-auto">
//               <div className="p-6">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-4">
//                   {profile.role === 'vendor' ? 'Vendor' : 'Client'} Profile
//                 </h2>

//                 <div className="space-y-3">
//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Name:</span>
//                     <span>{profile.name}</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Email:</span>
//                     <span>{profile.email}</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Phone:</span>
//                     <span>{profile.phone}</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Role:</span>
//                     <span className="capitalize">{profile.role}</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Status:</span>
//                     <span className="capitalize">{profile.status}</span>
//                   </div>

//                   {profile.role === 'vendor' && (
//                     <div className="grid grid-cols-2 gap-2">
//                       <span className="text-gray-600 font-medium">Vendor Status:</span>
//                       <span className="capitalize">{profile.vendorStatus}</span>
//                     </div>
//                   )}

//                   {profile.role === 'vendor' && profile.rejectionReason && (
//                     <div className="grid grid-cols-2 gap-2">
//                       <span className="text-gray-600 font-medium">Rejection Reason:</span>
//                       <span>{profile.rejectionReason}</span>
//                     </div>
//                   )}

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Online Status:</span>
//                     <span className="capitalize">{profile.onlineStatus}</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Created At:</span>
//                     <span>{formatDate(profile.createdAt ?? '')}</span>
//                   </div>

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Last Login:</span>
//                     <span>{formatDate(profile.lastLogin ?? '')}</span>
//                   </div>

//                   {/* <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">Updated At:</span>
//                     <span>{formatDate(profile.updatedAt ?? '')}</span>
//                   </div> */}

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">ID Proof:</span>
//                     <img
//                       src={profile.role=='vendor' ? profile.idProof :''} 
//                       className="text-blue-600 hover:underline truncate"
//                     />
                    
//                   </div>

//                   <div className="grid grid-cols-2 gap-2">
//                     <span className="text-gray-600 font-medium">
//                       {profile.role === 'vendor' ? 'Vendor ID:' : 'ID:'}
//                     </span>
//                     <span>{profile.role === 'vendor' ? profile.vendorId : profile._id}</span>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-end">
//                   <button
//                     onClick={()=>setIsOpen(false)}
//                     className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ProfileModal;

"use client"

import type React from "react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Mail, Phone, User, Shield, Clock, X, ExternalLink } from "lucide-react"

interface Vendor {
  createdAt: string
  email: string
  idProof?: string
  lastLogin: string
  name: string
  onlineStatus: string
  phone: number
  rejectionReason?: string
  profileImage?:string
  role: string
  status: string
  vendorId?: string
  vendorStatus?: string
  __v?: number
  _id: string
  clientId?: string
}

interface Client {
  _id?: string
  name: string
  email: string
  phone: number
  role: "client"
  status?: "active" | "block"
  profileImage?: string
  createdAt?: string
  lastLogin?: string
  onlineStatus?: "online" | "offline"
  isAdmin?: boolean
  clientId?: string
}

type ProfileData = Client | Vendor

interface ProfileModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  profile: ProfileData
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, setIsOpen, profile }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString()
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isOpen, setIsOpen])

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Determine color theme based on role
  const isVendor = profile.role === "vendor"
  const themeColor = isVendor ? "indigo" : "emerald"
  const roleColor = isVendor ? "bg-indigo-100 text-indigo-800" : "bg-emerald-100 text-emerald-800"

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "block":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "approved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Online status indicator
  const onlineStatusColor = profile.onlineStatus?.toLowerCase() === "online" ? "bg-green-500" : "bg-gray-400"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-modal-title"
            >
              {/* Header with close button */}
              <div
                className={`relative p-6 ${isVendor ? "bg-indigo-50 dark:bg-indigo-950/30" : "bg-emerald-50 dark:bg-emerald-950/30"}`}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-white dark:border-gray-800 shadow-md">
                      <AvatarImage
                        src={
                          profile.role === "client" && profile.profileImage
                            ? profile.profileImage
                            : "/placeholder.svg?height=80&width=80"
                        }
                      />
                      <AvatarFallback className={`bg-${themeColor}-100 text-${themeColor}-800 text-xl font-medium`}>
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ${onlineStatusColor} border-2 border-white dark:border-gray-800`}
                    />
                  </div>

                  <div>
                    <h2 id="profile-modal-title" className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {profile.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className={roleColor}>
                        {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(profile.status || "")}>
                        {profile.status && profile.status?.charAt(0).toUpperCase() + profile.status?.slice(1) || "Unknown"}
                      </Badge>
                      {isVendor && profile.vendorStatus && (
                        <Badge variant="outline" className={getStatusColor(profile.vendorStatus)}>
                          {profile.vendorStatus.charAt(0).toUpperCase() + profile.vendorStatus.slice(1)}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <User size={18} className={`text-${themeColor}-500`} />
                      Contact Information
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-gray-900 dark:text-gray-100">{profile.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-gray-900 dark:text-gray-100">{profile.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</p>
                          <p className="text-gray-900 dark:text-gray-100 text-sm break-all">
                            {isVendor ? profile.vendorId : profile._id}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <Clock size={18} className={`text-${themeColor}-500`} />
                      Activity
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                          <p className="text-gray-900 dark:text-gray-100">{formatDate(profile.createdAt || "")}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</p>
                          <p className="text-gray-900 dark:text-gray-100">{formatDate(profile.lastLogin || "")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {isVendor && profile.rejectionReason && (
                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">Rejection Reason</h3>
                    <p className="text-red-700 dark:text-red-200">{profile.rejectionReason}</p>
                  </div>
                )}

                {/* ID Proof */}
                {isVendor && profile.idProof && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">ID Proof</h3>
                    <div className="relative group">
                      <img
                        src={profile.idProof || "/placeholder.svg"}
                        alt="ID Proof"
                        className="w-full max-h-60 object-contain border border-gray-200 dark:border-gray-700 rounded-lg"
                      />
                      <a
                        href={profile.idProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg"
                      >
                        <ExternalLink className="text-transparent group-hover:text-white h-8 w-8" />
                        <span className="sr-only">View full image</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white rounded-md transition-colors`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProfileModal

