

import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import FormHeader from "./FormHeader";
import BasicInfoForm from "./BasicInfoForm";
import ScheduleForm from "./ScheduleForm";
import LocationForm from "./LocationForm";
import TicketForm from "./TicketForm";
import ReviewForm from "./ReviewForm";
import FormNavigation from "./FormNavigation";
import { EventType } from "@/types/EventType";
import { useCreateEvent, useUploadeImageToCloudinaryMutation } from "@/hooks/VendorCustomHooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// Step-specific validation schemas
const basicInfoValidation = Yup.object({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .required("Title is required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .required("Description is required"),
    category: Yup.string().required("Category is required"),
    // posterImage: Yup.array().min(1, "At least one image is required"),
});


const scheduleValidation = Yup.object({
    date: Yup.array()
        .min(1, "At least one date is required")
        .test(
            "no-past-date",
            "Dates must be today or in the future",
            (dates) => {
                if (!dates || dates.length === 0) return false;

                const today = new Date();
                today.setHours(0, 0, 0, 0); // remove time part for accurate comparison

                return dates.every((d) => {
                    const date = new Date(d);
                    date.setHours(0, 0, 0, 0);
                    return date >= today;
                });
            }
        ),
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),
});


// const locationValidation = Yup.object({
//     location: Yup.object({
//         latitude: Yup.number().required("Location is required"),
//         longitude: Yup.number().required("Location is required"),
//     }),
//     address: Yup.string().required("Address is required"),
//     venueName: Yup.string().required("Venue name is required"),
// });

const locationValidation = Yup.object({
    location: Yup.object({
        type: Yup.string().oneOf(["Point"]).required("Location type is required"),
        coordinates: Yup.array()
            .of(Yup.number().required("Coordinates must be numbers"))
            .length(2, "Coordinates must have exactly two values (latitude and longitude)")
            .required("Coordinates are required"),
    }),
    address: Yup.string().required("Address is required"),
    venueName: Yup.string().required("Venue name is required"),
});

const ticketValidation = Yup.object({
    pricePerTicket: Yup.number().min(0, "Price cannot be negative").required("Price is required"),
    maxTicketsPerUser: Yup.number().min(1, "Minimum 1 ticket per user").required("This field is required"),
    totalTicket: Yup.number().min(1, "Must have at least 1 ticket").required("This field is required"),
});

