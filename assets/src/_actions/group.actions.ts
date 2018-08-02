import {createAction} from "redux-actions";
import {groupConstants} from "../_constants";
import {groupService} from "../_services";

const getGroups = (userId: number) => {
  return dispatch => {
    dispatch(request());

    groupService.getGroups(userId)
      .then(
        response => dispatch(success(response)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return createAction(groupConstants.GROUPS_GET_REQUEST)();
  }

  function success(response) {
    return createAction(groupConstants.GROUPS_GET_SUCCESS)({
      data: response.items,
      count: response.count
    });
  }

  function failure(error) {
    return createAction(groupConstants.GROUPS_GET_FAILURE)({error});
  }
};

const getSelectedGroups = (from: number, to: number) => {
  return dispatch => {
    dispatch(request());

    groupService.getSelectedGroups(from, to)
      .then(
        response => dispatch(success(response)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return createAction(groupConstants.GROUPS_GET_SELECTED_REQUEST)();
  }

  function success(response) {
    return createAction(groupConstants.GROUPS_GET_SELECTED_SUCCESS)({
      from: response.from,
      to: response.to
    });
  }

  function failure(error) {
    return createAction(groupConstants.GROUPS_GET_SELECTED_FAILURE)({error});
  }
};

const getPhotos = (type, params) => {
  return dispatch => {
    dispatch(request());

    groupService.getPhotos(params)
      .then(
        response => dispatch(success(response)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return createAction(groupConstants[`PHOTOS_GET_SELECTED_${type}_REQUEST`])();
  }

  function success(response) {
    return createAction(groupConstants[`PHOTOS_GET_SELECTED_${type}_SUCCESS`])({...response});
  }

  function failure(error) {
    return createAction(groupConstants[`PHOTOS_GET_SELECTED_${type}_FAILURE`])({error});
  }
};

const uploadPhoto = (params) => {
  return dispatch => {
    groupService.uploadPhoto(params)
      .then(data => dispatch(success(data)));
  };

  function success(data) {
    return createAction(groupConstants.PHOTOS_UPLOAD_SUCCESS)(data);
  }
};

const updateGroup = (group) => {
  return dispatch => {
    groupService.updateGroup(group)
      .then(data => dispatch(success(data)));
  };

  function success(data) {
    return createAction(groupConstants.GROUPS_UPDATE_SUCCESS)({group: data});
  }
};

const deleteGroup = (group) => {
  return dispatch => {
    groupService.deleteGroup(group)
      .then(data => dispatch(success(group)));
  };

  function success(data) {
    return createAction(groupConstants.GROUPS_DELETE_SUCCESS)({group: data});
  }
};

const clearSelectedGroups = () => {
  return dispatch => {
    dispatch(success());
  };

  function success() {
    return createAction(groupConstants.GROUPS_CLEAR_SELECTED_SUCCESS)();
  }
};

export const groupActions = {
  getGroups,
  getSelectedGroups,
  clearSelectedGroups,
  getPhotos,
  uploadPhoto,
  updateGroup,
  deleteGroup
};
