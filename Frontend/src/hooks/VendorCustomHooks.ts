import { resendOtpVendor, updateProfileImageVendor, uploadImageCloudinary, vendorSignup, verifyOtpVendor } from "@/services/ApiServiceVendor";
import { useMutation } from "@tanstack/react-query"

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    idProof: string;
}

export const useUploadeImageToCloudinaryMutation = () => {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            return await uploadImageCloudinary(formData)

        }
    })
}

export const useVendorSignupMutation = () => {
    return useMutation({
        mutationFn: async (vendor: FormValues) => {
            // const response = await vendorSignup(vendor)
            // return response.data
            return await vendorSignup(vendor)
        }
    })
}

export const useVendorVerifyOtpMutation = () => {
    return useMutation({
        mutationFn: async ({ formdata, otpString }: { formdata: Record<string, any>; otpString: string }) => {
            return await verifyOtpVendor({ formdata, otpString })
        }
    })
}

export const useVendorResendOtpMutation = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            return await resendOtpVendor(email)
        }
    })
}

export const useVendorLoginMutation = () => {
    return useMutation({

    })
}

export const useUpdateProfileImageMutation = () => {
    return useMutation({
        mutationFn: ({ id, imageUrl }: { id: string, imageUrl: string }) => updateProfileImageVendor(id, imageUrl)
    })
}