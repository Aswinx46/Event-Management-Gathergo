

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UseMutationResult } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { error } from "console"
interface OTPModalProps {
    isOpen: boolean
    onClose?: () => void
    onVerify?: (otp: string) => void
    data: Record<string, any>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    mutation: UseMutationResult<any, unknown, { formdata: Record<string, any>; otpString: string }, unknown>;
    resendOtp: UseMutationResult<AxiosResponse<any>, unknown, string, unknown>;
    email: string
    handleError:(error:unknown)=>void
    handleSuccess:()=>void
}

export default function OTPModal({ isOpen, data, setIsOpen, mutation,handleSuccess,handleError, resendOtp, email }: OTPModalProps) {

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const [timeLeft, setTimeLeft] = useState<number>(300)

    useEffect(() => {
        if (!isOpen) return;
        if (timeLeft <= 0) setTimeLeft(300)
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [timeLeft, isOpen])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }




    const handleChange = (index: number, value: string) => {
        if (value && !/^\d+$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-input-${index + 1}`)
            nextInput?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`)
            prevInput?.focus()
        }
    }


    const handleClose = () => {
        setIsOpen(!isOpen)
        setOtp(Array(6).fill(""))
    }

    const handleVerify = () => {
        const otpString = otp.join("")
        if (otpString.length === 6) {
            mutation.mutate({ formdata: data, otpString },{
                onSuccess:()=>{
                    handleSuccess()
                },
                onError:(error)=>{
                    handleError(error)
                }
            })
        }
    }
    const handleResendOtp = () => {
        resendOtp.mutate(email)
        setTimeLeft(300)
    }
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <motion.div
                        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            onClick={handleClose}
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6 text-center">
                            <motion.h2
                                className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                Verification Code
                            </motion.h2>
                            <motion.p
                                className="text-gray-600 dark:text-gray-300"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                We've sent a code to your phone. Please enter it below.
                            </motion.p>
                        </div>

                        <motion.div
                            className="mb-6 flex justify-center space-x-2"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {otp.map((digit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Input
                                        id={`otp-input-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="h-14 w-12 text-center text-xl font-bold"
                                        autoFocus={index === 0}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="mb-4 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            {timeLeft < 240 && <p className="text-sm text-gray-500 dark:text-gray-400">
                                Didn't receive the code? <button onClick={handleResendOtp} className="text-primary hover:underline">Resend</button>
                            </p>}

                            <p className="text-red-600">  Time Left: {formatTime(timeLeft)}</p>
                        </motion.div>

                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                            <Button className="w-full" onClick={handleVerify} disabled={otp.join("").length !== 6 || timeLeft <= 0}>
                                Verify
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

