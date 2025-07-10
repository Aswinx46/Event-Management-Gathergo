import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ServiceFormData {
    _id?: string;
    title: string;
    yearsOfExperience: number;
    serviceDescription: string;
    cancellationPolicy: string;
    termsAndCondition: string;
    serviceDuration: string;
    servicePrice: number;
    additionalHourFee: number;
    status: string;
    vendorId?: string;
    categoryId: string;
}

interface Category {
    _id: string;
    title: string;
}

interface AddServiceModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSubmit: (values: ServiceFormData) => void;
    data?: ServiceFormData
    categories: Category[];
    onEdit:(values:ServiceFormData)=>void
}



const validationSchema = Yup.object().shape({
    title: Yup.string().required('Service title is required')  .matches(/^[^*]*$/, 'Service title cannot contain a star (*)').matches(/[a-zA-Z]/, 'Service title cannot be numbers only'),
    yearsOfExperience: Yup.number()
        .min(0, 'Years of experience must be positive')
        .required('Years of experience is required'),
    serviceDescription: Yup.string()
        .min(20, 'Description must be at least 20 characters')
        .required('Service description is required'),
    cancellationPolicy: Yup.string().required('Cancellation policy is required'),
    termsAndCondition: Yup.string().required('Terms and conditions are required'),
    serviceDuration: Yup.string().required('Service duration is required'),
    servicePrice: Yup.number()
        .min(1000, 'Price must be positive and greater than 1000')
        .required('Service price is required'),
    additionalHourFee: Yup.number()
        .min(1000, 'Additional hour fee must be positive and greater than 1000')
        .required('Additional hour fee is required'),
    categoryId: Yup.string().required('Category is required'),
});



const AddServiceModal: React.FC<AddServiceModalProps> = ({
    isOpen,
    setIsOpen,
    onSubmit,
    data,
    categories,
    onEdit
}) => {
    console.log('modal')
    const initialValues: ServiceFormData = {
        _id: data?._id || '',
        title: data?.title || '',
        yearsOfExperience: data?.yearsOfExperience || 0,
        serviceDescription: data?.serviceDescription || '',
        cancellationPolicy: data?.cancellationPolicy || '',
        termsAndCondition: data?.termsAndCondition || '',
        serviceDuration: data?.serviceDuration || '',
        servicePrice: data?.servicePrice || 0,
        additionalHourFee: data?.additionalHourFee || 0,
        categoryId: data?.categoryId || '',
        status: data?.status || ''

    };

    const handleSubmit=(values:ServiceFormData)=>{
        if(data){
            onEdit(values)
        }else{
            onSubmit(values)
        }
    }


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 " onClose={() => setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <div className="flex items-center justify-between mb-6">
                                    <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900">
                                        Add New Service
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        handleSubmit(values);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="space-y-6">
                                            <div>
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                    Service Title
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="title"
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                />
                                                <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                                                        Years of Experience
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name="yearsOfExperience"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                    />
                                                    <ErrorMessage name="yearsOfExperience" component="div" className="mt-1 text-sm text-red-600" />
                                                </div>

                                                <div>
                                                    <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                                                        Category
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="categoryId"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                    >
                                                        <option value="">Select a category</option>
                                                        {categories.map((category) => (
                                                            <option key={category._id} value={category._id}>
                                                                {category.title}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="categoryId" component="div" className="mt-1 text-sm text-red-600" />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="serviceDescription" className="block text-sm font-medium text-gray-700">
                                                    Service Description
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name="serviceDescription"
                                                    rows={3}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                />
                                                <ErrorMessage name="serviceDescription" component="div" className="mt-1 text-sm text-red-600" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label htmlFor="serviceDuration" className="block text-sm font-medium text-gray-700">
                                                        Duration
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="serviceDuration"
                                                        placeholder="e.g., 8 hours"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                    />
                                                    <ErrorMessage name="serviceDuration" component="div" className="mt-1 text-sm text-red-600" />
                                                </div>

                                                <div>
                                                    <label htmlFor="servicePrice" className="block text-sm font-medium text-gray-700">
                                                        Price
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name="servicePrice"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                    />
                                                    <ErrorMessage name="servicePrice" component="div" className="mt-1 text-sm text-red-600" />
                                                </div>

                                                <div>
                                                    <label htmlFor="additionalHourFee" className="block text-sm font-medium text-gray-700">
                                                        Additional Hour Fee
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name="additionalHourFee"
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                    />
                                                    <ErrorMessage name="additionalHourFee" component="div" className="mt-1 text-sm text-red-600" />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="cancellationPolicy" className="block text-sm font-medium text-gray-700">
                                                    Cancellation Policy
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name="cancellationPolicy"
                                                    rows={2}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                />
                                                <ErrorMessage name="cancellationPolicy" component="div" className="mt-1 text-sm text-red-600" />
                                            </div>

                                            <div>
                                                <label htmlFor="termsAndCondition" className="block text-sm font-medium text-gray-700">
                                                    Terms and Conditions
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name="termsAndCondition"
                                                    rows={2}
                                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                                />
                                                <ErrorMessage name="termsAndCondition" component="div" className="mt-1 text-sm text-red-600" />
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4 border-t">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOpen(false)}
                                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                                                >
                                                    {data ? 'Edit Service' : 'Add service'}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddServiceModal;