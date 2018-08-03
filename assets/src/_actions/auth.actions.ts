import {createAction} from "redux-actions";
import {authConstants} from "../_constants";
import {authService} from "../_services";
import {alertActions} from "./";
import {history} from "../_helpers";

const login = (email, password) => {
  return async dispatch => {
    dispatch(request());

    try {
      const user = await authService.login(email, password);
      console.log(user);
      await dispatch(success(user));
      history.push("/");
    } catch (error) {
      await dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };

  function request() {
    return createAction(authConstants.LOGIN_REQUEST)();

  }

  function success(user) {
    return createAction(authConstants.LOGIN_SUCCESS)(user);
  }

  function failure(error) {
    return createAction(authConstants.LOGIN_FAILURE)(error);
  }
};

const logout = async () => {
  return async dispatch => {
    await authService.logout();

    dispatch(createAction(authConstants.LOGOUT)());
  };
};

export const authActions = {
  login,
  logout
};
