import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, DollarSign, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface OvertimeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: OvertimeRequest) => void;
    overTimeRate: number
    currentAmount: number
}

export interface OvertimeRequest {
    hours: number;
    hourlyRate: number;
    totalAmount: number;
}

const OvertimeModal: React.FC<OvertimeModalProps> = ({ isOpen, onClose, onSubmit, overTimeRate, currentAmount }) => {
    const [hours, setHours] = useState<string>('');
    const [totalAmount, setTotalAmount] = useState<number>(currentAmount)
    const [addedOverRateAmount, setAddedOverRateAmount] = useState<number>(0)
    // const totalAmount = (parseFloat(hours) || 0) * (parseFloat(overTimeRate) || 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!hours || parseFloat(hours) <= 0) {
            return;
        }

        const data: OvertimeRequest = {
            hours: parseFloat(hours),
            hourlyRate: overTimeRate,
            totalAmount: (+hours * overTimeRate) + currentAmount
        };

        onSubmit(data);
        handleClose();
    };

    const handleClose = () => {
        setHours('');
        setTotalAmount(0)
        onClose();
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    };

    const handleChangeOverTimeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHours(e.target.value)
        setAddedOverRateAmount(+e.target.value * overTimeRate)

    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-full">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Overtime Payment</h2>
                                        <p className="text-blue-100 text-sm">Calculate your overtime pay</p>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={handleClose}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Content */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Hours Input */}
                            <motion.div
                                className="space-y-2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Label htmlFor="hours" className="text-sm font-medium text-gray-700">
                                    Total Overtime Hours
                                </Label>
                                <Input
                                    id="hours"
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    placeholder="Enter hours (e.g., 8.0)"
                                    value={hours}
                                    onChange={(e) => handleChangeOverTimeRate(e)}
                                    className="border-gray-300 focus:border-blue-500 text-black focus:ring-blue-500 text-lg"
                                />
                            </motion.div>

                            {/* Hourly Rate */}
                            <motion.div
                                className="space-y-2 "
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h1 className="text-black   font-semibold  px-4 py-3 rounded-lg shadow-md border border-gray-700">
                                    {`Overtime Rate fixed while creating service ₹${overTimeRate}`}
                                </h1>
                            </motion.div>

                            {/* Total Amount Display */}
                            <motion.div
                                className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >

                                <div className="flex items-center gap-2 mb-2">
                                    <Calculator className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">OverTime Amount:</span>
                                </div>
                                <motion.div
                                    className="text-3xl font-bold text-green-600 flex items-center gap-2"
               
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <DollarSign className="w-8 h-8" />
                                    {addedOverRateAmount.toFixed(2)}
                                </motion.div>

                                <div className="flex items-center gap-2 mb-2">
                                    <Calculator className="w-5 h-5 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">Total Amount:</span>
                                </div>
                                <motion.div
                                    className="text-3xl font-bold text-green-600 flex items-center gap-2"
                                    key={totalAmount}
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <DollarSign className="w-8 h-8" />
                                    {(totalAmount + addedOverRateAmount).toFixed(2)}
                                </motion.div>


                            </motion.div>

                            {/* Confirm Button */}
                            <motion.div
                                className="pt-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg py-3 text-lg"
                                        disabled={!hours || parseFloat(hours) <= 0}
                                    >
                                        Add Overtime Rate
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OvertimeModal;