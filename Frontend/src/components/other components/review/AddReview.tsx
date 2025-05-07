/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, CheckCircle, Loader2, X } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { ReviewEntity } from "@/types/ReviewType"

interface AddReviewModalProps {
  isOpen: boolean
  onClose: () => void
  reviewerId: string
  targetId: string
  targetType: "service" | "event"
  onSubmit: (review: ReviewEntity) => void
}

// Validation schema using Yup
const ReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5 stars")
    .required("Rating is required"),
  comment: Yup.string()
    .min(3, "Comment must be at least 3 characters")
    .max(500, "Comment cannot exceed 500 characters")
    .required("Comment is required"),
})

export default function AddReviewModal({
  isOpen,
  onClose,
  reviewerId,
  targetId,
  targetType,
  onSubmit,
}: AddReviewModalProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmitReview = async (values: { rating: number; comment: string }, { setSubmitting, resetForm }: any) => {
    try {
      const review: ReviewEntity = {
        reviewerId, 
        targetId, 
        targetType,
        rating: values.rating,
        comment: values.comment,
      }

      await onSubmit(review)
      setIsSuccess(true)

      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm()
        setIsSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Failed to submit review:", error)
    } finally {
      setSubmitting(false)
    }
  }

  // If the modal is not open, don't render anything
  if (!isOpen) return null

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
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md mx-auto p-6 rounded-lg bg-black text-white border border-gray-800 shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.h2
              className="text-xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Add Your Review
            </motion.h2>

            <Formik
              initialValues={{ rating: 0, comment: "" }}
              validationSchema={ReviewSchema}
              onSubmit={handleSubmitReview}
            >
              {({ values, setFieldValue, isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setFieldValue("rating", star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              (hoverRating || values.rating) >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-500"
                            } transition-colors duration-150`}
                          />
                        </motion.button>
                      ))}
                    </div>
                    {errors.rating && touched.rating && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.rating}
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-300">
                      Comment
                    </label>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Field
                        as="textarea"
                        id="comment"
                        name="comment"
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-gray-600 focus:border-transparent text-white placeholder-gray-500"
                        placeholder="Share your experience..."
                      />
                      <ErrorMessage name="comment">
                        {(msg) => (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {msg}
                          </motion.div>
                        )}
                      </ErrorMessage>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-end"
                  >
                    <AnimatePresence mode="wait">
                      {isSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center space-x-2 bg-green-900 text-white px-4 py-2 rounded-md"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Review submitted!</span>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="submit"
                          type="submit"
                          disabled={isSubmitting}
                          className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                            isSubmitting ? "bg-gray-700 cursor-not-allowed" : "bg-gray-100 text-black hover:bg-white"
                          }`}
                          whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <span>Submit Review</span>
                          )}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
