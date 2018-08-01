import {handleActions} from "redux-actions";
import {roleConstants} from "../_constants";
import {states} from "../_helpers/config";

const initialState = {
    state: states.NOT_ASKED,
    data: [],
    error: ""
};

export const roles = handleActions({
    [roleConstants.ROLES_GET_REQUEST]: (state) => ({
        ...state,
        state: states.LOADING
    }),
    [roleConstants.ROLES_GET_SUCCESS]: (state, {payload}) => {
        return {
            ...state,
            state: states.LOADED,
            data: payload.data
        };
    },
    [roleConstants.ROLES_GET_FAILURE]: (state, {payload}) => ({
        ...state,
        state: states.FAILURE,
        data: [],
        error: payload.error
    }),
    [roleConstants.ROLES_ADD_SUCCESS]: (state, {payload}) => ({
        ...state,
        data: [...state.data, payload.role]
    }),
    [roleConstants.ROLES_UPDATE_SUCCESS]: (state, {payload}) => {
        state.data = state.data.map((item) => {
            if (item.id === payload.role.id) {
                return payload.role;
            }

            return item;
        });

        return {
            ...state,
            data: [...state.data]
        };
    },
    [roleConstants.ROLES_DELETE_SUCCESS]: (state, {payload}) => {
        const index = state.data.indexOf(payload.role);

        if (index > -1) {
            state.data.splice(index, 1);
        }

        return {
            ...state,
            data: [...state.data]
        };
    }
}, initialState);
