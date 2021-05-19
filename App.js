import React, { useState } from 'react';
import { NativeRouter, Link, Route } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

// Import Views
import LoginView from "./src/views/LoginView";
import PasswordView from "./src/views/PasswordView";
import SignUpView from "./src/views/SignUpView";
import HomeView from "./src/views/HomeView";
import NewPasswordView from './src/views/NewPasswordView';

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
          <Route exact path="/signup">
            <SignUpView />
          </Route>
          <Route exact path="/password">
            <PasswordView />
          </Route>
          <Route exact path="/password/generate">
            <NewPasswordView/>
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