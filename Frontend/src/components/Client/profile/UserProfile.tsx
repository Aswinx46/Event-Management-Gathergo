"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { motion, AnimatePresence } from "framer-motion"
import { Edit, Check, X, Camera, User, Mail, Phone } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import ImageCropper from "@/components/other components/ImageCropper"
import { useUpdateClientProfie } from "@/hooks/ClientCustomHooks"
import { useUploadeImageToCloudinaryMutation } from "@/hooks/VendorCustomHooks"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import { addClient } from "@/store/slices/user/userSlice"

// Define the user type
interface UserData {
    _id: string,
    clientId: string,
    email: string,
    name: string,
    phone: number,
    profileImage?: string,
    role: 'client',
    status: 'active' | 'block'
}

type EditableUserFields = {
    _id: string
    name: string
    phone: number
    profileImage?: string
}


// Validation schema
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required')
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(15, 'Name must be less than 15 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .test(
            'not-just-spaces',
            'Name cannot be only spaces',
            (value) => !!value && value.trim().length > 0
        ),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[6-9]\d{9}$/, "Phone number must be 10 digits and start with 6, 7, 8, or 9"),
    profileImage: Yup.string().required("Profile image is required"),
})

export default function UserDetails() {
    const client = useSelector((state: RootState) => state.clientSlice.client)
    const [userData, setUserData] = useState<UserData>(client as UserData)
    const [isEditing, setIsEditing] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [croppedImage, setCropperImage] = useState<File | null>(null)
    const [showCropper, setShowCropper] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string>('')
    const [updating, setUpdating] = useState<boolean>(false)
    useEffect(() => {
        setUserData(client as UserData)
    }, [client])

    const updateProfile = useUpdateClientProfie()
    const uploadImageCloudinary = useUploadeImageToCloudinaryMutation()

    useEffect(() => {
        if (croppedImage) {
            const resizedImage = URL.createObjectURL(croppedImage);
            // setResizedImage(resizedImage);
            setPreviewImage(resizedImage)
            setUserData((prev) => ({ ...prev, profileImage: resizedImage }));

            return () => {
                URL.revokeObjectURL(resizedImage);
            };
        }
    }, [croppedImage])

    const dispatch = useDispatch()

    const handleSubmit = async (values: EditableUserFields) => {
        // const { email, ...rest } = values
        try {
            setUpdating(true)
            const fileToUpload = croppedImage;
            if (fileToUpload) {
                // toast.error('Please select a ID Proof')
                // throw new Error("No file selected");
                const formdata = new FormData()
                formdata.append('file', fileToUpload)
                formdata.append('upload_preset', 'clientProfile')
                const response = await uploadImageCloudinary.mutateAsync(formdata)
                const imageUrl = response.secure_url
                values.profileImage = imageUrl
                values._id = userData?._id
            }
            // values.phone = Number(values.phone)
            updateProfile.mutate(values, {
                onSuccess: (data) => {
                    console.log(data)
                    dispatch(addClient(data.updatedProfile))
                    toast.success(data.message)
                    setIsEditing(false)
                    setPreviewImage(null)
                },
                onError: (err) => {
                    toast.error(err.message)
                }
            })
        } catch (error) {
            console.log('error while updating image to the cloudinary', error)
            toast.error(isAxiosError(error) ? error.response?.data.message : 'error while updating image to cloudinary')
        }
        // setUserData({ ...userData, ...rest })

    }

    const handleCancel = () => {
        setIsEditing(false)
        setPreviewImage(null)
    }

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: string | boolean | number | File | Blob) => void,
    ) => {
        setShowCropper(true)
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setPreviewImage(result)
                setImageUrl(result)
                setFieldValue("profileImage", result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="md:w-full  max-w-md mt-20 md:mt-30  mx-auto overflow-hidden">
            <motion.div
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background decoration */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-400 to-white" />
                {showCropper && <ImageCropper image={imageUrl} showCropper={setShowCropper} onCropComplete={setCropperImage} />}
                <div className="relative px-6 pt-10 pb-8">
                    <AnimatePresence mode="wait">
                        {isEditing ? (
                            <motion.div
                                key="edit-form"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800">Edit Your Profile</h2>
                                    <p className="text-gray-500 mt-1">Update your personal information</p>
                                </div>

                                <Formik<EditableUserFields>
                                    initialValues={{
                                        _id: userData?._id,
                                        name: userData?.name,
                                        phone: userData?.phone,
                                        profileImage: userData?.profileImage,
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ setFieldValue, errors, touched }) => (
                                        <Form className="space-y-6">
                                            <div className="flex flex-col items-center mb-8">
                                                <motion.div
                                                    className="relative w-32 h-32 mb-4"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                                >
                                                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                                                        <img
                                                            src={previewImage || userData.profileImage}
                                                            alt="Profile"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <motion.label
                                                        htmlFor="profileImage"
                                                        className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-full cursor-pointer shadow-md"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <Camera size={18} />
                                                        <span className="sr-only">Change profile picture</span>
                                                    </motion.label>
                                                </motion.div>
                                                <input
                                                    id="profileImage"
                                                    name="profileImage"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => handleImageChange(e, setFieldValue)}
                                                />
                                                {errors.profileImage && touched.profileImage && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-red-500 text-sm mt-1"
                                                    >
                                                        {errors.profileImage}
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                                        <User size={16} className="mr-2 text-purple-500" />
                                                        Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter your name"
                                                    />
                                                    <ErrorMessage name="name">
                                                        {(msg) => (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-500 text-sm mt-1"
                                                            >
                                                                {msg}
                                                            </motion.div>
                                                        )}
                                                    </ErrorMessage>
                                                </div>

                                                <div>
                                                    <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                                        <Mail size={16} className="mr-2 text-purple-500" />
                                                        Email (Cannot be changed)
                                                    </label>
                                                    <div className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500">
                                                        {userData.email}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                                        <Phone size={16} className="mr-2 text-purple-500" />
                                                        Phone
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                                        placeholder="Enter your phone number"
                                                    />
                                                    <ErrorMessage name="phone">
                                                        {(msg) => (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-red-500 text-sm mt-1"
                                                            >
                                                                {msg}
                                                            </motion.div>
                                                        )}
                                                    </ErrorMessage>
                                                </div>
                                            </div>

                                            <div className="flex space-x-4 pt-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    type="submit"
                                                    className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                                                >
                                                    <Check size={18} className="mr-2" />
                                                    {updating ? 'Saving changes' : 'Save changes'}

                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    type="button"
                                                    onClick={handleCancel}
                                                    className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200"
                                                >
                                                    <X size={18} className="mr-2" />
                                                    Cancel
                                                </motion.button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="user-details"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
                                    <p className="text-gray-500 mt-1">Your personal information</p>
                                </div>

                                <motion.div
                                    className="relative w-36 h-36 mb-8"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <img
                                            src={userData.profileImage || "/placeholder.svg"}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 left-0 right-0 text-center">
                                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm rounded-full shadow-md">
                                            {userData.name.split(" ")[0]}
                                        </span>
                                    </div>
                                </motion.div>

                                <div className="w-full space-y-6">
                                    <motion.div
                                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                                        whileHover={{
                                            y: -2,
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mr-4">
                                            <User size={18} className="text-purple-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 font-medium">Name</div>
                                            <div className="font-semibold text-gray-800">{userData.name}</div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                                        whileHover={{
                                            y: -2,
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mr-4">
                                            <Mail size={18} className="text-purple-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 font-medium">Email</div>
                                            <div className="font-semibold text-gray-800">{userData.email}</div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex items-center p-4 bg-gray-50 rounded-lg"
                                        whileHover={{
                                            y: -2,
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mr-4">
                                            <Phone size={18} className="text-purple-600" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 font-medium">Phone</div>
                                            <div className="font-semibold text-gray-800">{userData.phone}</div>
                                        </div>
                                    </motion.div>

                                    <motion.button
                                        whileHover={{
                                            scale: 1.03,
                                            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => setIsEditing(true)}
                                        className="mt-8 flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow-md transition-all duration-200"
                                    >
                                        <Edit size={18} className="mr-2" />
                                        Edit Profile
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}
