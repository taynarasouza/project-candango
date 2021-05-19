import React, { useState } from 'react';
import { NativeRouter, Link, Route } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

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

function App() {
  const [spinner, setSpinner] = useState(false);

  const handleLoading = loading => {
    setSpinner(loading);
  };

  return (
    <PaperProvider theme={theme}>
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
            <HomeView />
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