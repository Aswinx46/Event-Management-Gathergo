import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from "react-router-dom"
import OTPModal from "@/components/otpModal/otpModal"
import { useState } from "react"
import { toast } from "react-toastify"
import ImageCarousel from "@/components/other components/ImageCarousal"
import { useClientSignupMutation, useCreateAccountMutation, useResendOtpClientMutation } from "@/hooks/ClientCustomHooks"
export default function SignupComponent() {


  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }

  interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }


  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [data, setData] = useState<FormValues>(initialValues)
  const signupMutation = useClientSignupMutation()

  const validationSchema = yup.object().shape({
    name: yup.string().required("Full name is required").min(3, 'name should be more that 3 characters').max(8, 'name should be less that 8 characters'),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone: yup
      .string()
      .transform((value) => (value ? value.trim() : undefined)) // Ensure empty values are treated as undefined
      .matches(/^[6789]\d{9}$/, "Phone number must start with 6, 7, 8, or 9 and be 10 digits long")
      .test("not-all-same", "Phone number cannot contain all identical digits", (value) => {
        if (!value) return true; // Allow empty values before required check
        return !/^(\d)\1{9}$/.test(value);
      }).required('phone is required'),
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



  async function handleSubmit(values: typeof initialValues) {
    console.log("Form submitted", values);
    setData(values)
    try {

      signupMutation.mutate(values, {
        onSuccess: () => {
          setIsOpen(true);
        },
        onError: (error) => {
          console.log('error in comp',error)
          toast.error(error.message)
          setIsOpen(false);
        }
      })

    } catch (error) {
      console.log('error while creating user', error)
    }
  }

  const navigate = useNavigate()

  const mutationCreateAccount = useCreateAccountMutation()
  const resendOtpMutation = useResendOtpClientMutation()

  const handleMutationSuccess = () => {
    toast.success("Account created successfully Please Login!");
    navigate("/login", { replace: true });
  };

  const handleMutationError = (error: unknown) => {
    let message = "An unexpected error occurred";
    if (error instanceof Error) {
      console.log('error in hande',error)
      message = error.message || "An error occurred";
    }
    toast.error(message);
  }

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row justify-center">
      <motion.div
        className="w-full hover:shadow-[0_0_150px_rgba(255,255,255,0.5)] transition-shadow duration-500 flex flex-col md:flex-row overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ImageCarousel />

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="w-full flex justify-center items-center md:w-1/2 bg-card">
              <div className="w-full md:w-1/2 bg-card">
                <Card className="border-0 shadow-none bg-white h-full">
                  <CardHeader className="space-y-1">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <CardTitle className="text-3xl font-bold text-primary">GatherGo</CardTitle>
                      <CardDescription className="text-muted-foreground">Create an account to get started</CardDescription>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="space-y-4">

                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                      <Label htmlFor="name">Full Name</Label>
                      <Field as={Input} name="name" placeholder="Enter your name" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </motion.div>

                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                      <Label htmlFor="phone">Phone</Label>
                      <Field as={Input} name="phone" type="text" placeholder="Enter your phone" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                    </motion.div>

                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                      <Label htmlFor="email">Email</Label>
                      <Field as={Input} name="email" type="email" placeholder="Enter your email" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </motion.div>

                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                      <Label htmlFor="password">Password</Label>
                      <Field as={Input} name="password" type="password" placeholder="Create a password" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </motion.div>

                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Field as={Input} name="confirmPassword" type="password" placeholder="Confirm your password" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                    </motion.div>
                  </CardContent>

                  <CardFooter>
                    <motion.div className="w-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full text-base py-6" size="lg" type="submit" disabled={isSubmitting}>Sign Up</Button>
                      <p className="text-center mt-4 text-sm text-muted-foreground">Already have an account? <Link to='/login' className="text-primary font-medium cursor-pointer hover:underline" >Sign in</Link></p>
                    </motion.div>
                  </CardFooter>
                </Card>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>

      <OTPModal isOpen={isOpen} data={data} setIsOpen={setIsOpen} mutation={mutationCreateAccount} resendOtp={resendOtpMutation} email={data.email} handleError={handleMutationError} handleSuccess={handleMutationSuccess} />
    </div>
  )
}
