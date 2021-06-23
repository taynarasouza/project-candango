export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, gender, phone, email, password, state, country) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, gender, phone, email, password, state, country },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOutRequest() {
  return {
    type: '@auth/SIGN_OUT_REQUEST',
  };
}

export function signOutSucess() {
  return {
    type: '@auth/SIGN_OUT_SUCCESS',
  };
}
