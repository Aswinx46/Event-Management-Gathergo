
import React, {  useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import ImageCropper from "@/components/other components/ImageCropper";
// import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageUploaded: (imageUrls: string[]) => void;
  setPosterImage: React.Dispatch<React.SetStateAction<File[]>>
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  
  setPosterImage,
}) => {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [currentImageString, setCurrentImageString] = useState<string>("");

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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setLoading(true);
      setShowCropper(true);
      const url = URL.createObjectURL(files[0]);
      setCurrentImageString(url);
   
      // don't update fileArray or selectedImages here; wait for cropComplete
      e.target.value = "";
      setLoading(false);
    }
  };

  const handleCropComplete = (croppedBlob: File | null) => {
    console.log('crop complete', croppedBlob)
    // setPosterImage((prev) => [...(prev || []), croppedBlob!])
    setPosterImage((prev) => [...prev, croppedBlob!]);

  }

  // when cropping is done, update fileArray and preview
  // useEffect(() => {
  //   if (cropComplete) {
  //     setFileArray((prev) => {
  //       const updatedArray = [...prev, cropComplete];
  //       const fileUrls = updatedArray.map((file) =>
  //         URL.createObjectURL(file)
  //       );
  //       setSelectedImages(fileUrls);
  //       onImageUploaded(fileUrls);
  //       setImageFiles(updatedArray);
  //       return updatedArray;
  //     });
  //     setCropComplete(null); // reset after processing
  //   }
  // }, [cropComplete, onImageUploaded, setImageFiles]);



  return (
    <div className="space-y-4">
      <motion.div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${dragging ? "border-purple-500 bg-purple-50" : "border-gray-300"
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        // onDrop={handleDrop}
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


      {showCropper && <ImageCropper showCropper={setShowCropper} image={currentImageString} onCropComplete={handleCropComplete} />}
    </div>
  );
};

export default ImageUpload;