import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { theme } from "./src/utils/theme";

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import AppIndex from './src';

import './src/config/ReactotronConfig';

import {store, persistor} from './src/store';

function App() {
  const [spinner, setSpinner] = useState(false);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });

  const handleLoading = loading => {
    setSpinner(loading);
  };

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

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppIndex />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

export default App;