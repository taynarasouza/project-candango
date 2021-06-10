import {all, takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';

import {signInSuccess, signFailure} from './actions';

import api from './../../../services/api';
//import history from '~/services/history';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, 'signin', {
      email,
      password,
    });

    const { userInfo } = response.data;
    const { headers } = response;

    let cookieHeader = headers["set-cookie"][0];
    let cookie = cookieHeader.split('; ')[0];

    // console.tron.log(headers);

    // // Seta o token no Header Authorization, necessário na api
    // api.defaults.headers.Authorization = `Bearer ${token}`;
    // api.defaults.headers['Cookie'] = cookie;
    // // api.defaults.headers['cookie'] = cookie;
    // // api.defaults.headers.Authorization = cookie;

    yield put(signInSuccess(cookie, userInfo));

    // history.push("/home");

  } catch (error) {
    Alert.alert('Falha na autenticação', error.response.data.error);
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, gender, phone, email, password, state, country} = payload;

    const response = yield call(api.post, 'signup', {
      name,
      gender,
      phone,
      email,
      password,
      state,
      country
    });

    Alert.alert('Cadastro realizado com sucesso!');

    const { usuarioInfo } = response.data;
    const { headers } = response;

    let cookieHeader = headers["set-cookie"][0];
    let cookie = cookieHeader.split('; ')[0];

    yield put(signInSuccess(cookie, usuarioInfo));
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
