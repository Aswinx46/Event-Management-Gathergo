
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"
import { Link } from "react-router-dom"
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as yup from 'yup'
import { isAxiosError } from 'axios'

import { useState, lazy, Suspense } from "react"
import { toast } from "react-toastify"
import OTPModal from "@/components/otpModal/otpModal"
import ImageCropper from "@/components/other components/ImageCropper"
import { useUploadeImageToCloudinaryMutation, useVendorSignupMutation, useVendorResendOtpMutation, useVendorVerifyOtpMutation } from "@/hooks/VendorCustomHooks"
import VendorPendingModal from "@/components/other components/VendorPendingShowingSignup"
export default function SignupPage() {
    const initialValues = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        document: null as File | null
    }
    const initialValuesOfVendor = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        idProof: ""
    }
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [data, setData] = useState<VendorData>(initialValuesOfVendor)
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [showCropper, setShowCropper] = useState<boolean>(false);
    const [croppedImage, setCroppedImage] = useState<File | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    interface FormValues {
        name: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        document: File | null;
    }
    interface VendorData {
        name: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        idProof: string;
    }
    const verifyOtpMutation = useVendorVerifyOtpMutation()
    const resendOtpMutation = useVendorResendOtpMutation()
    const uploadImageCloudinaryAPI = useUploadeImageToCloudinaryMutation()
    const vendorSignupAPI = useVendorSignupMutation()


    const validationSchema = yup.object().shape({
        name: yup.string().required("Full name is required").min(3, 'name should be more that 3 characters').max(15, 'name should be less that 15 characters'),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phone: yup
            .string()
            .transform((value) => (value ? value.trim() : undefined))
            .matches(/^[6789]\d{9}$/, "Phone number must start with 6, 7, 8, or 9 and be 10 digits long")
            .test("not-all-same", "Phone number cannot contain all identical digits", (value) => {
                if (!value) return true;
                return !/^(\d)\1{9}$/.test(value);
            }),
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
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
    });


    const handleSuccess = () => {
        setIsOpen(false)
        toast.success('Account created')
        setIsSuccess(true)

    }

    const handleError = (error: unknown) => {
        console.log(error)
        if (error instanceof Error) {
            toast.error(error.message)
        }
    }



    const handleSubmit = async (values: FormValues) => {
        const fileToUpload = croppedImage;
        if (!fileToUpload) {
            toast.error('Please select a ID Proof')
            throw new Error("No file selected");
        }
        const formdata = new FormData()
        formdata.append('file', fileToUpload)
        formdata.append('upload_preset', 'vendor_id')
        try {
            const response = await uploadImageCloudinaryAPI.mutateAsync(formdata)
            const documentUrl = response.secure_url.split('upload/')[1]
            const vendor: VendorData = {
                name: values.name,
                email: values.email,
                idProof: documentUrl,
                password: values.password,
                phone: values.phone,
                confirmPassword: values.confirmPassword
            }
            setData(vendor)

            // await vendorSignupAPI.mutateAsync(vendor)
            vendorSignupAPI.mutate(vendor, {
                onSuccess: () => {
                    setIsOpen(true)
                },
                onError: (error) => {
                    toast.error(error.message)
                }
            })
            return vendorSignupAPI.data
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error)
                toast.error(error?.response?.data.error)
            }
        }
    }
    const LazyImageCarousel = lazy(() => import('../../other components/ImageCarousal'))
    return (
        <div className=" min-h-screen flex flex-col lg:flex-row justify-center">
            {/* <Suspense fallback={<div className="text-white text-center mt-10">Loading ......</div>}>
                <LazyImageCarousel/>
            </Suspense> */}
            {/* <div className="min-h-screen flex flex-col lg:flex-row"> */}
            <div className="lg:w-1/2 md:h-screen h-[50vh] relative bg-gray-900">
                <Suspense fallback={<div className="w-full h-full flex items-center justify-center">
                    <div className="text-white">Loading carousel...</div>
                </div>}>
                    <div className="absolute inset-0">
                        <LazyImageCarousel />
                    </div>
                </Suspense>
            </div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {() => (
                    <Form className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
                        <div className="w-full max-w-md space-y-6">
                            <div className="space-y-2 text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">GatherGo</h1>
                                <p className="text-sm text-gray-500">Create an account to get started</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Field name="name" as={Input} placeholder="Enter your name" />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Field name="phone" as={Input} placeholder="Enter your phone" />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Field name="email" as={Input} type="email" placeholder="Enter your email" />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Field name="password" as={Input} type="password" placeholder="Create a password" />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Field name="confirmPassword" as={Input} type="password" placeholder="Confirm your password" />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="profileImage">Upload ID Proof</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                            <User className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <Field name="document">
                                                {() => (
                                                    <input
                                                        type="file"
                                                        accept="image/jpeg, image/png, application/pdf"
                                                        onChange={(event) => {
                                                            const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                                            // form.setFieldValue("document", file);
                                                            if (file) setSelectedImage(URL.createObjectURL(file))
                                                            setShowCropper(true)
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="document" component="div" className="text-red-500 text-sm" />
                                            <div className="h-30 w-50 ">
                                                {croppedImage && <img className="rounded-2xl" src={URL.createObjectURL(croppedImage)}></img>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full mt-4 bg-gray-900 text-white hover:bg-gray-800">{vendorSignupAPI.isPending ? 'Signing in....' : 'Sign up'}</Button>
                            </div>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/vendor/login" className="font-medium text-blue-600 hover:text-blue-500">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            {isSuccess && <VendorPendingModal isOpen={isSuccess} setIsOpen={setIsSuccess} />}
            {showCropper && <ImageCropper image={selectedImage} onCropComplete={setCroppedImage} showCropper={setShowCropper} />}
            <OTPModal isOpen={isOpen} data={data} setIsOpen={setIsOpen} mutation={verifyOtpMutation} resendOtp={resendOtpMutation} email={data.email} handleSuccess={handleSuccess} handleError={handleError}></OTPModal>
        </div>
    )
}

