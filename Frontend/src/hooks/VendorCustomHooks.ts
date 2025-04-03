import { changeStatusService, createServiceVendor, editServiceVendor, fetchCategoryCategoryForService, findServiceForVendor, resendOtpVendor, updateProfileImageVendor, uploadImageCloudinary, vendorSignup, verifyOtpVendor } from "@/services/ApiServiceVendor";
import { useMutation, useQuery } from "@tanstack/react-query"

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

        },

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
        mutationFn: async ({ formdata, otpString }: { formdata: Record<string, string | number | boolean>; otpString: string }) => {
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

// export const useVendorLoginMutation = () => {
//     return useMutation({
//         mutationFn:({email,password}:{email:string,password:string})=>useLogin
//     })
// }

export const useUpdateProfileImageMutation = () => {
    return useMutation({
        mutationFn: ({ id, imageUrl }: { id: string, imageUrl: string }) => updateProfileImageVendor(id, imageUrl)
    })
}

interface Service {
    _id: string
    serviceTitle: string;
    yearsOfExperience: number;
    serviceDescription: string;
    cancellationPolicy: string;
    termsAndCondition: string;
    serviceDuration: string;
    servicePrice: number;
    additionalHourFee: number;
    vendorId?: string
    status: string
}


export const useCreateServiceMutation = () => {
    return useMutation({
        mutationFn: (service: Service) => createServiceVendor(service)
    })
}

export const useFetchCategoryForServiceQuery = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchCategoryCategoryForService(),

        refetchOnWindowFocus: false
    },
    )
}

export const useFetchServiceVendor = () => {
    return useMutation({
        mutationFn: ({ vendorId, pageNo }: { vendorId: string, pageNo: number }) => findServiceForVendor({ vendorId, pageNo })
    })
}

export const useEditServiceVendor = () => {
    return useMutation({
        mutationFn: ({ service, serviceId }: { service: Service, serviceId: string }) => editServiceVendor(service, serviceId)
    })
}

export const useChangeStatusServiceVendor = () => {
    return useMutation({
        mutationFn: (serviceId: string) => changeStatusService(serviceId)
    })
}