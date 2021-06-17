import {all, takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';

import {signInSuccess, signFailure} from './actions';
import {setMarkers} from '../markers/actions';

import api from './../../../services/api';
//import history from '~/services/history';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, 'user/signin', {
      email,
      password,
    });

    const { user, attractions } = response.data;
    const { headers } = response;

    let cookieHeader = headers["set-cookie"][0];
    let cookie = cookieHeader.split('; ')[0];

    // console.tron.log(headers);

    // // Seta o token no Header Authorization, necessário na api
    // api.defaults.headers.Authorization = `Bearer ${token}`;
    // api.defaults.headers['Cookie'] = cookie;
    // // api.defaults.headers['cookie'] = cookie;
    // // api.defaults.headers.Authorization = cookie;

    const markers = attractions["pontos turisticos"].map(a => ({...a}));
    console.log(markers);

    yield put(setMarkers(attractions["pontos turisticos"]));
    yield put(signInSuccess(cookie, user));

    // history.push("/home");

  } catch (error) {
    Alert.alert('Falha na autenticação', error.response.data.error);
    yield put(signFailure());
    yield put(setMarkers([]));
  }
}

export function* signUp({payload}) {
  try {
    const {name, gender, phone, email, password, state, country} = payload;

    const response = yield call(api.post, 'user/signup', {
      name,
      gender,
      phone,
      email,
      password,
      state,
      country
    });

    Alert.alert('Cadastro realizado com sucesso!');

    const { userInfo } = response.data;
    const { headers } = response;

    let cookieHeader = headers["set-cookie"][0];
    let cookie = cookieHeader.split('; ')[0];

    yield put(signInSuccess(cookie, userInfo));
  } catch (error) {
    Alert.alert('Falha no cadastro', error.response.data.error);
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) {
    return;
  }

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('persist/REHYDRATE', setToken), // action disparado pelo persist
]);
