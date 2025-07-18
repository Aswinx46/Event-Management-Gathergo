/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Mail, Phone, Clock, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format, isBefore, startOfDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateBooking, useFindSericeDataWithVendor } from '@/hooks/ClientCustomHooks';
import BookingConfirmation from '@/components/other components/BookingConfirmationModal';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import UserReviews from '../review/ShowReviews';
import Pagination from '@/components/other components/Pagination';
import { FaRupeeSign } from 'react-icons/fa';
import { enUS } from 'date-fns/locale';
import { CloudinaryPreset } from '@/utils/cloudinaryPresetFile';

export interface Booking {
  date: Date[];
  email: string;
  phone: number;
  name: string;
  vendorId: string,
  serviceId: string
  clientId: string
}

export interface VendorDTO {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
}

export interface ServiceWithVendorEntity {
  _id: string;
  title: string;
  serviceDescription: string;
  price: number;
  vendor: VendorDTO;
  duration: string
}


// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const VendorBookingCard = () => {

  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)

  // const [date, setDate] = React.useState<Date>();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { serviceId, vendorId } = useParams()
  const [rating, _setRating] = useState<number>(4)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const findServiceWithVendor = useFindSericeDataWithVendor(serviceId!, currentPage, rating)
  const Service: ServiceWithVendorEntity = findServiceWithVendor?.data?.serviceWithVendor
  const bookingApi = useCreateBooking()
  const navigate = useNavigate()
  // const fetchReviews = useShowReviews({ targetId: serviceId!, pageNo: currentPage, rating })
  const reviews = findServiceWithVendor?.data?.reviews
  const totalPages = findServiceWithVendor.data?.totalPages
  const handleNavigate = () => {
    navigate('/profile/bookings')
  }


  const formik = useFormik({
    initialValues: {
      date: [],
      email: '',
      phone: '',
      name: ''
    },
    validationSchema: Yup.object({
      date: Yup.string()
        .min(1, 'Please select at least one date')
        .required('Date(s) required')
        .test('is-future', 'Cannot select a past date', function (value) {
          if (!value) return false;
          const selectedDate = new Date(value);
          const today = startOfDay(new Date());
          return !isBefore(selectedDate, today);
        }),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Phone number must start with 6-9 and contain exactly 10 digits')
        .required('Phone number is required'),
      name: Yup.string().required('Name is required')
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
        .test(
          'not-just-spaces',
          'Name cannot be only spaces',
          (value) => !!value && value.trim().length > 0
        )
    }),
    onSubmit: (values) => {
      if (clientId && vendorId && serviceId) {
        const dateObjects = selectedDates.map(date =>
          new Date(date.getFullYear(), date.getMonth(), date.getDate())
        );
        const bookingData: Booking = {
          ...values, phone: Number(values.phone), date: dateObjects, serviceId: serviceId, vendorId: vendorId, clientId: clientId
        }
        console.log(bookingData)
        bookingApi.mutate(bookingData, {
          onSuccess: (data) => {
            toast.success(data.message)
            setIsOpen(true)
          },
          onError: (err) => {
            console.log(err)
            toast.error(err.message)
          }
        })
      } else {
        toast.error('Please Login To Book')
      }

    }
  });


  return (
    <div className='bg-black '>
      {isOpen && <BookingConfirmation isOpen={isOpen} setIsOpen={setIsOpen} handleBooking={handleNavigate} />}
      <div className="container mx-auto  px-4 py-8 max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1  md:grid-cols-2 gap-8"
        >
          {/* Vendor Details - Left Side */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <Card className="p-6 h-full bg-black text-white shadow-lg rounded-xl border border-white/10">
              <motion.div
                className="flex flex-col items-center text-center mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative">
                  <motion.img
                    src={CloudinaryPreset+Service?.vendor.profileImage}
                    alt={Service?.vendor.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-md"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                </div>
                <motion.h2 className="text-2xl font-bold mt-4">{Service?.vendor.name}</motion.h2>
                {/* <motion.p className="text-gray-400">{vendor.profession}</motion.p>
                <motion.p className="text-sm text-gray-300 mt-1">{vendor.reviews} reviews</motion.p> */}
              </motion.div>

              <Separator className="my-4 bg-white/20" />

              <motion.div className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{Service?.vendor.email}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white">{Service?.vendor.phone}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-6 bg-white/5 p-4 rounded-lg border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="font-medium mb-2 text-white">Why choose {Service?.vendor.name}?</h3>
                  <ul className="text-sm space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                      <span>Professional equipment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                      <span>Quick turnaround time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                      <span>High-quality work ensured</span>
                    </li>
                  </ul>
                </motion.div>
                <Button onClick={() => navigate(`/vendorProfile/${Service.vendor._id}`)} className='bg-purple-500 text-black '>{`See ${Service?.vendor.name}'s Profile`}</Button>

              </motion.div>
            </Card>
          </motion.div>

          {/* Booking Form & Service Details - Right Side */}
          <motion.div variants={itemVariants} className="flex flex-col space-y-6">
            {/* Booking Form */}
            <Card className="p-6 bg-black text-white shadow-lg rounded-xl border border-white/10">
              <motion.h2
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Book This Service
              </motion.h2>

              <motion.div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="date" className="text-white">Select Date</Label>

                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-black border-white/30 text-white",
                          selectedDates.length === 0 && "text-gray-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDates.length > 0
                          ? selectedDates.map((d) => format(d, "MMM dd")).join(", ")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4 bg-white border-white/30 space-y-4">
                       <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates) => {
                          const validDates =
                            dates?.filter(
                              (date) =>
                                !isBefore(startOfDay(date), startOfDay(new Date()))
                            ) || [];
                          setSelectedDates(validDates);
                          formik.setFieldValue(
                            "date",
                            validDates.map((d) => format(d, "yyyy-MM-dd")).join(", ")
                          );
                        }}
                        disabled={(date) =>
                          isBefore(startOfDay(date), startOfDay(new Date()))
                        }
                        className="bg-white text-black"
                        modifiersStyles={{
                          selected: {
                            backgroundColor: 'rgb(147, 51, 234)',
                            color: 'white'
                          }
                        }}
                        weekStartsOn={0}
                        locale={enUS}
                      /> 
                    
                      <Button
                        variant="secondary"
                        className="w-full bg-white text-black"
                        onClick={() => setIsCalendarOpen(false)}
                      >
                        Done
                      </Button>
                    </PopoverContent>
                  </Popover>
                  {formik.touched.date && formik.errors.date && (
                    <div className="text-red-500 text-sm">{formik.errors.date}</div>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-white">Your Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10 bg-black border-white/30 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps('email')}
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="phone" className="text-white">Your Phone</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 123456789"
                      className="pl-10 bg-black border-white/30 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps('phone')}
                    />
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="name" className="text-white">Your Name</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 bg-black border-white/30 text-white placeholder:text-gray-500"
                      {...formik.getFieldProps('name')}
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    className="w-full mt-4 bg-white text-black hover:bg-gray-300"
                    size="lg"
                    onClick={() => formik.handleSubmit()}
                    type="submit"
                  >
                    Book Now
                  </Button>
                </motion.div>
              </motion.div>
            </Card>

            {/* Service Details */}
            <motion.div
              variants={itemVariants}
              className="mt-6"
            >
              <Card className="p-6 bg-black text-white shadow-lg rounded-xl border border-white/10">
                <motion.h3
                  className="text-xl font-semibold mb-4 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span>Service Details</span>
                </motion.h3>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="font-medium text-lg text-white">{Service?.title}</h4>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-4 overflow-y-auto custom-scrollbar">{Service?.serviceDescription}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/10 p-2 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Duration</p>
                        <p className="font-medium text-white">{Service?.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-white/10 p-2 rounded-full">
                        <FaRupeeSign className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="font-medium text-white">₹{Service?.price}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {reviews && <UserReviews reviews={reviews} />}
      {reviews && reviews.length > 0 && <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />}
    </div>
  );
};

export default VendorBookingCard;
