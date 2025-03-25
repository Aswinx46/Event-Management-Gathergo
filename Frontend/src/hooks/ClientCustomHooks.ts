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
export const clientLoginMutation = () => {
    return useMutation({
        mutationFn: ({ email, password }: LoginProps) => clientLogin({ email, password }),
    })
}

export const clientSignupMutation = () => {
    return useMutation({
        mutationFn: (values: FormValues) => clientSignup(values)
    })
}

export const createAccountMutation = () => {
    return useMutation({
        mutationFn: ({ formdata, otpString }: { formdata: Record<string, any>; otpString: string }) => clientCreateAccount({ formdata, otpString })

    })
}

export const resendOtpClientMutation = () => {
    return useMutation({
        mutationFn: (email: string) => clientResendOtp(email)
    })
}

export const clientGoogleLoginMutation = () => {
    return useMutation({
        mutationFn: (client: Client) => clientGoogleLogin(client)
    })
}