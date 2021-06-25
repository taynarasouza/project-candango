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
    const visited = userVisitedAttractions;
    const upmarkers = markers.reduce((res, pt) => {
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
