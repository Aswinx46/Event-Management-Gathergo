import { useState } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import ImageCarousel from "@/components/other components/ImageCarousal"
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useMutation } from "@tanstack/react-query"
import axios from '../../../axios/vendorAxios'
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import { useDispatch } from "react-redux"
import { addVendorToken } from "@/store/slices/vendor/vendorTokenSlice"
import { addVendor } from "@/store/slices/vendor/vendorSlice"
export default function VendorLogin() {

    const initialValues = {
        email: '',
        password: ''
    }

    type value = {
        email: string;
        password: string
    }
    const [rememberMe, setRememberMe] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginMutation = useMutation({
        mutationFn: async ({ email, password }: value) => {
            return await axios.post('/login', { email, password })
        },
        onSuccess: (data) => {
            localStorage.setItem('vendorId', data.data.vendor._id)
            dispatch(addVendorToken(data.data.accessToken))
            dispatch(addVendor(data.data.vendor))
            navigate('/vendor/home')

        },
        onError: (error: Error) => {
            if (isAxiosError(error)) {
                toast.error(error?.response?.data.error)
            } else {
                toast.error('error while login vendor')
            }
        }
    })

    const handleSubmit = (values: value) => {
        loginMutation.mutate(values)
    }

    const validationSchema = yup.object().shape(({
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup
            .string()
            .test(
                "no-star-only",
                "Password cannot be just '*'",
                (value) => value !== "*"
            )
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
            )
            .required("Password is required"),
    }))

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {() => (
                <Form>

                    <div className="flex h-screen w-full overflow-hidden">
                        {/* Left side - Login Form */}
                        <motion.div
                            className="w-1/2 lg:w-1/2 flex items-center justify-center "
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-full max-w-md space-y-8">
                                <motion.div
                                    className="text-center"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">GatherGo</h1>
                                    <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
                                </motion.div>

                                <motion.div
                                    className="mt-8 space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="email" className="block text-sm font-medium">
                                                Email
                                            </Label>
                                            <motion.div whileTap={{ scale: 0.99 }} className="mt-1">
                                                <Field as={Input}
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="Enter your email"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                            </motion.div>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password" className="block text-sm font-medium">
                                                    Password
                                                </Label>
                                            </div>
                                            <motion.div whileTap={{ scale: 0.99 }} className="mt-1">
                                                <Field as={Input}
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    placeholder="Enter your password"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                            </motion.div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <Checkbox
                                                    id="remember-me"
                                                    checked={rememberMe}
                                                    onCheckedChange={(checked: boolean) => setRememberMe(checked === true)}
                                                    className="h-4 w-4 rounded border-gray-300 text-primary"
                                                />
                                                <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                                                    Remember me
                                                </Label>
                                            </div>
                                            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                <Link to="#" className="text-sm font-medium text-primary hover:text-primary/90">
                                                    Forgot password?
                                                </Link>
                                            </motion.div> */}
                                        </div>
                                    </div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <button
                                            className="group relative flex w-full justify-center rounded-md bg-[#0a1629] px-3 py-3 text-sm font-semibold text-white hover:bg-[#152238] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            Sign In
                                        </button>
                                    </motion.div>

                                    <div className="text-center text-sm">
                                        <span className="text-gray-600">Don&apos;t have an account?</span>{" "}
                                        <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                                            <Link to="/vendor/signup" className="font-medium text-primary hover:text-primary/90">
                                                Sign up
                                            </Link>
                                        </motion.span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                        <ImageCarousel />
                    </div>
                </Form>
            )}
        </Formik>
    )
}

