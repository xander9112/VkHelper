const API_VERSION = "api/v1";

export const config = {
  apiUrl: `http://localhost:1337/${API_VERSION}`
};

export enum States {
  NOT_ASKED = "NOT_ASKED",
  LOADING = "LOADING",
  LOADED = "LOADED",
  FAILURE = "FAILURE",
}

export const states = {
  NOT_ASKED: States.NOT_ASKED,
  LOADING: States.LOADING,
  LOADED: States.LOADED,
  FAILURE: States.FAILURE
};
