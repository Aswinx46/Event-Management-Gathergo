import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUpload } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import ImageCropper from "@/components/other components/ImageCropper";
import { useUploadeImageToCloudinaryMutation } from "@/hooks/VendorCustomHooks";
import { useCreateCategory } from "@/hooks/AdminCustomHooks";
import { toast } from "react-toastify";

interface AddCategoryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void
}

interface Category { title: string; image: File | null; }

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, setIsOpen, refetch }) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [showCropper, setShowCropper] = useState<boolean>(false)
  const [category, setCategory] = useState<Category>()
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [croppedImage, setCroppedImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const validationSchema = Yup.object({
    title: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
    image: Yup.mixed()
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

  const imageUpload = useUploadeImageToCloudinaryMutation()

  const createCategory = useCreateCategory()

  const handleSubmit = async (values: Category, { resetForm }: FormikHelpers<Category>) => {
    try {
      values.image = croppedImage
      const formdata = new FormData()
      if (values.image) {
        formdata.append('file', values.image)
        formdata.append('upload_preset', 'Category')
        setIsLoading(true)
        const response = await imageUpload.mutateAsync(formdata)
        values.image = response?.secure_url
        createCategory.mutate(values, {
          onSuccess(data) {
            toast.success(data?.message)
            console.log('data while creating category', data)
            refetch()
            resetForm()
            setCategory(values)
            setIsOpen(false);
            resetForm();
            setPreviewUrl("");
            setIsLoading(false)
          },
          onError(error) {
            toast.error(error.message)
            console.log('error inside main component', error)
          },
        })
      }
    } catch (error) {
      console.log('error while creating category', error)
    }
  }

  // const handleSubmit = async (values: Category, { resetForm }: FormikHelpers<Category>) => {
  //   values.image = croppedImage
  //   const formdata = new FormData()
  //   if (values.image) {
  //     formdata.append('file', values.image)
  //     formdata.append('upload_preset', 'Category')
  //     const response = await imageUpload.mutateAsync(formdata)
  //     values.image = response?.secure_url
  //     createCategory.mutate(values, {
  //       onSuccess: (data) => {
  //         console.log('asdkjf')
  //         console.log('data updated', data)
  //       },
  //       onError: (err) => {
  //         console.log('err')
  //         console.log(err)
  //       }
  //     })
  //   }
  //   resetForm()
  //   setCategory(values)
  //   setIsOpen(false);
  //   resetForm();
  //   setPreviewUrl("");

  // }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 h-screen w-screen z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
            onClick={() => setIsOpen(false)}
          />
          {showCropper && <ImageCropper showCropper={setShowCropper} image={selectedImage} onCropComplete={setCroppedImage} />}
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
              initialValues={{ title: "", image: null as File | null }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form className="space-y-6">
                  {/* Category Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Title</label>
                    <Field
                      type="text"
                      name="title"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-black transition-colors"
                      placeholder="Enter category title"
                    />
                    <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-xl hover:border-black transition-colors">
                      <div className="space-y-1 text-center">
                        {previewUrl ? (
                          <div className="relative w-full h-48 mb-4">
                            {croppedImage && <img src={URL.createObjectURL(croppedImage)} alt="Preview" className="w-full h-full object-cover rounded-lg" />}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                              onClick={() => {
                                setFieldValue("image", null);
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
                                      setShowCropper(true)
                                      setSelectedImage(URL.createObjectURL(file));
                                      setFieldValue("image", file);
                                      setPreviewUrl(URL.createObjectURL(file))
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
                    <ErrorMessage name="image" component="p" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors shadow-md"
                  >
                    {isLoading ? 'Creating category...' : 'Create category'}

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

export default React.memo(AddCategoryModal);
