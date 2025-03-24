"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Users, Home, User, Calendar, Layers, Wallet } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import axios from '../../../axios/clientAxios'
import { AxiosResponse } from "axios"
// Define the provider type
interface Client {
  _id: string
  name: string
  email: string
  phone: string
  profile?: string
  status: "active" | "blocked"
  clientId:string
}

export default function EventProvidersPanel() {
  // const [providers, setProviders] = useState<Provider[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages,setTotalPages]=useState<number>(1)
  const [showPendingRequests, setShowPendingRequests] = useState(false)


  const {data}=useQuery({
    queryKey:['clients'],
    queryFn:async(currentPage)=>{
        const response:AxiosResponse=await axios.get('/clients',{params:{pageNo:currentPage}})
        console.log(response)
        setTotalPages(response.data.totalPages)
        return response?.data?.clients
    }
  })
  console.log(data)
  const clients=data
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

  const sidebarItemVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    hover: { x: 5, transition: { duration: 0.2 } },
  }

  const handleBlockAndUnblock =(id:string)=>{

  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Clients</h1>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search Providers"
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 rounded-md shadow overflow-hidden">
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
                  {clients?.map((client:Client) => (
                    <motion.tr
                      key={client._id}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="border-t border-gray-200 dark:border-gray-700"
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {client.clientId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {client.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {client.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {client.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs overflow-hidden">
                            {/* {provider.profile.charAt(0).toUpperCase()} */}
                          </div>
                          {/* <span className="ml-2">{provider.profile}</span> */}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={()=>handleBlockAndUnblock(client._id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${client.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                            }`}
                        >
                          {client.status === "active" ? "Active" : "Block"}
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </motion.tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

