import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'candango',
      storage: AsyncStorage,
      whiteList: ['auth', 'user'],
    },
    reducers,
  );
  return persistedReducer;
};

