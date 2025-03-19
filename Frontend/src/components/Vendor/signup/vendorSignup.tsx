
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as yup from 'yup'
import cloudAxios, { isAxiosError } from 'axios'
import ImageCarousel from "@/components/other components/ImageCarousal"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from '../../../axios/vendorAxios'
import { toast } from "react-toastify"
import OTPModal from "@/components/otpModal/otpModal"
import ImageCropper from "@/components/other components/ImageCropper"
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
    const [otp, setOtp] = useState<string>('')
    const navigate = useNavigate()
    const [data, setData] = useState<VendorData>(initialValuesOfVendor)
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [showCropper, setShowCropper] = useState<boolean>(false);
    const [croppedImage, setCroppedImage] = useState<File | null>(null);
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
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyrx8qjpt/image/upload";

    const mutation = useMutation({
        mutationFn: async (value: FormValues) => {
            const fileToUpload = croppedImage || value.document;
            if (!fileToUpload) throw new Error("No file selected");
            if (!value.document) throw new Error("No file selected");
            const formdata = new FormData()
            formdata.append('file', fileToUpload)
            formdata.append('upload_preset', 'vendor_id')
            try {
                const response = await cloudAxios.post(CLOUDINARY_URL, formdata);
                const documentUrl = response.data.secure_url
                console.log('this is the documenturl', documentUrl)
                const vendor: VendorData = {
                    name: value.name,
                    email: value.email,
                    idProof: documentUrl,
                    password: value.password,
                    phone: value.phone,
                    confirmPassword: value.confirmPassword
                }
                setData(vendor)
                console.log(vendor)
                const uploadToBackend = await axios.post('/signup', vendor)
                return uploadToBackend.data
            } catch (error) {
                if (isAxiosError(error)) {
                    console.log(error)
                    toast.error(error?.response?.data.error)
                }
            }
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                console.log(error)
            }
            // toast.error(error.message)
        },
        onSuccess: (data, variables, context) => {
            toast.success(data.message)
            console.log(data)
            setIsOpen(true)
        },
    })

    const verifyOtpMutation = useMutation({
        mutationFn: async ({ formdata, otpString }: { formdata: Record<string, any>; otpString: string }) => {
            try {
                return await axios.post('/verify', { formdata, enteredOtp: otpString })
            } catch (error) {
                console.log('error while posting data to the backend for creating account', error)
                if (error instanceof Error) {
                    throw new Error('data uploading to backend for creating vendor failed' + error.message)
                } else {
                    throw new Error("vendor creation failed")
                }
            }
        },
        onSuccess: () => {
            setIsOpen(false)
        },
        onError: (error: unknown) => {
            console.log(error)
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.error)
            } else {
                toast.error('error while registering vendor')
            }
            // toast.error(error.response.data.error)
        },

    })



    const validationSchema = yup.object().shape({
        name: yup.string().required("Full name is required").min(3, 'name should be more that 3 characters').max(8, 'name should be less that 8 characters'),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phone: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
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

    const resendOtpMutation = useMutation({
        mutationFn: async (email: string) => {
            try {
                return await axios.post('/resendOtp', email)
            } catch (error) {
                console.log('error while resending otp', error)
                if (error instanceof Error) {
                    throw new Error('error while sending otp' + error.message)
                } else {
                    throw new Error('errow while sending otp')
                }
            }
        }
    })

    const handleSubmit = (values: FormValues) => {
        values.document = croppedImage
        console.log(values, 'asdfhj')
        mutation.mutate(values)
    }
    return (
        <div className=" min-h-screen flex flex-col md:flex-row justify-center">
            <ImageCarousel />
            {/* Right side - Signup Form */}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
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
                                            {/* <Button variant="outline" className="w-full">
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload Document
                                            </Button> */}
                                            {/* <Field name='document' as={Input} type='file' placeholder='upload your id proof'></Field> */}
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

                                <Button className="w-full mt-4 bg-gray-900 text-white hover:bg-gray-800">Sign Up</Button>
                            </div>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link to="/vendorLogin" className="font-medium text-blue-600 hover:text-blue-500">
                                    Sign in
                                </Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            {showCropper && <ImageCropper image={selectedImage} onCropComplete={setCroppedImage} showCropper={setShowCropper} />}
            <OTPModal isOpen={isOpen} data={data} setIsOpen={setIsOpen} mutation={verifyOtpMutation} resendOtp={resendOtpMutation} email={data.email}></OTPModal>
        </div>
    )
}

