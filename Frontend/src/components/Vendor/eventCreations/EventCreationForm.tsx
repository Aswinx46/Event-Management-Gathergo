
import React, { useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import FormHeader from "./FormHeader";
import BasicInfoForm from "./BasicInfoForm";
import ScheduleForm from "./ScheduleForm";
import LocationForm from "./LocationForm";
import TicketForm from "./TicketForm";
import ReviewForm from "./ReviewForm";
import FormNavigation from "./FormNavigation";
import { EventType } from "@/types/EventType";
import { useCreateEvent, useUploadeImageToCloudinaryMutation } from "@/hooks/VendorCustomHooks";

// Define the validation schema using Yup
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

// Define the form values interface
// interface FormValues {
//     title: string;
//     description: string;
//     category: string;
//     venueName: string;
//     address: string;
//     pricePerTicket: number;
//     maxTicketsPerUser: number;
//     totalTicket: number;
//     status: "upcoming" | "completed" | "cancelled";
// }

const EventCreationForm: React.FC = () => {
    const [dates, setDates] = useState<Date[]>([new Date()]);
    const [startTime, setStartTime] = useState<string>("10:00");
    const [endTime, setEndTime] = useState<string>("18:00");
    const [posterImages, setPosterImages] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const initialValues: EventType = {
        title: "",
        description: "",
        location: {
            latitude: 0,
            longitude: 0
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

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleUpdateImage = useUploadeImageToCloudinaryMutation()
    const createEvent = useCreateEvent()
    console.log('handllingggg')
    const handleCreateEvent = async (values: EventType, { setSubmitting }: FormikHelpers<EventType>) => {
        const imageUrls = []

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


        const eventData = {
            ...values,
            date: dates,
            startTime: new Date(`2000-01-01T${startTime}`),
            endTime: new Date(`2000-01-01T${endTime}`),
            posterImage: imageUrls,
            createdAt: new Date(),
            attendees: [],
            ticketPurchased: 0
        };


        console.log("Event data:", eventData);
        createEvent.mutate(eventData, {
            onSuccess: () => {
                toast("Event Created", {
                    description: "Your event has been created successfully!",
                });
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })




        setSubmitting(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
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
                {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
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
                            nextStep={nextStep}
                            isSubmitting={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EventCreationForm;