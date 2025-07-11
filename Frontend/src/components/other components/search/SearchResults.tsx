import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudinaryPreset } from '@/utils/cloudinaryPresetFile';

export interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  image?: string;
  active?: boolean;
}

interface SearchResultsProps {
  results: SearchResult[];
  searchQuery: string;
  isLoading?: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  searchQuery,
  isLoading = false
}) => {
  const shouldShowResults = searchQuery.length > 0;

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  if (!shouldShowResults) return null;

  return (
    <AnimatePresence>
      {shouldShowResults && (
        <motion.div
          className="w-full max-w-5xl mx-auto mt-12 bg-transparent text-white px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  variants={itemVariants}
                  className="relative rounded-md overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={CloudinaryPreset + result.image || "https://via.placeholder.com/300x200"}
                      alt={result.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Status Badge */}
                    {result.active && (
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
                        active
                      </div>
                    )}

                    {/* Block Button */}
                    <button className="absolute bottom-2 right-2 px-3 py-1 bg-black text-white text-xs rounded-full hover:bg-gray-800">
                      Block
                    </button>
                  </div>

                  <div className="mt-2 px-1">
                    <h3 className="text-sm font-medium truncate">{result.title}</h3>
                    {result.description && (
                      <p className="text-gray-400 text-xs mt-0.5 truncate">{result.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="p-4 text-center text-gray-400"
              variants={itemVariants}
            >
              No results found for "{searchQuery}"
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResults;
