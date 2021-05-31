import {all, takeLatest, call, put} from 'redux-saga/effects';
import { useHistory } from 'react-router-native';
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

    const { usuarioInfo } = response.data;
    const { headers } = response;

    let cookieHeader = headers["set-cookie"][0];
    let cookie = cookieHeader.split('; ')[0];

    // // Seta o token no Header Authorization, necessário na api
    // api.defaults.headers.Authorization = `Bearer ${cookie}`;
    api.defaults.headers['Cookie'] = cookie;

    yield put(signInSuccess(cookie, usuarioInfo));

    // history.push("/home");

  } catch (error) {
    Alert.alert('Falha na autenticação', error.response.data.error);
    console.tron.log("err", err);
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    //history.push('/');
    Alert.alert('Cadastro realizado com sucesso!');
  } catch (err) {
    Alert.alert('Falha no cadastro', 'verifique seus dados');
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
