// ForgotPasswordModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (email: string) => void;
    isPending:boolean
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
    isOpen,
    setIsOpen,
    onSubmit,
    isPending
}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.2, ease: 'easeOut' }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.15, ease: 'easeIn' }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        setError('');
        onSubmit(email);
        setEmail('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md ">
                            <div className="bg-gradient-to-r from-black to-gray-700 rounded-t-lg p-6">
                                <h2 className="text-xl font-semibold text-white mb-2">
                                    Forgot Password
                                </h2>
                                <p className="text-gray-200 mb-4">
                                    Enter your registered email address to receive a OTP.
                                </p>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                                            placeholder="Enter your email"
                                            
                                        />
                                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-1 text-sm text-red-600"
                                            >
                                                {error}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                                        >
                                            { isPending ?"Sending OTP...." : "Send OTP"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default React.memo(ForgotPasswordModal);