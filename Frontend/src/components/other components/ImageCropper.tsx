import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "../ui/button";

interface ImageCropperProps {
  image: string;
  onCropComplete?: (croppedBlob: File | null) => void;
  aspect?: number;
  showCropper: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropComplete,
  aspect = 4 / 3,
  showCropper
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);


  const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedPixels: Area) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const getCroppedBlob = async (): Promise<Blob | null> => {
    if (!image || !croppedAreaPixels) return null;

    const canvas = document.createElement("canvas");
    const img = await createImage(image);
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png"); 
    });
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });

  const handleSubmit = async () => {
    const croppedBlob = await getCroppedBlob();
    showCropper(false)
    
    if (croppedBlob && onCropComplete) {
      const croppedFile = new File([croppedBlob], "cropped-image.png", { type: "image/png" });
      console.log(croppedFile)
      onCropComplete(croppedFile); 
    }
  };

  return (
    <div className="absolute h-screen w-screen top-0 right-0 z-50 backdrop-blur-sm flex justify-center items-center flex-col gap-3">
      <div className="relative w-1/2 h-[400px]">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={handleCropComplete}
          classes={{
            containerClassName: "relative w-full h-full",
            cropAreaClassName: "border-2 border-dashed border-white",
          }}
        />
      </div>
      <Button className="text-white bg-red-500" onClick={handleSubmit}>
        SUBMIT
      </Button>
    </div>
  );
};

export default ImageCropper;
