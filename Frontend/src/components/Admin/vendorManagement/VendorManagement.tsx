// src/components/EventProviders.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../../../axios/adminAxios'
import { useNavigate } from 'react-router-dom';
import Pagination from '@/components/other components/Pagination';
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
  const [currentPage,setCurrentPage]=useState<number>(1)
  const [totalPage,setTotalPage]=useState<number>(0)
  const queryClient = useQueryClient();
  const { data,refetch} = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const response = await axios.get('/vendors', { params: { pageNo:currentPage} })
      console.log(response?.data?.vendors)
      setVendors(response?.data?.vendors)
      setTotalPage(response?.data?.totalPages)
      return response.data
    },
    staleTime: 1000 * 60 * 5,
    initialData: () => {
      return queryClient.getQueryData<Vendor[]>(['vendors']) || []; // Use cache first
    }
  })
 useEffect(()=>{
  refetch()
 },[currentPage])
  


  const [searchTerm, setSearchTerm] = useState('');

  // Filter vendors based on search term
  //   const filteredVendors = vendors.filter(vendor =>
  //     vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  //   );



  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };


  const navigate = useNavigate()

  const handleNavigateToPendingVendor = () => {
    navigate('/admin/pendingVendors')
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
      <motion.div
        variants={tableVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">NAME</th>
              <th className="p-4 text-left">EMAIL</th>
              <th className="p-4 text-left">PHONE</th>
              <th className="p-4 text-left">PROFILE</th>
              <th className="p-4 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {vendors?.map((vendor, index) => (
              <motion.tr
                key={vendor._id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">{vendor._id}</td>
                <td className="p-4">{vendor.name}</td>
                <td className="p-4">{vendor.email}</td>
                <td className="p-4">{vendor.phone}</td>
                <td className="p-4">
                  <img
                    src={vendor.profileImage}
                    alt={vendor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="p-4">
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    // onClick={() => toggleStatus(vendor._id)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${vendor.status === 'active'
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                  >
                    {vendor.status === 'active' ? (
                      <>
                        <FaUserTimes />
                        <span>Block</span>
                      </>
                    ) : (
                      <>
                        <FaUserCheck />
                        <span>Unblock</span>
                      </>
                    )}
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

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

            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPage}/>
      </div>
    </div>
  );
};

export default EventProviders;