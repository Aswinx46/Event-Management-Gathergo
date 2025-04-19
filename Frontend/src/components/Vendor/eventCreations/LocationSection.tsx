
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
