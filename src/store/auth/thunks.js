import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthentication = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoURL } = await registerUserWithEmailAndPassword({
      email,
      password,
      displayName,
    });
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await loginWithEmailAndPassword({ email, password });
    if (!result.ok) return dispatch(logout(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
