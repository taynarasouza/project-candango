import React from 'react';
import { NativeRouter, Link, Route } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import LoginView from "./views/LoginView";

//TODO: Implementar imagem logo.png

function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Route exact path="/">
          <LoginView />
        </Route>
        {/*<Route path="/home" component={About} />*/}
        {/*<Route path="/topics" component={Topics} />*/}
      </View>
      <StatusBar style="auto" />
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

export default App;