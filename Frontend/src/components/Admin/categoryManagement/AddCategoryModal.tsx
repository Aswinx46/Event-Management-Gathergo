import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUpload } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AddCategoryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, setIsOpen }) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Yup validation schema
  const validationSchema = Yup.object({
    categoryName: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
    categoryTitle: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
    categoryImage: Yup.mixed()
      .test("fileSize", "File size is too large (max 5MB)", (value: any) =>
        value ? value.size <= 5 * 1024 * 1024 : true
      )
      .test("fileType", "Unsupported file type (only JPG, PNG, GIF)", (value: any) =>
        value ? ["image/jpeg", "image/png", "image/gif"].includes(value.type) : true
      )
      .required("Category image is required"),
  });

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl p-8 shadow-xl relative w-full max-w-md mx-4 z-10"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes size={20} />
            </motion.button>

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
              <p className="text-gray-500 text-sm mt-1">Create a new event category</p>
            </div>

            {/* Formik Form */}
            <Formik
              initialValues={{ categoryName: "", categoryTitle: "", categoryImage: null }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log("Submitted Values:", values);
                setIsOpen(false);
                resetForm();
                setPreviewUrl("");
              }}
            >
              {({ setFieldValue, values }) => (
                <Form className="space-y-6">
                  {/* Category Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                    <Field
                      type="text"
                      name="categoryName"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                      placeholder="Enter category name"
                    />
                    <ErrorMessage name="categoryName" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Category Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Title</label>
                    <Field
                      type="text"
                      name="categoryTitle"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                      placeholder="Enter category title"
                    />
                    <ErrorMessage name="categoryTitle" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-black transition-colors">
                      <div className="space-y-1 text-center">
                        {previewUrl ? (
                          <div className="relative w-full h-48 mb-4">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                              onClick={() => {
                                setFieldValue("categoryImage", null);
                                setPreviewUrl("");
                              }}
                              type="button"
                            >
                              <FaTimes size={16} />
                            </motion.button>
                          </div>
                        ) : (
                          <>
                            <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-700">
                                <span>Upload a file</span>
                                <input
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      setFieldValue("categoryImage", file);
                                      setPreviewUrl(URL.createObjectURL(file));
                                    }
                                  }}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    <ErrorMessage name="categoryImage" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors shadow-md"
                  >
                    Create Category
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddCategoryModal;
