import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useFindWorkSamples } from '@/hooks/VendorCustomHooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Pagination from '@/components/other components/Pagination';
import { Pencil } from 'lucide-react';
import { Sparkles } from "lucide-react"; // optional icon

interface WorkSample {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export default function VendorWorkSamples() {
  const [selectedSample, setSelectedSample] = useState<WorkSample | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const findWorkSamples = useFindWorkSamples(vendorId!, currentPage)
  const workSamples = findWorkSamples.data?.workSamples
  const totalPages = findWorkSamples.data?.totalPages
  const handleSampleClick = (sample: WorkSample) => {
    setSelectedSample(sample);
    setCurrentImageIndex(0);
  };

  const closeDetails = () => {
    setSelectedSample(null);
  };

  const nextImage = () => {
    if (selectedSample) {
      setCurrentImageIndex((prev) =>
        prev === selectedSample.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedSample) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedSample.images.length - 1 : prev - 1
      );
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const backgroundColors = [
    'bg-violet-100', 'bg-cyan-100', 'bg-amber-100', 'bg-rose-100',
    'bg-emerald-100', 'bg-indigo-100', 'bg-fuchsia-100', 'bg-teal-100'
  ];

  const borderColors = [
    'border-violet-400', 'border-cyan-400', 'border-amber-400', 'border-rose-400',
    'border-emerald-400', 'border-indigo-400', 'border-fuchsia-400', 'border-teal-400'
  ];

  const textColors = [
    'text-violet-800', 'text-cyan-800', 'text-amber-800', 'text-rose-800',
    'text-emerald-800', 'text-indigo-800', 'text-fuchsia-800', 'text-teal-800'
  ];
  const navigate = useNavigate()

  const handleEdit = (e: React.MouseEvent, sampleId: string) => {
    e.stopPropagation(); // Prevent modal from opening
    navigate(`/vendor/editWorkSample/${sampleId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Vendor Work Samples
        </span>
        <Button className='flex' onClick={() => navigate('/vendor/addWorkSamples')}>ADD WORK SAMPLES</Button>
      </h1>

      {/* Grid of samples */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workSamples?.map((sample: WorkSample, index: number) => (
          <motion.div
            key={sample.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            className={`cursor-pointer rounded-xl p-6 border-2 ${backgroundColors[index % backgroundColors.length]
              } ${borderColors[index % borderColors.length]} shadow-md relative`}
            onClick={() => handleSampleClick(sample)}
          >
            <motion.button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleEdit(e, sample.id)}
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </motion.button>
            <div className="h-48 overflow-hidden rounded-lg mb-4">
              <motion.img
                src={sample.images[0]}
                alt={sample.images[0] || sample.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <h2 className={`text-xl font-bold mb-2 ${textColors[index % textColors.length]}`}>
              {sample.title}
            </h2>
            <p className="text-gray-600 line-clamp-2">{sample.description}</p>
            <motion.button
              className={`mt-4 px-4 py-2 rounded-full ${borderColors[index % borderColors.length]
                } text-white bg-gradient-to-r from-purple-500 to-pink-500 font-medium text-sm`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Modal for detailed view */}
      <AnimatePresence>
        {selectedSample && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetails}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-4xl max-h-screen overflow-auto p-6"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{selectedSample.title}</h2>
                <div className="flex items-center gap-4">
                  <motion.button
                    className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleEdit(e, selectedSample.id)}
                  >
                    <Pencil className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-full bg-gray-100 text-gray-600"
                    whileHover={{ scale: 1.1, backgroundColor: "#f87171", color: "#ffffff" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeDetails}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Image carousel */}
              <div className="relative mb-6">
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedSample.images[currentImageIndex] || "/api/placeholder/800/450"}
                      alt={selectedSample.images[currentImageIndex] || selectedSample.title}
                      className="w-full h-[50vh] object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                </div>

                {selectedSample.images.length > 1 && (
                  <>
                    <motion.button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md"
                      whileHover={{ scale: 1.1, backgroundColor: "#ffffff" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevImage}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                    <motion.button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md"
                      whileHover={{ scale: 1.1, backgroundColor: "#ffffff" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextImage}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>

                    {/* Image dots indicator */}
                    <div className="flex justify-center space-x-2 mt-4">
                      {selectedSample.images?.map((_, index) => (
                        <motion.button
                          key={index}
                          className={`w-3 h-3 rounded-full ${index === currentImageIndex ? "bg-purple-600" : "bg-gray-300"
                            }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Description</h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-gray-600">{selectedSample.description}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {workSamples?.length > 0 ? <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} /> : <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center p-6  bg-white dark:bg-gray-900"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4"
        >
          <Sparkles className="text-indigo-600 dark:text-indigo-300 h-10 w-10" />
        </motion.div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No Work Samples Yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
          You haven't uploaded any work samples. Add some to showcase your services and attract more clients!
        </p>

        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          onClick={() => {
            // trigger upload action
          }}
        >
          Add Work Sample
        </motion.button> */}
      </motion.div>}
    </div>
  );
}

