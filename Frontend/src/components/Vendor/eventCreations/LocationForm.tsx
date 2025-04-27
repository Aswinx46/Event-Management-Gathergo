
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import LocationSection from "./LocationSection";
import { EventType } from "@/types/EventType";

interface LocationFormProps {
  values: EventType;
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

const LocationForm: React.FC<LocationFormProps> = ({ values }) => {
  console.log('this is the values in the location form',values)
  const [latitude, setLatitude] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0)
  values.location.coordinates[0] = longitude
  values.location.coordinates[1] = latitude
  // console.log(values)
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
        Event Location
      </motion.h3>

      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="venueName" className="block text-sm font-medium mb-1">
          Venue Name
        </Label>
        <Field
          as={Input}
          id="venueName"
          name="venueName"
          placeholder="e.g. City Convention Center"
          className="w-full"
        />
        <ErrorMessage name="venueName" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="address" className="block text-sm font-medium mb-1">
          Address
        </Label>
        <Field
          as={Input}
          id="address"
          name="address"
          placeholder="Full address of the venue"
          className="w-full"
        />
        <ErrorMessage name="address" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mb-6 border border-dashed border-gray-300 rounded-lg p-4"
      >
        <div className="flex items-center mb-4">
          <MapPin className="text-purple-600 mr-2" />
          <h4 className="text-lg font-medium">Map Location</h4>
        </div>

        <LocationSection setLatitude={setLatitude} setLongitude={setLongitude} />

        <p className="text-sm text-gray-500 mt-2">
          Your map component will be integrated here. Select the exact location for your event.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(LocationForm);