import React from "react";
import { motion } from "framer-motion";

interface FormHeaderProps {
  steps: { id: string; label: string }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <motion.div 
      className="mb-6 p-4 bg-white rounded-lg shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-purple-800">Event Creation</h2>
        <span className="text-sm text-gray-500">All fields marked with * are required</span>
      </div>
      
      <div className="flex justify-between mb-8">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                idx <= currentStep ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentStep(idx)}
            >
              {idx + 1}
            </motion.div>
            {idx < steps.length - 1 && (
              <div className={`h-1 w-16 md:w-24 ${idx < currentStep ? "bg-purple-600" : "bg-gray-200"}`}></div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FormHeader;