
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { EventType } from "@/types/EventType";

interface BasicInfoFormProps {
  values: EventType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any) => void;
  posterImages: File[] 
  setPosterImages: (images: File[]) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  values,
  setFieldValue,
  posterImages,
  setPosterImages
}) => {
  const handleImageUpload = (imageUrls: string[]) => {
    console.log(imageUrls)
    // setPosterImages([...posterImages, ...imageUrls]);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFiles, setImageFiles] = useState<File[] | null>([])

  console.log('image files',imageFiles)
  values.posterImage = imageFiles
  const handleRemoveImage = (index: number) => {
    const newImages = [...posterImages];
    newImages.splice(index, 1);
    setPosterImages(newImages);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-lg shadow-sm mb-8"
    >
      <motion.h3
        variants={itemVariants}
        className="text-xl font-semibold mb-6 text-purple-800"
      >
        Basic Information
      </motion.h3>

      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="title" className="block text-sm font-medium mb-1">
          Event Title <span className="text-red-500">*</span>
        </Label>
        <Field
          as={Input}
          id="title"
          name="title"
          placeholder="Give your event a clear, catchy title"
          className="w-full"
        />
        <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="description" className="block text-sm font-medium mb-1">
          Event Description <span className="text-red-500">*</span>
        </Label>
        <Field
          as={Textarea}
          id="description"
          name="description"
          placeholder="Describe your event in detail"
          className="w-full min-h-[150px]"
        />
        <ErrorMessage name="description" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="category" className="block text-sm font-medium mb-1">
          Category <span className="text-red-500">*</span>
        </Label>
        <Select
          defaultValue={values.category}
          onValueChange={(value) => setFieldValue("category", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conference">Conference</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="concert">Concert</SelectItem>
            <SelectItem value="festival">Festival</SelectItem>
            <SelectItem value="networking">Networking</SelectItem>
            <SelectItem value="exhibition">Exhibition</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage name="category" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <Label className="block text-sm font-medium mb-1">
          Event Poster Images
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {posterImages?.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Event poster ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
        <ImageUpload onImageUploaded={handleImageUpload} setPosterImage={setPosterImages} />
      </motion.div>
    </motion.div>
  );
};

export default React.memo(BasicInfoForm)