// Main validation schema (unchanged)
const validationSchema = Yup.object({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .required("Title is required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .required("Description is required"),
    category: Yup.string().required("Category is required"),
    venueName: Yup.string(),
    address: Yup.string(),
    pricePerTicket: Yup.number().min(0, "Price cannot be negative").required("Price is required"),
    maxTicketsPerUser: Yup.number().min(1, "Minimum 1 ticket per user").required("This field is required"),
    totalTicket: Yup.number().min(1, "Must have at least 1 ticket").required("This field is required"),
    status: Yup.string().oneOf(["upcoming", "completed", "cancelled"], "Invalid status").default("upcoming"),
});

const EventCreationForm: React.FC = () => {
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const [dates, setDates] = useState<Date[]>([new Date()]);
    const [startTime, setStartTime] = useState<string>("10:00");
    const [endTime, setEndTime] = useState<string>("18:00");
    const [posterImages, setPosterImages] = useState<File[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_isStepValid, setIsStepValid] = useState(true);
    const initialValues: EventType = {
        title: "",
        description: "",
        location: {
            type: "Point",
            coordinates: [0, 0]
        },
        startTime: new Date(),
        endTime: new Date(),
        posterImage: [],
        pricePerTicket: 0,
        maxTicketsPerUser: 1,
        totalTicket: 0,
        date: [],
        createdAt: new Date(),
        ticketPurchased: 0,
        category: "",
        status: "upcoming", // or "completed", "cancelled"
        address: "", // optional
        venueName: "" // optional
    };

    const steps = [
        { id: "basics", label: "Basic Info" },
        { id: "schedule", label: "Schedule" },
        { id: "location", label: "Location" },
        { id: "tickets", label: "Ticket Info" },
        { id: "review", label: "Review" }
    ];

    const checkStepValidation = async (values: EventType, currentStep: number) => {
        try {
            switch (currentStep) {
                case 0:
                    await basicInfoValidation.validate({
                        title: values.title,
                        description: values.description,
                        category: values.category,
                        posterImage: values.posterImage
                    }, { abortEarly: false });
                    break;
                case 1:
                    await scheduleValidation.validate({
                        date: dates,
                        startTime,
                        endTime
                    }, { abortEarly: false });
                    break;
                case 2:
                    await locationValidation.validate({
                        location: values.location,
                        address: values.address,
                        venueName: values.venueName
                    }, { abortEarly: false });
                    break;
                case 3:
                    await ticketValidation.validate({
                        pricePerTicket: values.pricePerTicket,
                        maxTicketsPerUser: values.maxTicketsPerUser,
                        totalTicket: values.totalTicket
                    }, { abortEarly: false });
                    break;
                default:
                    return true;
            }
            return true;
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                console.log(error.inner)
                error.inner.forEach((err) => {
                    toast.error(err.message);
                });
            }
            return false;
        }
    };

    const nextStep = async (values: EventType) => {
        if (currentStep < steps.length - 1) {
            const isValid = await checkStepValidation(values, currentStep);
            setIsStepValid(isValid);
            if (isValid) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleUpdateImage = useUploadeImageToCloudinaryMutation()
    const createEvent = useCreateEvent()
    const navigate = useNavigate()
    const handleCreateEvent = async (values: EventType, { setSubmitting }: FormikHelpers<EventType>) => {
        console.log('handleCreateEvent called with values:', values);
        if (!vendorId) {
            toast.error("Please Login")
            console.log('Vendor Id not found')
            return
        }
        const imageUrls = []
        values.posterImage = posterImages
        if (!values.posterImage || values.posterImage.length === 0) {
            toast.error("Please select at least one image.");
            setSubmitting(false);
            return;
        }
        try {
            for (const file of values.posterImage) {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('upload_preset', 'Events')
                const res = await handleUpdateImage.mutateAsync(formData)
                imageUrls.push(res.secure_url)
            }
        } catch (error) {
            console.log('error while uploading Event images to cloudinary', error)
        }


        const event = {
            ...values,
            date: dates,
            startTime: new Date(`2000-01-01T${startTime}`),
            endTime: new Date(`2000-01-01T${endTime}`),
            posterImage: imageUrls,
            createdAt: new Date(),
            attendees: [],
            ticketPurchased: 0,

        };


        createEvent.mutate({ event, vendorId }, {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onSuccess: () => {
                // toast("Event Created", {
                //     description: "Your event has been created successfully!",
                // });
                toast.success("event created")
                // toast.success(data.message)
                navigate('/vendor/home')
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })




        setSubmitting(false);
    };

    return (
        <div className="max-w-4xl h-[100vh] overflow-hidden overflow-y-scroll hide-scrollbar mx-auto pb-3">
            <FormHeader
                steps={steps}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleCreateEvent}
            >
                {({ values, setFieldValue, handleSubmit, isSubmitting }) => {
                    // Check validation on every render
                    // const currentStepValid = checkStepValidation(values, currentStep);
                    // Promise.resolve(currentStepValid).then(setIsStepValid);

                    return (
                        <Form>
                            {/* Step 1: Basic Information */}
                            {currentStep === 0 && (
                                <BasicInfoForm
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    posterImages={posterImages}
                                    setPosterImages={setPosterImages}
                                />
                            )}

                            {/* Step 2: Schedule */}
                            {currentStep === 1 && (
                                <ScheduleForm
                                    dates={dates}
                                    setDates={setDates}
                                    startTime={startTime}
                                    setStartTime={setStartTime}
                                    endTime={endTime}
                                    setEndTime={setEndTime}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                            )}

                            {/* Step 3: Location */}
                            {currentStep === 2 && (
                                <LocationForm values={values} />
                            )}

                            {/* Step 4: Ticket Information */}
                            {currentStep === 3 && (
                                <TicketForm values={values} />
                            )}

                            {/* Step 5: Review */}
                            {currentStep === 4 && (
                                <ReviewForm
                                    values={values}
                                    dates={dates}
                                    startTime={startTime}
                                    endTime={endTime}
                                    posterImages={posterImages}
                                />
                            )}

                            <FormNavigation
                                currentStep={currentStep}
                                steps={steps}
                                prevStep={prevStep}
                                nextStep={() => nextStep(values)}
                                isSubmitting={isSubmitting}
                                onSubmit={handleSubmit}
                            // isStepValid={isStepValid}
                            // errors={errors}
                            // touched={touched}
                            />
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default EventCreationForm;