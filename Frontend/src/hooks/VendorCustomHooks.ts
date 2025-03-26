import { resendOtpVendor, uploadImageCloudinary, vendorSignup, verifyOtpVendor } from "@/services/ApiServiceVendor";
import { useMutation } from "@tanstack/react-query"

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    idProof: string;
}

export const uploadeImageToCloudinaryMutation = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            return await uploadImageCloudinary(formData)

        }
    })
}

export const vendorSignupMutation = () => {
    return useMutation({
        mutationFn: async (vendor: FormValues) => {
            const response = await vendorSignup(vendor)
            return response.data
        }
    })
}

export const vendorVerifyOtpMutation = () => {
    return useMutation({
        mutationFn: async ({ formdata, otpString }: { formdata: Record<string, any>; otpString: string }) => {
            return await verifyOtpVendor({ formdata, otpString })
        }
    })
}

export const vendorResendOtpMutation = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            return await resendOtpVendor(email)
        }
    })
}