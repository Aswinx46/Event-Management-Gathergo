import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus, FaEdit } from 'react-icons/fa';
import AddCategoryModal from './AddCategoryModal';
import { UseChangeStatusCategory, useFindAllCategories, useUpdateCategory } from '@/hooks/AdminCustomHooks';
import Pagination from '@/components/other components/Pagination';
import { toast } from 'react-toastify';
// import { useUploadeImageToCloudinaryMutation } from '@/hooks/VendorCustomHooks';
import { useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { CloudinaryPreset } from '@/utils/cloudinaryPresetFile';

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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [editedTitle, setEditedTitle] = useState<string>('')
  const [editedImage, setEditedImage] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const findCategoryApi = useFindAllCategories(currentPage)
  console.log(findCategoryApi.data)
  const changeStatusCategoryApi = UseChangeStatusCategory()

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -30
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const handleCardClick = (category: Category) => {
    setSelectedCategory(category);
    setEditedTitle(category.title);
    setEditedImage(category.image);
    setIsEditModalOpen(true);
  };

  const handleImageSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFile(file);
        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setEditedImage(previewUrl);
      }
    };
    input.click();
  };

  const updateCategory = useUpdateCategory()
  // const uploadImageToCloudinary = useUploadeImageToCloudinaryMutation()
  const clientQuery = useQueryClient()

  const collectEditedData = async () => {
    if (!selectedCategory) return null;
    if (!selectedFile) {
      const formData = new FormData()

      formData.append('title', editedTitle.trim())
      updateCategory.mutate({ categoryId: selectedCategory._id, formData }, {
        onSuccess: (data) => {
          toast.success(data.message)
          clientQuery.invalidateQueries({ queryKey: ['categories', currentPage] })
          setIsEditModalOpen(false)
          return
        },
        onError: (err) => {
          toast.error(err.message)
          return
        }
      })
    } else if (selectedFile) {
      try {
        const formData = new FormData()
        formData.append('image', selectedFile)
        // formdata.append('upload_preset', 'Category')
        // const response = await uploadImageToCloudinary.mutateAsync(formdata)
        // const updates = {
        //   title: editedTitle.trim(),
        //   image: response.secure_url
        // }
        formData.append('title', editedTitle.trim())

        updateCategory.mutate({ categoryId: selectedCategory._id, formData }, {
          onSuccess: (data) => {
            toast.success(data.message)
            clientQuery.invalidateQueries({ queryKey: ['categories', currentPage] })
            setIsEditModalOpen(false)
            return
          },
          onError: (err) => {
            toast.error(err.message)
            return
          }
        })
      } catch (error) {
        console.log('Error while updating image of category', error)
        if (isAxiosError(error)) toast.error(error.response?.data.message)

      }
    }

    return {
      categoryId: selectedCategory._id,
      title: editedTitle,
      image: selectedFile,
      previousImage: selectedCategory.image
    };
  };

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

      <AnimatePresence>
        {isEditModalOpen && selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={() => setIsEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <div className="flex items-center space-x-4">
                    <img src={editedImage} alt={editedTitle} className="w-20 h-20 object-cover rounded-lg" />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageSelect();
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedFile(null);
                      URL.revokeObjectURL(editedImage);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const editedData = collectEditedData();
                      console.log('Edited Data:', editedData);
                      // Here you can implement your update logic
                    }}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        transition={{ duration: 0.3 }}
        className="max-w-[1920px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {categories?.map((category: Category) => (
            <motion.div
              key={category._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              layoutId={category._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all cursor-pointer relative group"
            >
              <div
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(category);
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-black bg-opacity-70 p-2 rounded-full"
                >
                  <FaEdit className="text-white text-sm" />
                </motion.div>
              </div>

              <div className="aspect-w-16 aspect-h-12 h-1/2 bg-gray-100">
                <img
                  src={CloudinaryPreset + category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transform transition-transform group-hover:scale-105"
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBlockCategory(category._id);
                    }}
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
