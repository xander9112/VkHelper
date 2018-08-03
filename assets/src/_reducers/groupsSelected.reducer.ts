import {handleActions} from "redux-actions";
import {groupSelectedConstants} from "../_constants";
import {states} from "../_helpers/config";

const initialState = {
  state: states.NOT_ASKED,
  from: {},
  to: {},
  photos: {
    from: {
      state: states.NOT_ASKED,
      items: []
    },
    to: {
      state: states.NOT_ASKED,
      items: []
    }
  },
  error: ""
};

export const groupsSelected = handleActions({
  [groupSelectedConstants.GROUPS_SELECTED_GET_REQUEST]: (state) => ({
    ...state,
    state: states.LOADING
  }),
  [groupSelectedConstants.GROUPS_SELECTED_GET_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      state: states.LOADED,
      from: payload.from,
      to: payload.to
    };
  },
  [groupSelectedConstants.GROUPS_SELECTED_GET_FAILURE]: (state, {payload}) => {
    return {
      ...state,
      state: states.FAILURE,
      error: payload
    };
  },

  [groupSelectedConstants.GROUPS_SELECTED_GET_PHOTOS_FROM_REQUEST]: (state, {payload}) => {
    const {photos} = state;

    return {
      ...state,
      state: states.FAILURE,
      error: payload,
      photos: {
        from: {
          state: states.LOADING,
          ...photos.from
        },
        to: {...photos.to}
      }
    };
  },
  [groupSelectedConstants.GROUPS_SELECTED_GET_PHOTOS_FROM_SUCCESS]: (state, {payload}) => {
    const {photos} = state;

    return {
      ...state,
      photos: {
        from: {
          state: states.LOADED,
          items: payload
        },
        to: {...photos.to}
      }
    };
  },
  [groupSelectedConstants.GROUPS_SELECTED_GET_PHOTOS_FROM_FAILURE]: (state) => {
    return {
      ...state
    };
  },

  [groupSelectedConstants.GROUPS_SELECTED_GET_PHOTOS_TO_REQUEST]: (state, {payload}) => {
    const {photos} = state;

    return {
      ...state,
      state: states.FAILURE,
      error: payload,
      photos: {
        from: {...photos.from},
        to: {
          state: states.LOADING,
          ...photos.to
        }
      }
    };
  },
  [groupSelectedConstants.GROUPS_SELECTED_GET_PHOTOS_TO_SUCCESS]: (state, {payload}) => {
    const {photos} = state;

    return {
      ...state,
      photos: {
        from: {...photos.from},
        to: {
          state: states.LOADED,
          items: payload
        }
      }
    };
  },
  [groupSelectedConstants.GROUPS_SELECTED_GET_PHOTOS_TO_FAILURE]: (state) => {
    return {
      ...state
    };
  },

  [groupSelectedConstants.GROUPS_SELECTED_POST_PHOTO_SUCCESS]: (state, {payload}) => {
    const {photos} = state;

    return {
      ...state,
      photos: {
        from: {
          ...photos.from
        },
        to: {
          ...photos.to,
          items: photos.to.items.concat(payload)
        }
      }
    };
  }
}, initialState);
