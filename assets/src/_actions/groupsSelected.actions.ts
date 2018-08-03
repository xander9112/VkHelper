import {createAction} from "redux-actions";
import {groupSelectedConstants} from "../_constants";
import {groupsSelectedService} from "../_services";

const getSelectedGroups = (from: number, to: number) => {
  return dispatch => {
    dispatch(request());

    groupsSelectedService.getSelectedGroups(from, to)
      .then(
        response => dispatch(success(response)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return createAction(groupSelectedConstants.GROUPS_SELECTED_GET_REQUEST)();
  }

  function success(response) {
    return createAction(groupSelectedConstants.GROUPS_SELECTED_GET_SUCCESS)({
      from: response.from,
      to: response.to
    });
  }

  function failure(error) {
    return createAction(groupSelectedConstants.GROUPS_SELECTED_GET_FAILURE)({error});
  }
};

const clearSelectedGroups = () => {
  return dispatch => {
    dispatch(success());
  };

  function success() {
    return createAction(groupSelectedConstants.GROUPS_SELECTED_GET_SUCCESS)({
      from: {},
      to: {}
    });
  }
};

const getPhotos = (type, params) => {
  return dispatch => {
    dispatch(request());

    groupsSelectedService.getPhotos(params)
      .then(
        response => dispatch(success(response)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return createAction(groupSelectedConstants[`GROUPS_SELECTED_GET_PHOTOS_${type}_REQUEST`])();
  }

  function success(response) {
    return createAction(groupSelectedConstants[`GROUPS_SELECTED_GET_PHOTOS_${type}_SUCCESS`])(response);
  }

  function failure(error) {
    return createAction(groupSelectedConstants[`GROUPS_SELECTED_GET_PHOTOS_${type}_FAILURE`])({error});
  }
};

const uploadPhotos = (params) => {
  return dispatch => {
    groupsSelectedService.uploadPhotos(params)
      .then(data => dispatch(success(data)));
  };

  function success(data) {
    return createAction(groupSelectedConstants.GROUPS_SELECTED_POST_PHOTO_SUCCESS)(data);
  }
};

export const groupsSelectedActions = {
  getSelectedGroups,
  clearSelectedGroups,
  getPhotos,
  uploadPhotos
};
