import {handleActions} from "redux-actions";
import {authConstants} from "../_constants";
import {states} from "../_helpers/config";

const user = JSON.parse(localStorage.getItem("user") || "{}");
const initialState = {
  state: states.NOT_ASKED,
  loggingIn: !!user.user,
  user
};

export const auth = handleActions({
  [authConstants.LOGIN_REQUEST]: (state) => ({
    ...state,
    state: states.LOADING
  }),
  [authConstants.LOGIN_SUCCESS]: (state, {payload}) => ({
    ...state,
    state: states.LOADED,
    loggingIn: true,
    user: payload
  }),
  [authConstants.LOGIN_FAILURE]: (state) => ({
    ...state,
    state: states.FAILURE,
    loggingIn: false,
    user: {}
  }),
  [authConstants.LOGOUT]: () => ({
    state: states.NOT_ASKED,
    loggingIn: false,
    user: {}
  })
}, initialState);
