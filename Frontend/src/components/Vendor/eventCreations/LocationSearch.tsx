import {  useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

const LocationSearch = ({ setPosition }: { setPosition: (pos: [number, number]) => void }) => {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — because GeoSearchControl doesn't have types
        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar',
            autoClose: true,
            searchLabel: 'Enter address',
            keepResult: true,
        });

        map.addControl(searchControl);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map.on('geosearch/showlocation', (result: any) => {
            const { x, y } = result.location;
            setPosition([y, x]); // y = lat, x = lng
        });

        return () => {
            map.removeControl(searchControl);
        };
    }, [map, setPosition]);

    return null;
};

export default LocationSearch;
