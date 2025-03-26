import { clientCreateAccount, clientGoogleLogin, clientLogin, clientResendOtp, clientSignup } from "@/services/ApiServiceClient";
import { useMutation } from "@tanstack/react-query";
type LoginProps = {
    email: string;
    password: string;
};

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}
type Client = {
    email: string;
    googleVerified: boolean;
    name: string;
    profileImage: string
}
export const useClientLoginMutation = () => {
    return useMutation({
        mutationFn: ({ email, password }: LoginProps) => clientLogin({ email, password }),
    })
}

export const useClientSignupMutation = () => {
    return useMutation({
        mutationFn: (values: FormValues) => clientSignup(values)
    })
}

export const useCreateAccountMutation = () => {
    return useMutation({
        mutationFn: ({ formdata, otpString }: { formdata: Record<string, any>; otpString: string }) => clientCreateAccount({ formdata, otpString })

    })
}

export const useResendOtpClientMutation = () => {
    return useMutation({
        mutationFn: (email: string) => clientResendOtp(email)
    })
}

export const useClientGoogleLoginMutation = () => {
    return useMutation({
        mutationFn: (client: Client) => clientGoogleLogin(client)
    })
}