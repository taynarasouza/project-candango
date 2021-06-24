import {all, takeLatest, call, put} from 'redux-saga/effects';

import {Alert} from 'react-native';
import api from '../../../services/api';

import {setMarkers} from '../markers/actions';
import {updateProfileSuccess, updateProfileFailure, visitAttractionSuccess, visitAttractionFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const { 
      name,
      gender,
      phone,
      email,
      password,
      state,
      country, 
      ...rest
    } = payload.data;

    const profile = {
      name,
      gender,
      phone,
      email,
      password,
      state,
      country,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'user', profile);

    Alert.alert('Perfil atualizado com sucesso!');

    const { user } = response.data;

    yield put(updateProfileSuccess(user));
  } catch (error) {
    Alert.alert('Falha ao atualizar perfil', error.response.data.error);
    yield put(updateProfileFailure());
  }
}

export function* getUserMedal({payload}) {
  try {
    const { attractionCode, markers } = payload;

    const response = yield call(api.post, 'attractions/user', { attractionCode });

    const { exp, medalStatus, userVisitedAttractions } = response.data;

    const upmarkers = markers.reduce((res, pt) => {
      pt.hasVisited = userVisitedAttractions.length > 0 && userVisitedAttractions.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).length > 0;
      res.push(pt);
      return res;
    }, []);

    yield put(setMarkers(upmarkers));
    yield put(visitAttractionSuccess({ exp }));
    Alert.alert("Ponto turísitco visitado", medalStatus);

  } catch (error) {
    console.log(error);
    Alert.alert('Falha ao pegar medalha');
    yield put(visitAttractionFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/VISIT_ATTRACTION_REQUEST', getUserMedal)
]);
