import {all, takeLatest, call, put} from 'redux-saga/effects';

import {Alert} from 'react-native';
import api from '../../../services/api';

import {updateProfileSuccess, updateProfileFailure, visitAttractionSuccess, visitAttractionFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const { 
      name, gender, phone, email, password, state, country 
    } = payload.data;

    const response = yield call(api.put, 'user', {
      name,
      gender,
      phone,
      email,
      password,
      state,
      country
    });

    Alert.alert('Perfil atualizado com sucesso!');

    const { userInfo } = response.data;

    yield put(updateProfileSuccess(userInfo));
  } catch (error) {
    Alert.alert('Falha ao atualizar perfil', error.response.data.error);
    yield put(updateProfileFailure());
  }
}

export function* getUserMedal({payload}) {
  try {
    const { attractionCode, exp } = payload.data;

    yield call(api.post, 'attractions/user', { attractionCode });

    Alert.alert('Medalha resgatada e essa nova experiência já foi registrada. Continue jogando e subindo de nível!');

    yield put(visitAttractionSuccess({ exp }));
  } catch (error) {
    Alert.alert('Falha ao pegar medalha');
    yield put(visitAttractionFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/VISIT_ATTRACTION_REQUEST', getUserMedal)
]);
