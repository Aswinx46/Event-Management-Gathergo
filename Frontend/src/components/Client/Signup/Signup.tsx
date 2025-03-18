import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from "react-router-dom"
import axios from '../../../axios/clientAxios'
import OTPModal from "@/components/otpModal/otpModal"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import ImageCarousel from "@/components/other components/ImageCarousal"
import Gooeynov from '../../../../addon/GooeyNav/GooeyNav'
export default function SignupComponent() {

  const items = [{ text: "Home", link: '#' }, { text: 'Profile', link: '#' }]

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
  const [resendOtp, setResendOtp] = useState<boolean>()

  const mutation = useMutation({
    mutationFn: async (values: typeof initialValues) => {
      return await axios.post('/Signup', values)
    },
    onSuccess: () => {
      setIsOpen(true);
    },
    onError: (error) => {
      console.log(error)
      setIsOpen(false);
    }
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



  async function handleSubmit(values: typeof initialValues) {
    console.log("Form submitted", values);
    setData(values)
    try {

      mutation.mutate(values)

    } catch (error) {
      console.log('error while creating user', error)
    }
  }

  const navigate = useNavigate()

  const mutationCreateACcount = useMutation({
    mutationFn: async ({ formdata, otpString }: { formdata: Record<string, any>; otpString: string }) => {
      return await axios.post('/createAccount', { formdata, otpString })
    },
    onSuccess: () => {
      setIsOpen(false)
      navigate('/')
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  })

  const resendOtpMutation = useMutation({
    mutationFn: async (email: string) => {
      return await axios.post('/resendOtp', {email})
    },
    onSuccess: () => {
      toast.success('Otp Resended')
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  })


  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row justify-center">
      <motion.div
        className="w-full hover:shadow-[0_0_150px_rgba(255,255,255,0.5)] transition-shadow duration-500 flex flex-col md:flex-row overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Image Section */}
        {/* <motion.div
          className="w-full md:w-1/2 relative h-[300px] md:h-auto overflow-hidden bg-primary/10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img src="/concertt.jpg" alt="GatherGo illustration" className="w-full h-full md:object-cover" />
        </motion.div> */}
        <ImageCarousel/>

        {/* Form Section */}
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
                    {/* Name Field */}
                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                      <Label htmlFor="name">Full Name</Label>
                      <Field as={Input} name="name" placeholder="Enter your name" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                      <Label htmlFor="phone">Phone</Label>
                      <Field as={Input} name="phone" type="text" placeholder="Enter your phone" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                    </motion.div>

                    {/* Email Field */}
                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                      <Label htmlFor="email">Email</Label>
                      <Field as={Input} name="email" type="email" placeholder="Enter your email" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </motion.div>

                    {/* Password Field */}
                    <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                      <Label htmlFor="password">Password</Label>
                      <Field as={Input} name="password" type="password" placeholder="Create a password" className="focus:ring-2 focus:ring-primary/50" />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </motion.div>

                    {/* Confirm Password Field */}
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
        
      <OTPModal isOpen={isOpen} data={data} setIsOpen={setIsOpen} mutation={mutationCreateACcount} resendOtp={resendOtpMutation} email={data.email} />
    </div>
  )
}
