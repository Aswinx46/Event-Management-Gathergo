import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming you're using a UI library like Shadcn
import ImagePreview from "./ImagePreview";
import { toast } from "react-toastify";
import VendorRejectionModal from "@/components/other components/RejectionReasonModal";
import { useFetchAllPendingVendorAdminQuery, useRejectPendingVendor, useUpdatePendingVendorStatusAdmin } from "@/hooks/AdminCustomHooks";
import EmptyTableMessage from "@/components/other components/NoUserAvailable";
interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  vendorStatus: "pending" | "Approved" | 'Rejected';
  idProof: string;
  vendorId: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Animation variants for each vendor card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Button hover animation
const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
    },
  },
};

const PendingVendorRequests: React.FC = () => {

  const [currentPage, _setCurrentPage] = useState<number>(1)
  const [pendingVendors, setPendingVendors] = useState<Vendor[] | []>([])
  const [preview, setPreview] = useState<boolean>(false)
  const [selectedIdProof, setSelectedProof] = useState<string>('')
  const [update, setUpdate] = useState<boolean>(false)
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false)
  const [rejectionReason, setRejectionReason] = useState<string>('')
  const [selectedVendorId, setSelectedVendorId] = useState<string>('')
  const pendingVendorQuery = useFetchAllPendingVendorAdminQuery(currentPage)

  console.log(pendingVendorQuery.data)
  useEffect(() => {
    setPendingVendors(pendingVendorQuery?.data?.pendingVendors)
  }, [pendingVendorQuery.data])



  const updateStatusMutation = useUpdatePendingVendorStatusAdmin()
  const rejectVendor = useRejectPendingVendor()


  const handleViewProof = ( idProof: string) => {
    setSelectedProof(idProof)
    setPreview(true)
  };

  const handleAccept = (id: string) => {
    console.log(`Accepting vendor ${id}`);
    updateStatusMutation.mutate({ vendorId: id, newStatus: 'approved' }, {
      onSuccess: () => {
        pendingVendorQuery.refetch()
      }
    })
    toast.success('vendor approved')
    setUpdate(!update)
  };

  const handleReject = () => {
    setShowRejectModal(false)
    setRejectionReason('')
    rejectVendor.mutate({ vendorId: selectedVendorId, newStatus: 'rejected', rejectionReason }, {
      onSuccess: () => {
        pendingVendorQuery.refetch()
      }
    })
    toast.success('vendor Rejected')
    setUpdate(!update)
  };

  const onOpen = (id: string) => {
    setShowRejectModal(true)
    setSelectedVendorId(id)
  }

  const onClose = () => {
    setShowRejectModal(false)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {preview && <ImagePreview url={selectedIdProof} setIsOpen={setPreview} />}
      {showRejectModal && <VendorRejectionModal isOpen={showRejectModal} onClose={onClose} onSubmit={handleReject} setRejectionReason={setRejectionReason} rejectionReason={rejectionReason} />}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pending Vendor Requests
        </h1>
        <p className="text-gray-600 mb-6">Review and manage vendor applications</p>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search vendors..."
            className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {pendingVendors?.length <= 0 && <EmptyTableMessage />}

        {/* Vendor List */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {pendingVendors?.map((vendor: Vendor) => (
            <motion.div
              key={vendor._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200"
              variants={cardVariants}
              whileHover={{ scale: 1.02, boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Vendor Info */}
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                  {vendor.name.charAt(0)}
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">{vendor.name}</p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">ID:</span> {vendor.vendorId} |{" "}
                    <span className="font-medium">Email:</span> {vendor.email} |{" "}
                    <span className="font-medium">Phone:</span> {vendor.phone}
                  </p>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center space-x-3">
                {/* Status Indicator */}
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${vendor.vendorStatus === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${vendor.vendorStatus === "pending" ? "bg-yellow-500" : "bg-green-500"
                      }`}
                  />
                  <span>{vendor.vendorStatus}</span>
                </div>

                {/* Action Buttons */}
                <Button
                  asChild
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                >
                  <motion.button
                    onClick={() => handleViewProof( vendor.idProof)}
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    ID Proof
                  </motion.button>
                </Button>
                <Button
                  asChild
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                >
                  <motion.button
                    onClick={() => handleAccept(vendor._id)}
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    Accept
                  </motion.button>
                </Button>
                <Button
                  asChild
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  <motion.button
                    onClick={() => onOpen(vendor._id)}
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    Reject
                  </motion.button>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PendingVendorRequests;