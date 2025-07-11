"use client"
import { motion } from "framer-motion"
import { Star, StarHalf, User } from "lucide-react"
import { ReviewDetailsDTO } from "@/types/reviewDetailsDTO"
import { CloudinaryPreset } from "@/utils/cloudinaryPresetFile"
interface UserReviewsProps {
    reviews: ReviewDetailsDTO[]
}

export default function UserReviews({ reviews = [] }: UserReviewsProps) {
    if (reviews.length === 0) {
        return (
          <p className="text-center text-gray-500 text-lg mt-6 bg-gray-100 p-4  shadow-sm">
            No reviews available yet. Be the first to leave one!
          </p>
        );
      }
    return (
        <div className="w-full py-8 bg-black mb-8 text-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    User Reviews
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <ReviewCard key={review._id?.toString() || index} review={review} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function ReviewCard({ review, index }: { review: ReviewDetailsDTO; index: number }) {
    return (
        <motion.div
            className="bg-zinc-900  rounded-lg p-6 shadow-lg line-clamp-3 overflow-y-scroll hide-scrollbar hover:shadow-purple-900/20 transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
            }}
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
            }}
        >
            <div className="flex items-center mb-4">
                <div className="mr-4">
                    {review.reviewerId.profileImage ? (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="h-12 w-12 rounded-full overflow-hidden border-2 border-purple-500"
                        >
                            <img
                                src={CloudinaryPreset+review.reviewerId.profileImage || "/placeholder.svg"}
                                alt={review.reviewerId.name}
                                width={48}
                                height={48}
                                className="h-full w-full object-cover"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-purple-500"
                        >
                            <User className="h-6 w-6 text-zinc-400" />
                        </motion.div>
                    )}
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-white">{review.reviewerId.name}</h3>
                    <div className="flex items-center mt-1">
                        <StarRating rating={review.rating} />
                        <span className="ml-2 text-sm text-zinc-400">{review.targetType === "service" ? "Service" : "Event"}</span>
                    </div>
                </div>
            </div>

            <motion.p
                className="text-zinc-300 mt-3 hide-scrollbar line-clamp-5 overflow-y-scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
                "{review.comment}"
            </motion.p>
        </motion.div>
    )
}

function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
        <motion.div
            className="flex text-yellow-500"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
        >
            {[...Array(fullStars)].map((_, i) => (
                <motion.span
                    key={`star-${i}`}
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                    <Star className="fill-yellow-500 stroke-yellow-500 h-5 w-5" />
                </motion.span>
            ))}

            {hasHalfStar && (
                <motion.span
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: fullStars * 0.1 }}
                >
                    <StarHalf className="fill-yellow-500 stroke-yellow-500 h-5 w-5" />
                </motion.span>
            )}

            {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                <motion.span
                    key={`empty-star-${i}`}
                    initial={{ rotate: 30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: (fullStars + (hasHalfStar ? 1 : 0) + i) * 0.1 }}
                >
                    <Star className="stroke-zinc-600 h-5 w-5" />
                </motion.span>
            ))}
        </motion.div>
    )
}
