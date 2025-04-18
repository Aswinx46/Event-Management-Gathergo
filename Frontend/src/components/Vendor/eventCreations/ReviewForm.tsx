
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { EventType } from "@/types/EventType";

interface ReviewFormProps {
  values: EventType;
  dates: Date[];
  startTime: string;
  endTime: string;
  posterImages: File[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  values,
  dates,
  posterImages,
  startTime,
  endTime,

}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-lg shadow-sm mb-8"
    >
      <motion.h3
        variants={itemVariants}
        className="text-xl font-semibold mb-6 text-purple-800"
      >
        Review Your Event
      </motion.h3>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium text-lg mb-4">Basic Information</h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Title:</span>
                <p className="font-medium">{values.title || "Not provided"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Category:</span>
                <p className="font-medium capitalize">{values.category || "Not selected"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Description:</span>
                <p className="text-sm">{values.description || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium text-lg mb-4">Schedule</h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Dates:</span>
                {dates.map((date, index) => (
                  <p key={index} className="font-medium">{format(date, "PPP")}</p>
                ))}
              </div>
              <div>
                <span className="text-sm text-gray-500">Time:</span>
                <p className="font-medium">{startTime} - {endTime}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Status:</span>
                <p className="font-medium capitalize">{values.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium text-lg mb-4">Location</h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Venue:</span>
                <p className="font-medium">{values.venueName || "Not provided"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Address:</span>
                <p className="font-medium">{values.address || "Not provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium text-lg mb-4">Tickets</h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Price:</span>
                <p className="font-medium">${values.pricePerTicket}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Total Tickets:</span>
                <p className="font-medium">{values.totalTicket}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Max Per User:</span>
                <p className="font-medium">{values.maxTicketsPerUser}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {posterImages?.length > 0 && (
        <motion.div variants={itemVariants} className="mt-6">
          <h4 className="font-medium text-lg mb-4">Event Images</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {posterImages?.map((image, index) => (
              <>
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Event poster ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              </>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default React.memo(ReviewForm);