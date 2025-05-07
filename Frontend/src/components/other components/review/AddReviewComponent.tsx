/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Star, MessageCircle } from "lucide-react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReviewEntity } from "@/types/ReviewType";

interface AddReviewFormProps {
    targetId: string;
    targetType: "service" | "event";
    reviewerId: string;
    onReviewSubmitted?: (review: ReviewEntity) => void;
}

export function AddReviewForm({ targetId, targetType, reviewerId, onReviewSubmitted }: AddReviewFormProps) {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const initialValues = {
        rating: 0,
        comment: "",
    };

    interface InititalValues {
        rating: number | string,
        comment: string
    }

    const validate = (values: typeof initialValues) => {
        const errors: Partial<InititalValues> = {};

        if (!values.rating || values.rating < 1) {
            errors.rating = "Rating is required";
        }

        if (!values.comment) {
            errors.comment = "Comment is required";
        } else if (values.comment.length < 3) {
            errors.comment = "Comment should be at least 3 characters";
        } else if (values.comment.length > 500) {
            errors.comment = "Comment cannot exceed 500 characters";
        }

        return errors;
    };

    const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
        setSubmitting(true);

        try {
            // Here you would normally send the data to your API
            const reviewData: ReviewEntity = {
                reviewerId,
                targetId,
                targetType,
                rating: values.rating,
                comment: values.comment,
            };

            console.log("Submitting review:", reviewData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Review submitted successfully!");
            resetForm();

            if (onReviewSubmitted) {
                onReviewSubmitted(reviewData);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 text-gray-100"
        >
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold mb-6 text-center text-white"
            >
                Share Your Experience
            </motion.h2>

            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, errors, touched }) => (
                    <Form className="space-y-6">
                        <FormItem>
                            <FormLabel className="flex items-center gap-2 mb-2 text-gray-300">
                                <Star className="h-5 w-5 text-yellow-400" />
                                <span>Rating</span>
                            </FormLabel>
                            <FormControl>
                                <div className="flex justify-center items-center space-x-2 py-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            type="button"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setFieldValue("rating", star)}
                                            onMouseEnter={() => setHoveredStar(star)}
                                            onMouseLeave={() => setHoveredStar(null)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-8 w-8 ${star <= (hoveredStar || values.rating)
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-600"
                                                    } transition-colors duration-200`}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </FormControl>
                            {errors.rating && touched.rating && (
                                <div className="text-red-400 text-sm mt-1">{errors.rating}</div>
                            )}
                        </FormItem>

                        <FormItem>
                            <FormLabel className="flex items-center gap-2 mb-2 text-gray-300">
                                <MessageCircle className="h-5 w-5 text-blue-400" />
                                <span>Your Review</span>
                            </FormLabel>
                            <FormControl>
                                <Field
                                    as={Textarea}
                                    name="comment"
                                    placeholder="Share your thoughts and experience..."
                                    className="min-h-[120px] resize-none bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-offset-gray-900 focus-visible:ring-gray-700"
                                />
                            </FormControl>
                            <ErrorMessage name="comment" component="div" className="text-red-400 text-sm mt-1" />
                            <div className="text-xs text-gray-500 mt-1 text-right">
                                {values.comment.length}/500 characters
                            </div>
                        </FormItem>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex justify-center"
                        >
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full md:w-auto bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                            >
                                {submitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit Review"
                                )}
                            </Button>
                        </motion.div>
                    </Form>
                )}
            </Formik>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </motion.div>
    );
}