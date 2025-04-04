import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Mail, Phone, Star, Clock, MapPin, DollarSign, User } from 'lucide-react';
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
  const [date, setDate] = React.useState<Date>();

  const formik = useFormik({
    initialValues: {
      date: '',
      email: '',
      phone: '',
      name: ''
    },
    validationSchema: Yup.object({
      date: Yup.string()
        .required('Date is required')
        .test('is-future', 'Cannot select a past date', function(value) {
          if (!value) return false;
          const selectedDate = new Date(value);
          const today = startOfDay(new Date());
          return !isBefore(selectedDate, today);
        }),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
        .required('Phone number is required'),
      name: Yup.string().required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Handle form submission here
    }
  });

  // Dummy data
  const vendor = {
    id: '1',
    name: 'Sarah Johnson',
    profession: 'Professional Photographer',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    rating: 4.8,
    reviews: 127,
  };

  const service = {
    id: '101',
    name: 'Premium Photography Session',
    description: 'Professional photography session including indoor and outdoor shots, perfect for portraits, events, or special occasions.',
    duration: '2 hours',
    price: 199.99,
    location: 'Client location or studio',
  };

  return (
    <div className='bg-black'>
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
                    src={vendor.profileImage}
                    alt={vendor.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-md"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-white text-black rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <Star className="h-3 w-3 fill-black stroke-black" />
                    <span>{vendor.rating}</span>
                  </motion.div>
                </div>
                <motion.h2 className="text-2xl font-bold mt-4">{vendor.name}</motion.h2>
                <motion.p className="text-gray-400">{vendor.profession}</motion.p>
                <motion.p className="text-sm text-gray-300 mt-1">{vendor.reviews} reviews</motion.p>
              </motion.div>

              <Separator className="my-4 bg-white/20" />

              <motion.div className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{vendor.email}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="bg-white/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white">{vendor.phone}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-6 bg-white/5 p-4 rounded-lg border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="font-medium mb-2 text-white">Why choose {vendor.name.split(' ')[0]}?</h3>
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
                      <span>High-quality editing included</span>
                    </li>
                  </ul>
                </motion.div>
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-black border-white/30 text-white",
                          !date && "text-gray-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-black border-white/30">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          if (newDate && !isBefore(startOfDay(newDate), startOfDay(new Date()))) {
                            setDate(newDate);
                            formik.setFieldValue('date', format(newDate, 'yyyy-MM-dd'));
                          }
                        }}
                        disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                        initialFocus
                        className="bg-black text-white"
                      />
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
                      placeholder="+1 (555) 000-0000"
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
                    <h4 className="font-medium text-lg text-white">{service.name}</h4>
                    <p className="text-sm text-gray-400 mt-1">{service.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-white/10 p-2 rounded-full">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Duration</p>
                        <p className="font-medium text-white">{service.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-white/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="font-medium text-white">${service.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mt-4">
                    <div className="bg-white/10 p-2 rounded-full shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Location</p>
                      <p className="font-medium text-white">{service.location}</p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorBookingCard;