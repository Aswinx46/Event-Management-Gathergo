import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddServiceModal from './AddServiceModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ServiceFormData {
    _id?: string;
    serviceTitle: string;
    yearsOfExperience: number;
    serviceDescription: string;
    cancellationPolicy: string;
    termsAndCondition: string;
    serviceDuration: string;
    servicePrice: number;
    additionalHourFee: number;
    status?: string;
    vendorId?: string;
    categoryId: string;
}

interface Service extends ServiceFormData {
    _id: string;
    status: string;
    vendorId: string;
}

interface ServiceCardProps {
    service: Service;
    onStatusChange: (id: string) => void;
    onEdit: (service: Service) => void;
}

const ServiceCard = ({ service, onStatusChange, onEdit }: ServiceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-black text-white rounded-xl p-6 shadow-2xl hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-shadow"
        >
            <div className="space-y-6">
                {/* Header with Status and Edit */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-between items-start border-b border-white/10 pb-4"
                >
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            {service.serviceTitle}
                        </h2>
                        <p className="text-gray-400 mt-2">
                            {service.yearsOfExperience} Years of Experience
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onStatusChange(service._id)}
                            className={`px-4 py-1 rounded-lg text-sm font-medium ${
                                service.status === 'active' 
                                    ? 'bg-green-500 text-black hover:bg-green-600' 
                                    : 'bg-red-500 text-black hover:bg-red-600'
                            } transition-colors`}
                        >
                            {service.status}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onEdit(service)}
                            className="px-4 py-1 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Edit
                        </motion.button>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="border-b border-white/10 pb-4"
                >
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-300 leading-relaxed">
                        {service.serviceDescription}
                    </p>
                </motion.div>

                {/* Service Details */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 gap-6"
                >
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Duration</h3>
                        <p className="text-gray-300">{service.serviceDuration}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                        <p className="text-gray-300">₹{service.servicePrice}</p>
                        <p className="text-sm text-gray-400 mt-1">
                            Additional Hour: ₹{service.additionalHourFee}
                        </p>
                    </div>
                </motion.div>

                {/* Policies */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4 border-t border-white/10 pt-4"
                >
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Cancellation Policy</h3>
                        <p className="text-gray-300">{service.cancellationPolicy}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
                        <p className="text-gray-300">{service.termsAndCondition}</p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const ServiceListingVendor = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [update, setUpdate] = useState(false);

    const vendor = useSelector((state: RootState) => state.vendorSlice.vendor);

    const { data: services = [] } = useQuery({
        queryKey: ['services', update],
        queryFn: async () => {
            const response = await fetch(`/api/vendor/services/${vendor?._id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch services');
            }
            return response.json() as Promise<Service[]>;
        }
    });

    const changeStatusMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/vendor/services/${id}/status`, {
                method: 'PATCH'
            });
            if (!response.ok) {
                throw new Error('Failed to change status');
            }
            return response.json();
        },
        onSuccess: () => {
            setUpdate(!update);
            toast.success('Status updated successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const updateServiceMutation = useMutation({
        mutationFn: async (service: Service) => {
            const response = await fetch(`/api/vendor/services/${service._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(service)
            });
            if (!response.ok) {
                throw new Error('Failed to update service');
            }
            return response.json();
        },
        onSuccess: () => {
            setUpdate(!update);
            toast.success('Service updated successfully');
            setIsOpen(false);
            setEditingService(null);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const handleStatusChange = (id: string) => {
        changeStatusMutation.mutate(id);
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Your Services</h1>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                    Add New Service
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service: Service) => (
                    <ServiceCard
                        key={service._id}
                        service={service}
                        onStatusChange={handleStatusChange}
                        onEdit={handleEdit}
                    />
                ))}
            </div>

            <AddServiceModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onSubmit={(service) => updateServiceMutation.mutate(service as Service)}
                categories={[]}
                data={editingService || undefined}
            />
        </div>
    );
};

export default ServiceListingVendor;