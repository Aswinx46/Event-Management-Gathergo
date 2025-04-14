// src/components/EventProviders.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/other components/Pagination';
import { useBlockVendor, useFetchVendorAdminQuery, useUnblockVendor } from '@/hooks/AdminCustomHooks';
import { Table } from '@/components/other components/Table';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
interface Vendor {
  _id: string;
  vendorId: string;
  name: string;
  email: string;
  phone: number;
  idProof: string;
  role: 'vendor';
  status: 'active' | 'inactive' | 'blocked';
  vendorStatus: 'pending' | 'approved' | 'rejected';
  onlineStatus: 'online' | 'offline';
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profileImage?: string
}

const EventProviders: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[] | []>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)

  const fetchVendor = useFetchVendorAdminQuery(currentPage)
  useEffect(() => {
    setVendors(fetchVendor?.data?.vendors)
    setTotalPage(fetchVendor?.data?.totalPages)
  }, [currentPage, fetchVendor.data])



  const [searchTerm, setSearchTerm] = useState('');

  // Filter vendors based on search term
  //   const filteredVendors = vendors.filter(vendor =>
  //     vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };


  const navigate = useNavigate()
  const blockVendor = useBlockVendor()
  const unblockVendor = useUnblockVendor()
  const queryClient = useQueryClient()
  const handleNavigateToPendingVendor = () => {
    navigate('/admin/pendingVendors')
  }

  const blockAndUnblock = ({ userId, userStatus }: { userId: string, userStatus: string }) => {
    console.log(userId)
    console.log(userStatus)
    if (userStatus == 'active') {
      blockVendor.mutate(userId, {
        onSuccess: (data) => {
          toast.success(data.message)
          queryClient.invalidateQueries({ queryKey: ['vendors', currentPage] })
        },
        onError: (err) => {
          toast.error(err.message)
        }
      })
    } else if (userStatus == 'block') {
      unblockVendor.mutate(userId,{
        onSuccess:(data)=>{
          toast.success(data.message)
          queryClient.invalidateQueries({ queryKey: ['vendors', currentPage] })
        },
        onError:(err)=>{
          toast.error(err.message)
          
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header with Search */}

      <div className="flex justify-between items-center mb-6">
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800"
        >
          Event Providers
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <input
            type="text"
            placeholder="Search Providers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </motion.div>
      </div>

      {/* Table */}
      <Table data={vendors} blockAndUnblock={blockAndUnblock} />

      {/* Footer with Pagination and Pending Requests */}
      <div className="flex justify-between items-center mt-6">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={handleNavigateToPendingVendor}
          whileTap="tap"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          Show Pending Requests
        </motion.button>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          onClick={() => navigate('/admin/rejectedVendors')}
          whileTap="tap"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          Show Rejected Vendors
        </motion.button>

        <Pagination current={currentPage} setPage={setCurrentPage} total={totalPage} />
      </div>
    </div>
  );
};

export default EventProviders;