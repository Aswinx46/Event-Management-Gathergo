import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Mail } from 'lucide-react';
import { Button } from '../ui/button';

interface VendorPendingModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function VendorPendingModal({ isOpen, setIsOpen }: VendorPendingModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed left-1/2 top-1/2 z-50 max-w-md w-full bg-white rounded-xl shadow-lg"
                        initial={{ scale: 0.9, opacity: 0, x: '-50%', y: '-50%' }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Content */}
                        <div className="p-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 200,
                                        damping: 15,
                                        delay: 0.2
                                    }}
                                    className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4"
                                >
                                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                                </motion.div>

                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl font-bold text-gray-900 mb-2"
                                >
                                    Account Pending Verification
                                </motion.h2>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 mb-6"
                                >
                                    Your account is currently under review by our admin team. You can check the status by logging into your account.
                                </motion.p>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-gray-50 p-4 rounded-lg mb-6 w-full"
                                >
                                    <div className="flex items-center text-gray-700">
                                        <Mail className="w-5 h-5 mr-2" />
                                        <span>admin@gmail.com</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Contact us if you have any questions
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex gap-4"
                                >
                                    <Button
                                        onClick={() => setIsOpen(false)}
                                        className="bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                                    >
                                        Got it
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
