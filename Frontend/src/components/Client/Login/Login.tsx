import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { data, Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from '../../../axios/clientAxios'
import { isAxiosError } from "axios"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { addToken } from "@/store/slices/userTokenSlice"
import ImageCarousel from "@/components/other components/ImageCarousal"
export default function LoginComponent() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()
    
    const dispatch=useDispatch()

    const loginMutation = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            return await axios.post('/login', { email, password })
        },
        onSuccess: () => {
            console.log('user logged')
            toast.success('user logged')
            navigate('/')
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.error || "An error occurred");
            } else {
                toast.error("An unexpected error occurred");
            }
        },
        onSettled:(data)=>{
            console.log(data?.data.accessToken)
            dispatch(addToken(data?.data.accessToken))
        }

    })

    const handleLogin = async () => {
        try {
            const response = await loginMutation.mutateAsync({ email, password })
            console.log(response.data)
        } catch (error) {
            console.log(error)
            // if (isAxiosError(error)) {
            //     console.error("Login failed:", error.response?.data?.error || "An unknown error occurred");
            //     toast.error(error.response?.data?.error || "An error occurred");
            // } else {
            //     console.error("Unexpected error:", error);
            //     toast.error("An unexpected error occurred");
            // }
        }

    }

    return (
        <div className="flex min-h-screen flex-col-reverse md:flex-row w-full">
            {/* Form Section (Left Side) */}
            <motion.div
                className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="w-full max-w-md space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-900">GatherGo</h1>
                        <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <p className="text-xs text-red-500 hidden">Email is required</p>
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <p className="text-xs text-red-500 hidden">Password is required</p>
                        </motion.div>

                        <motion.div
                            className="flex items-center justify-between"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link to="#" className="font-medium text-primary hover:text-primary/80">
                                    Forgot password?
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button onClick={handleLogin} className="w-full py-6 bg-[#0f172a] hover:bg-[#1e293b] text-white" size="lg">
                                {loginMutation.isPending ? "Logging in..." : "Sign In"}
                            </Button>
                        </motion.div>

                        <motion.div
                            className="mt-6 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link to="/signup" className="font-medium text-primary hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Image Section (Right Side) */}
            {/* <motion.div
                className="md:w-1/2 relative overflow-hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
            >
                <img
                    src="/concertt.jpg"
                    alt="Concert event with crowd"
                    className="object-cover md:h-full"
                />



            </motion.div> */}
            <ImageCarousel/>
        </div>
    )
}

