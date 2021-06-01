import React, { useState, useEffect } from 'react';
import { NativeRouter, Link, Route } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Views
import {
  LoginView,
  PasswordView,
  SignUpView,
  HomeView,
  NewPasswordView,
  BagView,
  ProfileView
} from "./src/views";

import { Routes } from "./src/utils/constants";
import { theme } from "./src/utils/theme";

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

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
          <NativeRouter>
            <Spinner
              animation="fade"
              visible={spinner}
              textStyle={{color: "#FFF"}}
              overlayColor="rgba(0, 0, 0, .4)"
            />

            <View style={styles.container}>
              <Route exact path={Routes.Login}>
                <LoginView onLoad={handleLoading}/>
              </Route>
              <Route exact path={Routes.SignUp}>
                <SignUpView />
              </Route>
              <Route exact path={Routes.Password}>
                <PasswordView />
              </Route>
              <Route exact path={Routes.NewPassword}>
                <NewPasswordView/>
              </Route>

              <Route exact path={Routes.Home}>
                <HomeView position={position} />
              </Route>
              <Route exact path={Routes.Profile}>
                <ProfileView />
              </Route>
              <Route exact path={Routes.Bag}>
                <BagView />
              </Route>
            </View>
            <StatusBar style="auto" />
          </NativeRouter>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default App;