import {all, takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";

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

    showMessage({
      message: "Perfil atualizado com sucesso!",
      type: "success",
    });

    const { user } = response.data;

    yield put(updateProfileSuccess(user));
  } catch (error) {
    Alert.alert('Falha ao atualizar perfil', error.response.data.error);
    yield put(updateProfileFailure());
  }
}

export function* getUserMedal({payload}) {
  try {
    const { attractionCode } = payload;

    const response = yield call(api.post, 'attractions/user', { attractionCode });
    
    const { exp, medalStatus, attractions, userVisitedAttraction } = response.data;
    const visited = userVisitedAttraction;

    const upmarkers = attractions.reduce((res, pt) => {
      let hasMedal = false;
      let qtdVisits = 0;
      let expVisitF = "";
      let expVisitD = "";
      if (visited.length > 0 && visited.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).length > 0) {
        hasMedal = true;
        qtdVisits = visited.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).map(ptv => ptv.ammountVisits)[0];
        expVisitF = visited.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).map(ptv => ptv.lastVisit)[0];
        expVisitD = visited.filter(ptv => ptv.attractionCode.toString() === pt.codLocal.toString()).map(ptv => ptv.lastVisit1)[0];
      }

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
    Alert.alert("Ponto turístico visitado", medalStatus);
    

  } catch (error) {
    console.log(error);
    Alert.alert('Falha ao visitar ponto turístico');
    yield put(visitAttractionFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/VISIT_ATTRACTION_REQUEST', getUserMedal)
]);
