import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

// This is a placeholder component for the map integration
// You'll replace this with your actual map component later
const LocationSection: React.FC = () => {
  return (
    <motion.div
      className="h-64 bg-gray-100 rounded-lg flex items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="text-center">
        <MapPin className="h-8 w-8 text-purple-500 mx-auto mb-2" />
        <h4 className="text-lg font-medium">Map Integration</h4>
        <p className="text-sm text-gray-500 max-w-md">
          Your map component will be placed here.
          <br />
          You'll be able to select the exact location for your event.
        </p>
      </div>
    </motion.div>
  );
};

export default LocationSection;