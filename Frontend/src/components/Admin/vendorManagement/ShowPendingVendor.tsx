"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Clock, Eye, Search, Shield, X, XCircle } from "lucide-react"


// Define the vendor type
interface Vendor {
  _id: string
  name: string
  email: string
  phone: string
  status: "pending" | "approved" | "rejected"
  idProof: string
  appliedDate: string
}

export default function PendingVendors() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [showIdProof, setShowIdProof] = useState(false)

  // Mock data for pending vendors
  const [pendingVendors, setPendingVendors] = useState<Vendor[]>([
    {
      _id: "VEN-001",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      phone: "+1 (234) 567-8901",
      status: "pending",
      idProof: "/placeholder.svg?height=400&width=600",
      appliedDate: "2023-03-15T10:30:00Z",
    },
    {
      _id: "VEN-002",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      phone: "+1 (345) 678-9012",
      status: "pending",
      idProof: "/placeholder.svg?height=400&width=600",
      appliedDate: "2023-03-16T14:45:00Z",
    },
    {
      _id: "VEN-003",
      name: "David Brown",
      email: "david.b@example.com",
      phone: "+1 (456) 789-0123",
      status: "pending",
      idProof: "/placeholder.svg?height=400&width=600",
      appliedDate: "2023-03-17T09:15:00Z",
    },
    {
      _id: "VEN-004",
      name: "Jennifer Davis",
      email: "jennifer.d@example.com",
      phone: "+1 (567) 890-1234",
      status: "pending",
      idProof: "/placeholder.svg?height=400&width=600",
      appliedDate: "2023-03-18T16:20:00Z",
    },
    {
      _id: "VEN-005",
      name: "Robert Wilson",
      email: "robert.w@example.com",
      phone: "+1 (678) 901-2345",
      status: "pending",
      idProof: "/placeholder.svg?height=400&width=600",
      appliedDate: "2023-03-19T11:10:00Z",
    },
  ])

  // Filter vendors based on search query
  const filteredVendors = pendingVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor._id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Handle vendor approval
  const handleApprove = (vendorId: string) => {
    setPendingVendors((prevVendors) =>
      prevVendors.map((vendor) => (vendor._id === vendorId ? { ...vendor, status: "approved" as const } : vendor)),
    )
    // In a real app, you would make an API call here
    console.log(`Approved vendor: ${vendorId}`)
  }

  // Handle vendor rejection
  const handleReject = (vendorId: string) => {
    setPendingVendors((prevVendors) =>
      prevVendors.map((vendor) => (vendor._id === vendorId ? { ...vendor, status: "rejected" as const } : vendor)),
    )
    // In a real app, you would make an API call here
    console.log(`Rejected vendor: ${vendorId}`)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pending Vendor Requests</h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage vendor applications</p>
          </div>

          <motion.div
            className="relative w-full sm:w-64"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search vendors..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </motion.div>

        {/* Pending Vendors List */}
        {filteredVendors.length > 0 ? (
          <motion.div className="grid gap-4 md:gap-6" variants={containerVariants} initial="hidden" animate="visible">
            {filteredVendors.map((vendor) => (
              <motion.div
                key={vendor._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                variants={itemVariants}
                whileHover={{
                  y: -2,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-semibold text-lg">{vendor.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{vendor.name}</h3>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </span>
                          </div>
                          <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-y-1 sm:gap-x-4">
                            <span className="flex items-center">
                              <span className="font-medium text-gray-700 mr-1">ID:</span> {vendor._id}
                            </span>
                            <span className="flex items-center">
                              <span className="font-medium text-gray-700 mr-1">Email:</span> {vendor.email}
                            </span>
                            <span className="flex items-center">
                              <span className="font-medium text-gray-700 mr-1">Phone:</span> {vendor.phone}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">Applied on {formatDate(vendor.appliedDate)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
                      <motion.button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => {
                          setSelectedVendor(vendor)
                          setShowIdProof(true)
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        ID Proof
                      </motion.button>
                      <motion.button
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => handleApprove(vendor._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </motion.button>
                      <motion.button
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={() => handleReject(vendor._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Status Bar - Shows when a vendor is approved or rejected */}
                <AnimatePresence>
                  {vendor.status === "approved" && (
                    <motion.div
                      className="bg-green-100 px-6 py-2 border-t border-green-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-sm text-green-800 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Vendor has been approved successfully
                      </p>
                    </motion.div>
                  )}

                  {vendor.status === "rejected" && (
                    <motion.div
                      className="bg-red-100 px-6 py-2 border-t border-red-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p className="text-sm text-red-800 flex items-center">
                        <XCircle className="w-4 h-4 mr-2" />
                        Vendor has been rejected
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No pending vendors</h3>
            <p className="mt-1 text-sm text-gray-500">There are no pending vendor requests at this time.</p>
          </motion.div>
        )}
      </div>

      {/* ID Proof Modal */}
      <AnimatePresence>
        {showIdProof && selectedVendor && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowIdProof(false)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-2xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">ID Proof - {selectedVendor.name}</h3>
                <motion.button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowIdProof(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-6">
                <div className="aspect-[3/2] bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={selectedVendor.idProof || "/placeholder.svg"}
                    alt={`ID Proof for ${selectedVendor.name}`}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vendor ID</p>
                    <p className="text-sm text-gray-900">{selectedVendor._id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-sm text-gray-900">{selectedVendor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="text-sm text-gray-900">{selectedVendor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone Number</p>
                    <p className="text-sm text-gray-900">{selectedVendor.phone}</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <motion.button
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => setShowIdProof(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => {
                      handleApprove(selectedVendor._id)
                      setShowIdProof(false)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Approve Vendor
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

