/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useCreateWorkSample, useUploadeImageToCloudinaryMutation } from '@/hooks/VendorCustomHooks';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { WorkSamplesEntity } from '@/types/workSampleEntity';
import ImageCropper from '@/components/other components/ImageCropper';

// TypeScript interfaces
interface ImageFile {
  file: File;
  preview: string;
}

interface WorkSampleFormValues {
  vendorId?: string
  title: string;
  description: string;
  images: ImageFile[];
}



export default function AddWorkSample() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState<string>('')
  const createWorkSample = useCreateWorkSample()
  const [showCropper, setShowCropper] = useState<boolean>(false)
  const [selectedImagesFile, setSelectedImagesFile] = useState<File[]>([])
  const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
  // Form validation schema
  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be less than 100 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters')
      .max(1000, 'Description must be less than 1000 characters'),
  
  });

  // Initial form values
  const initialValues: WorkSampleFormValues = {
    title: '',
    description: '',
    images: []
  };

  // Handle form submission
  const handleSubmit = async (values: WorkSampleFormValues, resetForm: () => void) => {
    setSubmitting(true);
    if (selectedImagesFile.length <= 0) {
      toast.error('Select atleast One image')
    } else if (selectedImagesFile.length > 10) {
      toast.error("Maximum 100 images allowed")
    }
    try {
      const formdata = new FormData()
      for (const file of selectedImagesFile) {
        // console.log(file)
        formdata.append('image', file)
      }
      console.log(formdata.forEach(file=>{
        console.log(file)
      }))

      const uploadValue = {
        description: values.description,
        title: values.title,
        vendorId: vendorId!,

      }
      formdata.append('workSampleData', JSON.stringify(uploadValue))
      createWorkSample.mutate(formdata, {
        onSuccess: () => {
          toast.success('Work sample created')
          setSuccess(true)
       
          // formik.resetForm()
          setSelectedImagesFile([])
          resetForm()
        },
        onError: (err) => toast.error(err.message)
      })
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const handleOnCropComplete = (croppedFile: File | null) => {
    if (!croppedFile) return
    setShowCropper(false)
    setSelectedImagesFile((prev) => [...prev, croppedFile])
  }

  const handleRemovePreviewImages = (image: File) => {
    const images = selectedImagesFile.filter((img) => img !== image)
    setSelectedImagesFile(images)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {showCropper && <ImageCropper image={image} showCropper={setShowCropper} onCropComplete={handleOnCropComplete} />}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
        >
          Add New Work Sample
        </motion.h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={handleSubmit}
          onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}

        >
          {({ values, errors, touched }) => (
            <Form className="space-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`w-full px-4 py-3 rounded-lg border ${errors.title && touched.title ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
                  placeholder="Enter work sample title"
                />
                <ErrorMessage name="title">
                  {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`}
                  placeholder="Describe your work sample in detail"
                />
                <ErrorMessage name="description">
                  {msg => <div className="text-red-500 text-sm mt-1">{msg}</div>}
                </ErrorMessage>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Images
                </label>

                <FieldArray name="images">
                  {() => (
                    <div className="space-y-4">
                      {/* Image preview section */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedImagesFile.map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemovePreviewImages(image)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </motion.button>
                          </motion.div>
                        ))}

                        {/* Add image button */}
                        {values.images.length < 10 && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="aspect-square border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors duration-200"
                          >
                            <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              <span className="text-sm text-purple-600 font-medium">Add Image</span>
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => {
                                  const file = event.currentTarget.files?.[0];
                                  if (file) {
                                    setImage(URL.createObjectURL(file))
                                    setShowCropper(true)
                                  }
                                }}
                              />
                            </label>
                          </motion.div>
                        )}
                      </div>

                      {/* Error message for images */}
                      {typeof errors.images === 'string' && (
                        <div className="text-red-500 text-sm mt-1">{errors.images}</div>
                      )}

                      {values.images.length === 0 && (
                        <p className="text-center text-gray-500 text-sm italic">
                          Please add at least one image of your work sample
                        </p>
                      )}

                      {values.images.length >= 10 && (
                        <p className="text-center text-amber-600 text-sm">
                          Maximum 10 images allowed
                        </p>
                      )}
                    </div>
                  )}
                </FieldArray>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white 
                    ${submitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                    } transition-all duration-200 transform`}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Add Work Sample'}
                </motion.button>
              </motion.div>
            </Form>
          )}
        </Formik>

        {/* Success message */}
        {success && (
          <motion.div
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center"
          >
            <svg className="h-5 w-5 text-green-500 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-700">Work sample added successfully!</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}