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
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <motion.h3 
            className="text-2xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {serviceTitle}
          </motion.h3>
          
          {/* Price Tag */}
          <motion.div
            className="bg-white text-black px-4 py-2 rounded-full font-bold inline-flex items-center shadow-lg mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            <DollarSign size={18} className="mr-1" />
            <span>${servicePrice}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center text-sm text-gray-300 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Award size={16} className="mr-2 text-gray-300 flex-shrink-0" />
            <span>{yearsOfExperience} years of experience</span>
          </motion.div>
          
          <motion.div 
            className="relative group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-400 leading-relaxed truncate">
              {serviceDescription}
            </p>
            <div className="absolute left-0 right-0 invisible opacity-0 bg-gray-800 p-4 rounded-lg shadow-xl z-20 group-hover:visible group-hover:opacity-100 transition-all duration-200 max-w-[300px]">
              <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {serviceDescription}
                </p>
              </div>
            </div>
          </motion.div>
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
            <div className="flex-1">
              <p className="font-medium text-gray-100">Cancellation Policy</p>
              <div className="relative group">
                <p className="text-sm text-gray-400 truncate">{cancellationPolicy}</p>
                <div className="absolute left-0 right-0 invisible opacity-0 bg-gray-800 p-4 rounded-lg shadow-xl z-20 group-hover:visible group-hover:opacity-100 transition-all duration-200 max-w-[300px]">
                  <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{cancellationPolicy}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <FileText size={18} className="mr-3 text-gray-300 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="font-medium text-gray-100">Terms & Conditions</p>
              <div className="relative group">
                <p className="text-sm text-gray-400 truncate">{termsAndCondition}</p>
                <div className="absolute left-0 right-0 invisible opacity-0 bg-gray-800 p-4 rounded-lg shadow-xl z-20 group-hover:visible group-hover:opacity-100 transition-all duration-200 max-w-[300px]">
                  <div className="max-h-[150px] overflow-y-auto custom-scrollbar">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{termsAndCondition}</p>
                  </div>
                </div>
              </div>
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
            className="w-full bg-gradient-to-r from-white to-black text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center hover:from-white hover:to-black shadow-lg hover:shadow-blue-500/30"
          >
            Book Now
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
