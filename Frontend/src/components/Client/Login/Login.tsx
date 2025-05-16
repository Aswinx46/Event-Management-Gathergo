import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { addToken } from "@/store/slices/user/userTokenSlice"
import ImageCarousel from "@/components/other components/ImageCarousal"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from 'yup'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
import { CredentialResponse } from "@react-oauth/google";
import { useClientForgetPassword, useClientGoogleLoginMutation, useClientLoginMutation, useClientRequestOtpForgetPassword, useClientVerifyForgetPasswordOtp, useResendOtpClientMutation } from "@/hooks/ClientCustomHooks"
import ForgotPasswordModal from "@/components/other components/ForgetPasswordModal"
import OTPModal from "@/components/otpModal/otpModal"
import ResetPasswordModal from "@/components/other components/ChangePasswordOtp"
import { addClient } from "@/store/slices/user/userSlice"
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

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [otpModal, setOtpModal] = useState<boolean>(false)
    const [forgetPasswordEmail, setForgetPasswordEmail] = useState<string>('')
    const [changePasswordOpen, setChangePasswordOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginMutation = useClientLoginMutation()
    const getForgetPasswordOtp = useClientRequestOtpForgetPassword()
    const googleLoginMutation = useClientGoogleLoginMutation()
    const verifyForgetPasswordOtp = useClientVerifyForgetPasswordOtp()
    const forgetPassworMutation = useClientForgetPassword()
    const handleLogin = async (values: login) => {
        const { email, password } = values
        loginMutation.mutate({ email, password }, {
            onSuccess: (data) => {
                toast.success('user logged')
                localStorage.setItem('id', data.client._id)
                dispatch(addToken(data?.accessToken))
                dispatch(addClient(data?.client))
                navigate('/', { replace: true })
            },
            onError: (error) => {

                toast.error(error.message)
            }

        })
    }




    const googleAuthenticate = (credentialResponse: CredentialResponse) => {
        try {
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
                    onSuccess: (data) => {
                        console.log(data)
                        dispatch(addClient(data.client))
                        dispatch(addToken(data.accessToken))
                        localStorage.setItem('id', data.client._id)
                        toast.success('Login SuccessFull')
                        navigate('/', { replace: true })
                    },
                    onError: (err) => {
                        toast.error(err.message)
                    }
                })
            }
        } catch (error) {
            console.log('error while google login', error)

        }

    }

    const handleForgetPassword = (email: string) => {
        console.log(email)
        setForgetPasswordEmail(email)
        getForgetPasswordOtp.mutate(email, {
            onSuccess: () => {
                toast.success('OTP Sended')
                setIsOpen(false)
                setOtpModal(true)
            },
            onError: (err) => {
                toast.error(err.message)
            },

        })
    }

    const handleSuccess = () => {
        setOtpModal(false)
        setChangePasswordOpen(true)
    }
    const handleError = (error: unknown) => {
        if (error instanceof Error)
            toast.error(error.message);
    }

    const resendOtpMutation = useResendOtpClientMutation()
    return (
        <div className="flex min-h-screen flex-col-reverse md:flex-row w-full">
            {/* Form Section (Left Side) */}
            {changePasswordOpen && <ResetPasswordModal email={forgetPasswordEmail} isOpen={changePasswordOpen} setIsOpen={setChangePasswordOpen} mutation={forgetPassworMutation} />}
            {isOpen && <ForgotPasswordModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleForgetPassword} isPending={getForgetPasswordOtp.isPending} />}

            {otpModal && <OTPModal resendOtp={resendOtpMutation} isOpen={otpModal} email={forgetPasswordEmail} forgetPasswordMutation={verifyForgetPasswordOtp} handleSuccess={handleSuccess} handleError={handleError} setIsOpen={setOtpModal} />}
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
                        {() => (
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
                                        <div className="text-sm">
                                            <Button className="font-medium bg-transparent text-black hover:bg-gray-400" onClick={() => setIsOpen(true)}>
                                                Forgot password?
                                            </Button>
                                        </div>
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
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.4 }}
                                            className="mt-6 text-center"
                                        >
                                            <div className="h-px w-full max-w-[120px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-5" />

                                            <motion.p
                                                className="text-sm text-gray-500 mb-2"
                                                initial={{ y: 5 }}
                                                animate={{ y: 0 }}
                                                transition={{ delay: 0.1, duration: 0.3 }}
                                            >
                                                Are you a vendor?
                                            </motion.p>

                                            <motion.div whileHover={{ y: -1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                                                <Link
                                                    to="/vendor/login"
                                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                                >
                                                    Sign in here
                                                </Link>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </motion.div>
            <ImageCarousel />
        </div>
    )
}

