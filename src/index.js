import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function Index() {
    const [spinner, setSpinner] = useState(false);
    const [position, setPosition] = useState({
        latitude: 0,
        longitude: 0
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        position => {
            console.log("--- My position ---");
            console.log(position);
            console.log("-------------------")
            setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            });
        },
        error => console.error(error),
        { 
            enableHighAccuracy: false, 
            timeout: 200000, 
            maximumAge: 1000 
        },
        );
    }, []);

    const signed = useSelector(state => state.auth.signed);

    const Routes = createRouter(signed, position);

    return <Routes  />;
}