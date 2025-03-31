// ResetPasswordModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UseMutationResult } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface ResetPasswordModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    mutation: UseMutationResult<any, Error, {
        email: string;
        newPassword: string;
    }, unknown>
    email: string
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
    isOpen,
    setIsOpen,
    mutation,
    email
}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

        // Basic password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            setError('Password must be at least 8 characters long, include a number, a special character, and an uppercase letter');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        mutation.mutate({ email, newPassword }, {
            onSuccess: () => {
                setIsOpen(false)
                toast.success('Password Changed')
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })

        setError('');
        // onSubmit(newPassword);
        setNewPassword('');
        setConfirmPassword('');
        setIsOpen(false);
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
                        <div className="bg-white rounded-lg shadow-2xl w-full max-w-md border border-gray-300">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-t-lg p-6">
                                <h2 className="text-xl font-semibold text-white mb-2">
                                    Reset Password
                                </h2>
                                <p className="text-gray-200 mb-4">
                                    Enter your new password below.
                                </p>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="newPassword"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                                            placeholder="Enter new password"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                                            placeholder="Confirm new password"
                                            required
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
                                            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                                        >
                                            Save Password
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

export default React.memo(ResetPasswordModal);