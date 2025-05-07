import React from 'react'
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AddReviewForm } from './AddReviewComponent';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
};

interface ReviewPageProps {
    targetType: 'service' | 'event',
    targetId: string,

}

function ReviewPage({ targetId, targetType }:ReviewPageProps)  {
    const userId = useSelector((state: RootState) => state.clientSlice.client?._id)
    return (
        <div className="min-h-screen bg-black text-white">
            <motion.div
                className="max-w-3xl mx-auto px-4 py-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">Leave a Review</h1>
                    <p className="text-center text-gray-400 mb-8">
                        Your feedback helps improve experiences for everyone
                    </p>
                </motion.div>

                <AddReviewForm
                    targetId={targetId}
                    targetType={targetType as "service" | "event"}
                    reviewerId={userId!}
                    onReviewSubmitted={handleReviewSubmitted}
                />
            </motion.div>
        </div>
    )
}

export default ReviewPage
