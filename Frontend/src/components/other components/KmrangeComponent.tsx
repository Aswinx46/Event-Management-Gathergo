import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface KmRangeOption {
    value: number;
    label: string;
}

const kmRanges: KmRangeOption[] = [
    { value: 5, label: '0-5 km' },
    { value: 10, label: '0-10 km' },
    { value: 20, label: '0-20 km' },
    { value: 50, label: '0-50 km' },
    { value: 100, label: '0-100 km' },
];

interface KmRangeSelectProps {
    onSelect: (value: number) => void;
    value: number
}

const KmRangeSelect = ({ onSelect, value }: KmRangeSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedRange, setSelectedRange] = useState<KmRangeOption>(kmRanges[0]);
    const selectedRange = kmRanges.find(option => option.value === value) || kmRanges[0];

    const handleSelect = (option: KmRangeOption) => {

        // setSelectedRange(option);
        onSelect(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-[#221F26] border border-gray-800 rounded-xl shadow-lg flex items-center justify-between hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
                <span className="text-gray-300">{selectedRange.label}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mt-2 bg-[#221F26] border border-gray-800 rounded-xl shadow-xl backdrop-blur-sm"
                    >
                        {kmRanges.map((option) => (
                            <motion.button
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className="w-full px-4 py-3 text-left text-gray-300 hover:bg-[#2A2630] first:rounded-t-xl last:rounded-b-xl transition-colors duration-200"
                                whileHover={{ backgroundColor: '#2A2630' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {option.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KmRangeSelect;
