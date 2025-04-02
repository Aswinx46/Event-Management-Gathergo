import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, CurrencyDollarIcon, CalendarIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import AddServiceModal from './AddServiceModal';
import { useCreateServiceMutation } from '@/hooks/VendorCustomHooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFetchCategoryForServiceQuery } from '../../../hooks/VendorCustomHooks';
import { toast } from 'react-toastify';

interface Service {
  serviceTitle: string;
  yearsOfExperience: number;
  serviceDescription: string;
  cancellationPolicy: string;
  termsAndCondition: string;
  serviceDuration: string;
  servicePrice: number;
  additionalHourFee: number;
  vendorId?: string
}

interface Category {
  _id: string;
  title: string;
}

const dummyServices: Service[] = [
  {
    serviceTitle: 'Premium Wedding Photography',
    yearsOfExperience: 5,
    serviceDescription: 'Professional wedding photography service with high-end equipment and creative direction.',
    cancellationPolicy: 'Free cancellation up to 48 hours before the event',
    termsAndCondition: 'Deposit required, full payment due 1 week before event',
    serviceDuration: '8 hours',
    servicePrice: 1200,
    additionalHourFee: 150,
  },
  {
    serviceTitle: 'Corporate Event Planning',
    yearsOfExperience: 3,
    serviceDescription: 'Complete corporate event planning and management services.',
    cancellationPolicy: 'Free cancellation up to 72 hours before the event',
    termsAndCondition: '50% advance payment required',
    serviceDuration: '6 hours',
    servicePrice: 2500,
    additionalHourFee: 300,
  },
];

const ServiceListingVendor: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const vendor = useSelector((state: RootState) => state.vendorSlice.vendor)

  const fetchCategoryQuery = useFetchCategoryForServiceQuery()

  const categories: Category[] = fetchCategoryQuery?.data?.categories
  console.log(categories)

  const createServiceMutation = useCreateServiceMutation()

  const handleSubmit = (data: Service) => {
    data.vendorId = vendor?._id
    console.log(data)
    createServiceMutation.mutate(data, {
      onSuccess(data) {
        console.log(data)
        setIsOpen(false)
        toast.success(data.message)
      },
      onError(err){
        console.log(err)
        toast.error(err.message)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {isOpen && <AddServiceModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={handleSubmit} categories={categories}/>}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 bg-white bg-opacity-70 p-4 rounded-lg shadow-sm inline-block">
          My Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {service.serviceTitle}
                  </h2>
                  <span className="px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                    ${service.servicePrice}
                  </span>
                </div>

                <div className="flex gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {service.yearsOfExperience} Years
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    Available
                  </span>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">
                  {service.serviceDescription}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <ClockIcon className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="text-sm">Duration: {service.serviceDuration}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2 text-purple-500" />
                    <span className="text-sm">Additional Hour: ${service.additionalHourFee}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="space-y-4">
                    <div className="group/policy cursor-pointer">
                      <div className="flex items-center text-gray-700 mb-2">
                        <ShieldCheckIcon className="w-5 h-5 mr-2 text-purple-500" />
                        <h3 className="font-semibold">Cancellation Policy</h3>
                      </div>
                      <p className="text-sm text-gray-600 pl-7 group-hover/policy:text-gray-900 transition-colors">
                        {service.cancellationPolicy}
                      </p>
                    </div>

                    <div className="group/terms cursor-pointer">
                      <div className="flex items-center text-gray-700 mb-2">
                        <DocumentTextIcon className="w-5 h-5 mr-2 text-purple-500" />
                        <h3 className="font-semibold">Terms & Conditions</h3>
                      </div>
                      <p className="text-sm text-gray-600 pl-7 group-hover/terms:text-gray-900 transition-colors">
                        {service.termsAndCondition}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Button className='self-end' onClick={() => setIsOpen(true)}>ADD SERVICE</Button>
      </motion.div>
    </div>
  );
};

export default ServiceListingVendor;