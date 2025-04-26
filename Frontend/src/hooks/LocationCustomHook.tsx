import { useEffect, useState } from 'react'

function useUserLocation() {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, (err) => {
            setError('Location access Denied or unavailable')
            console.log(err)
        })

    }, [])

    return { location, error };
}

export default useUserLocation
