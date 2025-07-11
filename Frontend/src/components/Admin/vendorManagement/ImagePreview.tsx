import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { OldCloudinaryPreset } from '@/utils/cloudinaryPresetFile';

interface ImagePreviewProps {
  url: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ url, setIsOpen }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setIsOpen(false)} // Click outside to close
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <FaTimes size={20} />
        </button>

        {/* Image */}
        <img
          src={OldCloudinaryPreset + url}
          alt="Preview"
          className="w-full max-h-[80vh] object-contain rounded-lg shadow-md"
        />
      </motion.div>
    </div>
  );
};

export default ImagePreview;
