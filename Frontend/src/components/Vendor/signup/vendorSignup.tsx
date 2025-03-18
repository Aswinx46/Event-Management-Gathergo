
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"
import { Link } from "react-router-dom"
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as yup from 'yup'
import cloudAxios from 'axios'
import ImageCarousel from "@/components/other components/ImageCarousal"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from '../../../axios/vendorAxios'
import { error } from "console"
import { toast } from "react-toastify"
export default function SignupPage() {
    const [imageUrl, setImageUrl] = useState<string>('')
    const initialValues = {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        document: null
    }
    interface FormValues {
        name: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
        document: File | null;
    }

    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dyrx8qjpt/image/upload";

    const mutation = useMutation({
        mutationFn: async (value: FormValues) => {
            if (!value.document) throw new Error("No file selected");
            const formdata = new FormData()
            formdata.append('file', value.document)
            formdata.append('upload_preset', 'vendor_id')
            try {
                const response = await cloudAxios.post(CLOUDINARY_URL, formdata);
                const documentUrl = response.data.secure_url
                const vendor: FormValues = {
                    name: value.name,
                    email: value.email,
                    document: documentUrl,
                    password: value.password,
                    phone: value.phone,
                    confirmPassword: value.confirmPassword
                }
                const uploadToBackend = await axios.post('/signup',vendor)
                return uploadToBackend.data
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error("Upload failed: " + error.message);
                } else {
                    throw new Error("Upload failed: An unknown error occurred.");
                }
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message)
        },
        onSuccess: (data, variables, context) => {
            toast.success(data.message)
            console.log(data)
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
        document: yup.mixed()
            .required("Id proof is required")
            .test('fileSize', "File size must be under 5MB", (value) => {
                return value instanceof File && value.size <= 5 * 1024 * 1024
            })
            .test("fileType", "Only images and PDFs are allowed", (value) => {
                return value instanceof File && ["image/jpeg", "image/png", "application/pdf"].includes(value.type);
            }),
    });

    const handleSubmit = (values: FormValues) => {
        console.log(values)
        const response = mutation.mutate(values)
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
                                                {({ field, form }: any) => (
                                                    <input
                                                        type="file"
                                                        accept="image/jpeg, image/png, application/pdf"
                                                        onChange={(event) => {
                                                            const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
                                                            form.setFieldValue("document", file);
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                            <ErrorMessage name="document" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full bg-gray-900 text-white hover:bg-gray-800">Sign Up</Button>
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
        </div>
    )
}

