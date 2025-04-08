import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus } from 'react-icons/fa';
import AddCategoryModal from './AddCategoryModal';
import { UseChangeStatusCategory, useFindAllCategories } from '@/hooks/AdminCustomHooks';
import Pagination from '@/components/other components/Pagination';
import { toast } from 'react-toastify';
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
  const changeStatusCategoryApi = UseChangeStatusCategory()

  useEffect(() => {
    if (findCategoryApi.data?.totalPages) {
      setTotalPages(findCategoryApi.data.totalPages);
    }
  }, [findCategoryApi.data]);

  const categories = findCategoryApi?.data?.categories

  const handleBlockCategory = (id: string) => {
    changeStatusCategoryApi.mutate(id, {
      onSuccess: (data) => {
        findCategoryApi.refetch()
        toast.success(data.message)
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6"
    >
      {isOpen && <AddCategoryModal isOpen={isOpen} setIsOpen={setIsOpen} currentPage={currentPage} />}

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-bold text-gray-900">Category Management</h1>
          <p className="text-gray-600">Manage and organize your event categories</p>
        </motion.div>

        {/* Search & Add Category */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full shadow-sm border-2 border-transparent focus:border-black focus:ring-2 focus:ring-black/5 transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-full shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <FaPlus className="text-sm" />
            <span>New Category</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Categories Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        className="max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <AnimatePresence
          mode="popLayout"
          initial={false}>
          {categories?.map((category: Category, index: number) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: index * 0.1
                }
              }}
              exit={{ 
                opacity: 0, 
                x: 20, 
                y: -20,
                transition: {
                  type: "tween",
                  duration: 0.2
                }
              }}
              whileHover={{ 
                y: -5,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all"
            >
              <div className="aspect-w-16 aspect-h-12 bg-gray-100">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900 truncate">{category.title}</h3>
                  <span className="text-xs text-gray-500 font-medium">#{category.categoryId}</span>
                </div>

                <div className="flex items-center justify-between">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${category.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {category.status}
                  </motion.span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBlockCategory(category._id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${category.status === 'active'
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.status === 'active' ? 'Block' : 'Unblock'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto mt-8">
        <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
      </div>
    </motion.div>
  );
};

export default CategoryManagement;
