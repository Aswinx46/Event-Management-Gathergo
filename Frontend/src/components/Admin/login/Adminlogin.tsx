import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { motion } from "framer-motion";
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAdminToken } from '@/store/slices/admin/adminToken';
import { useAdminLoginMutation } from '@/hooks/AdminCustomHooks';
function Adminlogin() {
    const initalValues = {
        email: '',
        password: ''
    }
    type admin = {
        email: string;
        password: string
    }
    const validationSchema = yup.object().shape(({
        email: yup.string().email("Invalid email format").required("Email is required"),
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
    }))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginMutation = useAdminLoginMutation()
    const handleSubmit = (values: admin) => {
        console.log(values)
        loginMutation.mutate(values, {
            onSuccess: (data) => {
                console.log(data)
                dispatch(addAdminToken(data.accessToken))
                localStorage.setItem('adminId',data.id)
                toast.success('admin logged')
                navigate('/admin/dashboard', { replace: true })
            },
            onError: (error) => {
                if (isAxiosError(error)) {
                    console.log(error)
                    toast.error(error?.response?.data?.error)
                }
                console.log(error)
                toast.error(error.message)
            }
        })
    }


    return (
        <div className='w-screen h-screen absolute top-0 right-0 flex flex-col justify-center items-center'>
            <h1 className="text-3xl font-bold text-center text-gray-800 uppercase tracking-wide">
                ADMIN LOGIN
            </h1>

            <Formik initialValues={initalValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                {() => (
                    <Form className='w-[90vw] md:w-1/4 flex gap-5 flex-col  '>

                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Field as={Input}
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            <p className="text-xs text-red-500 hidden">Email is required</p>
                        </motion.div>

                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <Field as={Input}
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            <p className="text-xs text-red-500 hidden">Password is required</p>
                        </motion.div>
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className='bg-black hover:bg-gray-900 transition-colors cursor-pointer text-white rounded-2xl h-10'
                        >
                            LOGIN
                        </motion.button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Adminlogin
