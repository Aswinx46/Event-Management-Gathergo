import { useMutation } from "@tanstack/react-query"

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    document: File | null;
}

export const vendorSignup=()=>{
    return useMutation({
        mutationFn:async ({value,formData}:{value:FormValues,formData:FormData})=>{
            
        }
    })
}