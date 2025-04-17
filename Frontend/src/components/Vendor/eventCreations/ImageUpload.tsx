
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageUploaded: (imageUrls: string[]) => void;
  setImageFiles: React.Dispatch<React.SetStateAction<File[] | null>>
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded, setImageFiles }) => {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageStrings, setImageStrings] = useState<string[]>()
  // Placeholder image URLs for demo purposes
  // const placeholderImages = [
  //   "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  //   "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  // ];

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    // In a real application, you would handle file upload to a storage service here
    // For demo purposes, we'll just simulate an upload delay and select multiple random images
    setLoading(true);

    setTimeout(() => {
      // Get multiple random placeholder images
      const randomImages = [];
      const numberOfImages = Math.floor(Math.random() * 3) + 1; // Random number between 1-3

      for (let i = 0; i < numberOfImages; i++) {
        const randomIndex = Math.floor(Math.random() * selectedImages.length);
        randomImages.push(placeholderImages[randomIndex]);
      }

      setSelectedImages(randomImages);
      onImageUploaded(randomImages);
      setLoading(false);
    }, 1000);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setLoading(true)
      const fileArray = Array.from(files)
      const fileUrls = fileArray.map((file) => URL.createObjectURL(file))
      setSelectedImages(fileUrls)
      onImageUploaded(fileUrls)
      setImageFiles(fileArray)
      setLoading(false)
      e.target.value = "";

    }
  };

  const handleSelectPlaceholder = (url: string) => {
    const newImages = [url];
    setSelectedImages(newImages);
    onImageUploaded(newImages);
  };

  return (
    <div className="space-y-4">
      <motion.div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${dragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-purple-500 mb-2" />
          <h4 className="text-sm font-medium">
            Drag and drop images, or <label htmlFor="fileInput" className="text-purple-600 cursor-pointer hover:underline">browse</label>
          </h4>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInput}
            disabled={loading}
          />
          <p className="text-xs text-gray-500">
            Supported formats: JPEG, PNG, GIF up to 10MB (can select multiple)
          </p>
        </div>
      </motion.div>

      {/* <div>
        <h4 className="text-sm font-medium mb-2">Or select placeholder images:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {placeholderImages?.map((url, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer rounded-md overflow-hidden"
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSelectPlaceholder(url)}
            >
              <img
                src={url}
                alt={`Placeholder ${index + 1}`}
                className="h-20 w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ImageUpload;