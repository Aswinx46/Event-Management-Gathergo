import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, CurrencyDollarIcon, CalendarIcon, DocumentTextIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import AddServiceModal from './AddServiceModal';
import { useCreateServiceMutation, useEditServiceVendor, useFetchServiceVendor } from '@/hooks/VendorCustomHooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFetchCategoryForServiceQuery } from '../../../hooks/VendorCustomHooks';
import { toast } from 'react-toastify';
import Pagination from '@/components/other components/Pagination';

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
  status: string
  vendorId?: string
  categoryId: string
}

interface Category {
  _id: string;
  title: string;
}


const ServiceListingVendor: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [services, setServices] = useState<Service[]>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const vendor = useSelector((state: RootState) => state.vendorSlice.vendor)
  const [update, setUpdate] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [editService, setEditService] = useState<boolean>(false)
  const fetchCategoryQuery = useFetchCategoryForServiceQuery()

  const categories: Category[] = fetchCategoryQuery?.data?.categories

  const createServiceMutation = useCreateServiceMutation()

  const fetchService = useFetchServiceVendor()

  const updateService = useEditServiceVendor()

  useEffect(() => {
    if (vendor) {
      fetchService.mutate({ vendorId: vendor?._id, pageNo: currentPage }, {
        onError(err) {
          if (err instanceof Error) toast.error(err.message)
          toast.error('error while fetching services')
        },
        onSuccess(data) {
          console.log(data)
          setServices(data?.Services)
          setTotalPages(data?.totalPages)
        },
      })

    }
  }, [update])

  const handleAddService = () => {
    setSelectedService(null)
    setIsOpen(true)
  }



  const handleEditService = (service: Service) => {
    console.log(service)
    const serviceId = service._id
    updateService.mutate({ service, serviceId }, {
      onSuccess(data) {
        toast.success(data.message)
      },
      onError(err) {
        toast.error(err.message)
      }
    })
    setIsOpen(false)
    setUpdate(!update)
  }


  const handleEdit = (selectedService: Service) => {
    setSelectedService(selectedService)
    setEditService(true)
    setIsOpen(true)
    console.log(selectedService)
  }

  const handleSubmit = (data: Service) => {
    data.vendorId = vendor?._id
    data.status = 'active'
    console.log(data)
    createServiceMutation.mutate(data, {
      onSuccess(data) {
        setIsOpen(false)
        toast.success(data.message)
        setUpdate(!update)
      },
      onError(err) {
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
        className="max-w-7xl mx-auto flex flex-col"
      >
        {isOpen && <AddServiceModal isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={editService ? handleEditService : handleSubmit} categories={categories} data={selectedService || undefined} />}
        <div className='bg-white flex justify-between items-center mb-5 px-5 rounded-2xl flex-shrink-0'>
          <h1 className="text-3xl font-bold text-gray-800 bg-opacity-70 p-4">
            My Services
          </h1>
          <Button className='' onClick={handleAddService}>ADD SERVICE</Button>
        </div>

        <div className="h-[calc(100vh-15rem)] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            {services?.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {service.serviceTitle}
                  </h2>
                  <div className="flex flex-col gap-3 items-end justify-between mb-4">
                    <motion.button whileHover={{ scale: 1.2 }}
                      className={`px-4 py-1 ${service.status ? "bg-green-400 text-black" : "bg-red-600 text-black"} rounded-2xl text-sm font-semibold hover:cursor-pointer`}>
                      {service.status}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.2 }}
                      className={`px-4 py-1 bg-black text-white rounded-2xl text-sm font-semibold hover:cursor-pointer`}
                      onClick={() => handleEdit(service)}
                    >
                      EDIT
                    </motion.button>
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

                  <div className="relative group/desc transition-all duration-300">
                    <p className="text-gray-600 mb-6 line-clamp-2 group-hover/desc:line-clamp-none transition-all duration-300 ease-in-out">
                      {service.serviceDescription}
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent group-hover/desc:hidden transition-opacity duration-300"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <ClockIcon className="w-5 h-5 mr-2 text-purple-500" />
                      <span className="text-sm">Duration: {service.serviceDuration}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CurrencyDollarIcon className="w-5 h-5 mr-2 text-purple-500" />
                      <span className="text-sm">Service Price: ₹{service.servicePrice}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CurrencyDollarIcon className="w-5 h-5 mr-2 text-purple-500" />
                      <span className="text-sm">Additional Hour: ₹{service.additionalHourFee}</span>
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
        </div>

        <div className="mt-4 flex-shrink-0">
          <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceListingVendor;