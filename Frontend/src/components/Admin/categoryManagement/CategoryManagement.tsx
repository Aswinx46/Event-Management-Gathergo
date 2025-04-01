import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus } from 'react-icons/fa';
import AddCategoryModal from './AddCategoryModal';
import { useFindAllCategories } from '@/hooks/AdminCustomHooks';
import Pagination from '@/components/other components/Pagination';
interface Category {
  categoryId: string;
  title: string;
  createdAt: string;
  image: string;
  status: 'active' | 'blocked';
  _id: string
}

const CategoryManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1)
  // const [categories, setCategories] = useState<Category>()
  const [totalPages, setTotalPages] = useState<number>(1)

  const findCategoryApi = useFindAllCategories(currentPage)

  console.log(findCategoryApi.data)


  const categories = findCategoryApi?.data?.categories

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-7xl md:w-1/2 w-screen mx-auto space-y-8"
    >
      {isOpen && <AddCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} refetch={findCategoryApi.refetch} />}

      {/* Black Header */}
      <div className="bg-black rounded-xl p-6 shadow-lg text-white">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl  font-bold"
        >
          Category Management
        </motion.h1>
        <p className="text-gray-400 text-sm">Manage and organize your event categories</p>
      </div>

      {/* Search & Add Category */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-xl shadow-md border border-gray-300">
        {/* Search Bar */}
        <div className="relative flex-grow sm:max-w-md group">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl bg-white text-black placeholder-gray-500 focus:outline-none focus:border-black transition-all"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-black transition-colors" />
        </div>

        {/* Add Category Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all w-full sm:w-auto justify-center"
        >
          <FaPlus className="text-white" />
          <span>Add New Category</span>
        </motion.button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-gray-300 shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              <AnimatePresence>
                {categories?.map((category: Category) => (
                  <motion.tr
                    key={category._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ backgroundColor: '#f9f9f9' }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-full">
                        {category.categoryId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.div whileHover={{ scale: 1.1 }} className="relative w-12 h-12">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="h-12 w-12 rounded-lg object-cover border border-gray-300"
                        />
                      </motion.div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-black">{category.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${category.status === 'active'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                          }`}
                      >
                        {category.status}
                      </motion.span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg shadow-sm transition-all ${category.status === 'active'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-gray-400 text-black hover:bg-gray-500'
                          }`}
                      >
                        {category.status === 'active' ? 'Block' : 'Unblock'}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
    </motion.div>
  );
};

export default CategoryManagement;
