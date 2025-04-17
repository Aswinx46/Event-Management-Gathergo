// import React from "react";
// import { motion } from "framer-motion";
// import { MapPin } from "lucide-react";

// // This is a placeholder component for the map integration
// // You'll replace this with your actual map component later
// const LocationSection: React.FC = () => {
//   return (
//     <motion.div
//       className="h-64 bg-gray-100 rounded-lg flex items-center justify-center"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       <div className="text-center">
//         <MapPin className="h-8 w-8 text-purple-500 mx-auto mb-2" />
//         <h4 className="text-lg font-medium">Map Integration</h4>
//         <p className="text-sm text-gray-500 max-w-md">
//           Your map component will be placed here.
//           <br />
//           You'll be able to select the exact location for your event.
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// export default LocationSection;

// components/EventLocationMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import LocationSearch from './LocationSearch';
interface LocationSectionProps {
  setLatitude: React.Dispatch<React.SetStateAction<number>>
  setLongitude: React.Dispatch<React.SetStateAction<number>>
}
const LocationSection: React.FC<LocationSectionProps> = ({ setLatitude, setLongitude }) => {
  const [position, setPosition] = useState<[number, number]>([10.074338, 76.271362]); // default: Kochi
  useEffect(() => {
    setLatitude(position[0]);
    setLongitude(position[1]);
  }, [position]); 
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationSearch setPosition={setPosition} />
      <Marker position={position}>
        <Popup>
          Selected Location
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationSection;
