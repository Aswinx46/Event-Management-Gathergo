import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Award, Info, FileText } from 'lucide-react';

interface ServiceCardProps {
  serviceTitle: string;
  yearsOfExperience: number;
  serviceDescription: string;
  cancellationPolicy: string;
  termsAndCondition: string;
  serviceDuration: string;
  servicePrice: number;
  additionalHourFee: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  serviceTitle,
  yearsOfExperience,
  serviceDescription,
  cancellationPolicy,
  termsAndCondition,
  serviceDuration,
  servicePrice,
  additionalHourFee,
}) => {
  return (
    <motion.div
      className="h-full flex flex-col bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
    >
      <div className="relative flex-1 flex flex-col">
        {/* Price Tag */}
        <motion.div
          className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-full font-bold flex items-center shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <DollarSign size={18} className="mr-1" />
          <span>${servicePrice}</span>
        </motion.div>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <motion.h3 
            className="text-2xl font-bold text-white mb-2 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {serviceTitle}
          </motion.h3>
          
          <motion.div 
            className="flex items-center text-sm text-gray-300 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Award size={16} className="mr-2 text-gray-300 flex-shrink-0" />
            <span>{yearsOfExperience} years of experience</span>
          </motion.div>
          
          <motion.p 
            className="text-gray-400 leading-relaxed line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {serviceDescription}
          </motion.p>
        </div>
        
        {/* Details */}
        <div className="p-6 bg-gray-900 flex-1">
          <motion.div 
            className="flex items-center mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Clock size={18} className="mr-3 text-gray-300 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-100">Duration</p>
              <p className="text-sm text-gray-400">{serviceDuration}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <DollarSign size={18} className="mr-3 text-gray-300 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-100">Additional Hour Fee</p>
              <p className="text-sm text-gray-400">${additionalHourFee}/hour</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Info size={18} className="mr-3 text-gray-300 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-gray-100">Cancellation Policy</p>
              <p className="text-sm text-gray-400 line-clamp-2">{cancellationPolicy}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <FileText size={18} className="mr-3 text-gray-300 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-gray-100">Terms & Conditions</p>
              <p className="text-sm text-gray-400 line-clamp-2">{termsAndCondition}</p>
            </div>
          </motion.div>
        </div>
        
        {/* CTA Button */}
        <motion.div 
          className="p-6 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button 
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center hover:from-indigo-600 hover:to-blue-500 shadow-lg hover:shadow-blue-500/30"
          >
            Book Now
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
