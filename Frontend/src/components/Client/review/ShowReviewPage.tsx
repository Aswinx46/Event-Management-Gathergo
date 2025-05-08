import UserReviews from './ShowReviews'

// Sample review data
const sampleReviews = [
  {
    _id: "1",
    reviewerId: {
      _id: "user1",
      name: "Alex Johnson",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    targetId: "service1",
    targetType: "service",
    rating: 4.5,
    comment:
      "Absolutely amazing service! The attention to detail was impressive and the team was very professional. Would definitely recommend to anyone looking for quality work.",
  },
  {
    _id: "2",
    reviewerId: {
      _id: "user2",
      name: "Sam Rivera",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    targetId: "event1",
    targetType: "event",
    rating: 5,
    comment:
      "This event exceeded all my expectations. The organization was flawless and the content was incredibly valuable. Looking forward to the next one!",
  },
  {
    _id: "3",
    reviewerId: {
      _id: "user3",
      name: "Taylor Kim",
    },
    targetId: "service2",
    targetType: "service",
    rating: 3.5,
    comment:
      "Good service overall, but there's definitely room for improvement. Communication could have been better, but the end result was satisfactory.",
  },
  {
    _id: "4",
    reviewerId: {
      _id: "user4",
      name: "Jordan Smith",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    targetId: "event2",
    targetType: "event",
    rating: 4,
    comment:
      "Great event with lots of networking opportunities. The speakers were knowledgeable and engaging. The venue could have been better though.",
  },
  {
    _id: "5",
    reviewerId: {
      _id: "user5",
      name: "Casey Morgan",
    },
    targetId: "service3",
    targetType: "service",
    rating: 5,
    comment:
      "Exceptional service from start to finish. The team went above and beyond to meet my requirements. I'll definitely be a returning customer!",
  },
  {
    _id: "6",
    reviewerId: {
      _id: "user6",
      name: "Riley Patel",
      profileImage: "/placeholder.svg?height=200&width=200",
    },
    targetId: "event3",
    targetType: "event",
    rating: 4.5,
    comment:
      "One of the best organized events I've attended. The content was relevant and the interactive sessions were particularly helpful.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-white mb-12">Our Customer Feedback</h1>
        <UserReviews reviews={sampleReviews} />
      </div>
    </main>
  )
}
