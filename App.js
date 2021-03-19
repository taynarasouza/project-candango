import React, { useState } from 'react';
import { NativeRouter, Link, Route } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';

// Import Views
import LoginView from "./views/LoginView";
import PasswordView from "./views/PasswordView";
import SignUpView from "./views/SignUpView";
import HomeView from "./views/HomeView";

function App() {
  return (
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