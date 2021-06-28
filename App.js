import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from "react-native-flash-message";
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import { theme } from "./src/utils/theme";

import AppIndex from './src';

import './src/config/ReactotronConfig';

import {store, persistor} from './src/store';

function App() {

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppIndex />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

export default App;