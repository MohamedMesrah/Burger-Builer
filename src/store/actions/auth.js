import * as actionTypes from "../actions/actionTypes";
import Axios from "axios";

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (idToken, localId) => {
  return { type: actionTypes.AUTH_SUCCESS, idToken, localId };
};

export const authFaild = error => ({
  type: actionTypes.AUTH_FAILD,
  error
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return { type: actionTypes.AUTH_LOGOUT };
};

export const clearErrors = () => ({ type: actionTypes.CLEAR_ERRORS });

export const authCheckTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (email, password, isSignup) => {
  let apiEndPoint =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-tEsk-E1UZMtZWIAZ00PAiS24DrsvtaA";

  return dispatch => {
    if (!isSignup)
      apiEndPoint =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-tEsk-E1UZMtZWIAZ00PAiS24DrsvtaA";

    const data = { email, password, returnSecureToken: true };

    dispatch(authStart());

    Axios.post(apiEndPoint, data)
      .then(res => {
        const token = res.data.idToken;
        const expirationTime = res.data.expiresIn * 1000;
        const expirationDate = new Date(new Date().getTime() + expirationTime);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token, res.data.localId));
        dispatch(authCheckTimeout(expirationTime));
      })
      .catch(error => {
        dispatch(authFaild(error.response.data.error));
      });
  };
};

export const checkAuth = localId => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date().getTime()) {
        dispatch(authSuccess(token, localId));
        dispatch(
          authCheckTimeout(expirationDate.getTime() - new Date().getTime())
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
