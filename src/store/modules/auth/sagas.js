import {all, takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';

import {signInSuccess, signFailure, signOutSucess} from './actions';
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

    const { user, attractions, userVisitedAttractions } = response.data;
    const { headers } = response;

    let cookie = headers["set-cookie"];
    let visited = userVisitedAttractions;

    const markers = attractions.reduce((res, pt) => {
      const isOk = visited.length > 0 && visited.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).length > 0;
      const hasMedal =  isOk;
      const qtdVisits = isOk && visited.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).map(ptv => ptv.ammountVisits)[0];
      const expVisitF = isOk && visited.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).map(ptv => ptv.lastVisit)[0];
      const expVisitD = isOk && visited.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).map(ptv => ptv.lastVisit1)[0];

      pt.hasMedal = hasMedal;
      pt.qtdVisits = qtdVisits;
      pt.expirationDate = {
        default: expVisitD,
        formatted: expVisitF
      };
      
      res.push(pt);
      return res;
    }, []);

    yield put(setMarkers(markers));
    yield put(signInSuccess(cookie, user));

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

    const { user, attractions } = response.data;
    const { headers } = response;

    let cookieHeader = headers["set-cookie"][0];
    let cookie = cookieHeader.split('; ')[0];

    const markers = attractions.reduce((res, pt) => {
      pt.hasMedal = false;
      pt.qtdVisits = 0;
      pt.expirationDate = {
        default: "",
        formatted: ""
      };
      
      res.push(pt);
      return res;
    }, []);

    yield put(setMarkers(markers));
    yield put(signInSuccess(cookie, user));
  } catch (error) {
    Alert.alert('Falha no cadastro', error.response.data.error);
    yield put(signFailure());
  }
}
export function* signOut() {
  try {

    const response = yield call(api.get, 'user/signout');

    yield put(signOutSucess());

  } catch (error) {
      // if (error.toString().indexOf("401") !== -1) {}
    Alert.alert('Falha no logout', error.response.data.error);
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
  takeLatest('@auth/SIGN_OUT_REQUEST', signOut),
  takeLatest('persist/REHYDRATE', setToken), // action disparado pelo persist
]);
