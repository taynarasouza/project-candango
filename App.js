import React, { useState } from 'react';
import { NativeRouter, Link, Route } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Import Views
import LoginView from "./views/LoginView";
import PasswordView from "./views/PasswordView";
import SignUpView from "./views/SignUpView";
import HomeView from "./views/HomeView";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000099',
    // accent: '#f1c40f',
    // background: '', // background color for pages, such as lists.
    // surface: '', //background color for elements containing content, such as cards
    // text: '', //text color for content
    //disabled: '', //color for disabled elements
    //placeholder: '', //color for placeholder text, such as input placeholder.
    //backdrop: '', //color for backdrops of various components such as modals
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path="/">
            <LoginView />
          </Route>
          <Route exact path="/signup">
            <SignUpView />
          </Route>
          <Route exact path="/password">
            <PasswordView />
          </Route>
          <Route exact path="/home">
            <HomeView />
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