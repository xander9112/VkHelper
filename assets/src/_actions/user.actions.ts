import {createAction} from "redux-actions";
import {userConstants} from "../_constants";
import {userService} from "../_services";
import {alertActions} from "./";
import {history} from "../_helpers";

const login = (email, password) => {
  return async dispatch => {
    dispatch(request());

    try {
      const user = await userService.login(email, password);

      await dispatch(success(user));
      history.push("/");
    } catch (error) {
      await dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };

  function request() {
    return createAction(userConstants.LOGIN_REQUEST)();

  }

  function success(user) {
    return createAction(userConstants.LOGIN_SUCCESS)(user);
  }

  function failure(error) {
    return createAction(userConstants.LOGIN_FAILURE)(error);
  }
};

const logout = () => {
  return async dispatch => {
    await userService.logout();

    return dispatch(createAction(userConstants.LOGOUT)());
  };
};

export const userActions = {
  login,
  logout
};
