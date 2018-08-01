import {handleActions} from 'redux-actions'
import {groupConstants} from '../_constants'
import {States, states} from '../_helpers/config'
import {IGroup, IPhoto} from '../_interfaces'

// import {SelectedGroups} from "./Group";

interface IInitialState {
  state: States,
  data: IGroup[] | Array<{}>, // Group,
  count: number, // Group.length,
  selectedGroups: {
    from: IGroup | Object, // SelectedGroups.from,
    to: IGroup | Object, // SelectedGroups.to
  },
  photos: {
    from: {
      state: States,
      count: number, // Photos.from.items.length,
      items: IPhoto[], // Photos.from.items,
      offset: number,
    },
    to: {
      state: States,
      count: number, // Photos.from.items.length,
      items: IPhoto[], // Photos.from.items,
      offset: number,
    },
  },
  error: string,
}

const initialState: IInitialState = {
  state: states.NOT_ASKED,
  data: [], // Group,
  count: 0, // Group.length,
  selectedGroups: {
    from: {}, // SelectedGroups.from,
    to: {}, // SelectedGroups.to
  },
  photos: {
    from: {
      state: states.NOT_ASKED,
      count: 0, // Photos.from.items.length,
      offset: 0,
      items: [], // Photos.from.items,
    },
    to: {
      state: states.NOT_ASKED,
      count: 0, // Photos.to.items.length,
      offset: 0,
      items: [], // Photos.to.items,
    },
  },
  error: '',
}

export const groups = handleActions({
  [groupConstants.GROUPS_GET_REQUEST]: (state) => ({
    ...state,
    state: states.LOADING,
  }),
  [groupConstants.GROUPS_GET_SUCCESS]: (state, {payload = {data: [], count: 0}}) => {
    return {
      ...state,
      state: states.LOADED,
      data: payload.data,
      count: payload.count,
    }
  },
  [groupConstants.GROUPS_GET_FAILURE]: (state, {payload = {error: ''}}) => ({
    ...state,
    state: states.FAILURE,
    data: [],
    total: 0,
    error: payload.error,
  }),

  [groupConstants.GROUPS_GET_SELECTED_REQUEST]: (state) => ({
    ...state,
    state: states.LOADING,
  }),
  [groupConstants.GROUPS_GET_SELECTED_SUCCESS]: (state, {payload = {from: {}, to: {}}}) => {
    return {
      ...state,
      state: states.LOADED,
      selectedGroups: payload,

    }
  },
  [groupConstants.GROUPS_GET_SELECTED_FAILURE]: (state, {payload = {error: ''}}) => ({
    ...state,
    state: states.FAILURE,
    data: [],
    total: 0,
    error: payload.error,
  }),

  [groupConstants.PHOTOS_GET_SELECTED_FROM_REQUEST]: (state) => ({
    ...state,
    photos: {
      ...state.photos,
      from: {
        ...state.photos.from,
        state: states.LOADING,
      },
    },
  }),
  [groupConstants.PHOTOS_GET_SELECTED_FROM_SUCCESS]: (state, {
    payload = {
      count: 0,
      offset: 0,
      items: [],
    },
  }) => {
    return {
      ...state,
      photos: {
        ...state.photos,
        from: {
          state: states.LOADED,
          count: payload.count,
          offset: payload.offset,
          items: payload.items,
        },

      },
    }
  },
  [groupConstants.PHOTOS_GET_SELECTED_FROM_FAILURE]: (state) => ({
    ...state,
    photos: {
      ...state.photos,
      from: {
        state: states.FAILURE,
        count: 0,
        offset: 0,
        items: [],
      },
    },
  }),

  [groupConstants.PHOTOS_GET_SELECTED_TO_REQUEST]: (state) => ({
    ...state,
    photos: {
      ...state.photos,
      to: {
        ...state.photos.to,
        state: states.LOADING,
      },
    },
  }),
  [groupConstants.PHOTOS_GET_SELECTED_TO_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      photos: {
        ...state.photos,
        to: {
          state: states.LOADED,
          count: payload.count,
          offset: payload.offset,
          items: payload.items,
        },

      },
    }
  },
  [groupConstants.PHOTOS_GET_SELECTED_TO_FAILURE]: (state) => ({
    ...state,
    photos: {
      ...state.photos,
      to: {
        state: states.FAILURE,
        count: 0,
        offset: 0,
        items: [],
      },
    },
  }),

  [groupConstants.PHOTOS_UPLOAD_SUCCESS]: (state, {payload}) => {
    const {items} = state.photos.to
    items.push(payload)

    return {
      ...state,
      photos: {
        ...state.photos,
        to: {
          state: states.LOADED,
          count: items.length,
          offset: 0,
          items,
        },
      },
    }
  },
}, initialState)
