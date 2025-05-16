import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "../ui/button";
import { X } from "lucide-react";

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
    (_croppedArea: Area,croppedPixels: Area) => {
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
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md z-50 flex justify-center items-center">
      <div className="relative w-[90%] max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => showCropper(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors backdrop-blur-sm text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8 pb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Perfect Your Image
          </h2>

          <div className="relative h-[450px] rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-200/50 shadow-inner">
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
                cropAreaClassName: "border-2 border-white shadow-2xl rounded-lg",
                mediaClassName: "rounded-lg"
              }}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-medium text-gray-700">Zoom</span>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-sm font-medium text-gray-500 tabular-nums w-12">
                {zoom.toFixed(1)}x
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => showCropper(false)}
              variant="outline"
              className="px-5 py-2.5 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageCropper);
