export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}

export function setUserPosition(position) {
  return {
    type: '@user/SET_POSITION',
    payload: { position }
  }
}

export function visitAttraction({exp, attractionCode}) {
  return {
    type: '@user/VISIT_ATTRACTION_REQUEST',
    payload: { 
      exp, 
      attractionCode
    }
  }
}

export function visitAttractionSuccess({exp, attractionCode}) {
  return {
    type: '@user/VISIT_ATTRACTION_SUCCESS',
    payload: { 
      exp, 
      attractionCode
    }
  }
}

export function visitAttractionFailure() {
  return {
    type: '@user/VISIT_ATTRACTION_FAILURE'
  }
}
