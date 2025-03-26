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
import { addToken } from "@/store/slices/user/userTokenSlice"
import ImageCarousel from "@/components/other components/ImageCarousal"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from 'yup'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import { useClientGoogleLoginMutation, useClientLoginMutation } from "@/hooks/ClientCustomHooks"
export default function LoginComponent() {

    const initialValues = {
        email: '',
        password: ''
    }
    type login = {
        email: string;
        password: string
    }

    type GoogleAuth = {
        email: string;
        googleVerified: boolean;
        name: string;
        picture: string;
    }
    type Client = {
        email: string;
        googleVerified: boolean;
        name: string;
        profileImage: string
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

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginMutation = useClientLoginMutation()

    const handleLogin = async (values: login) => {
        try {
            const { email, password } = values
            loginMutation.mutate({ email, password }, {
                onSuccess: () => {
                    console.log('user logged')
                    toast.success('user logged')
                    navigate('/', { replace: true })
                },
                onError: (error) => {
                    if (isAxiosError(error)) {
                        console.log(error)
                        toast.error(error.response?.data?.error || "An error occurred");
                    }
                },
                onSettled: (data) => {
                    console.log(data?.data.accessToken)
                    dispatch(addToken(data?.data.accessToken))
                }

            })
        } catch (error) {
            console.log(error)
        }

    }


    const googleLoginMutation = useClientGoogleLoginMutation()

    const googleAuthenticate = (credentialResponse: CredentialResponse) => {
        try {
            console.log('cliecled')
            if (credentialResponse.credential) {
                const credential: GoogleAuth = jwtDecode(credentialResponse.credential)
                console.log(credential)
                const client: Client = {
                    email: credential.email,
                    name: credential.name,
                    googleVerified: true,
                    profileImage: credential.picture
                }
                googleLoginMutation.mutate(client, {
                    onSuccess: () => {
                        toast.success('Login SuccessFull')
                        navigate('/', { replace: true })
                    },
                    onError: () => {
                        toast.success('Login SuccessFull')
                        navigate('/', { replace: true })
                    }
                })
            }
        } catch (error) {
            console.log('error while google login', error)

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
                    <Formik initialValues={initialValues} onSubmit={handleLogin} validationSchema={validationSchema}>
                        {({ isSubmitting }) => (
                            <Form>

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
                                        <Field as={Input}
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
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
                                        <Field as={Input}
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
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
                                        {/* <div className="text-sm">
                                            <Link to="#" className="font-medium text-primary hover:text-primary/80">
                                                Forgot password?
                                            </Link>
                                        </div> */}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.5 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button className="w-full py-6 bg-[#0f172a] hover:bg-[#1e293b] text-white" size="lg">
                                            {loginMutation.isPending ? "Logging in..." : "Sign In"}
                                        </Button>
                                    </motion.div>
                                    <div >
                                        <GoogleLogin onSuccess={googleAuthenticate} onError={() => console.log('login failed')}></GoogleLogin>

                                    </div>
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
                            </Form>
                        )}
                    </Formik>
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
            <ImageCarousel />
        </div>
    )
}

