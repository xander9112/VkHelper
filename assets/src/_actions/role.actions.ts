import {createAction} from "redux-actions";
import {roleConstants} from "../_constants";
import {roleService} from "../_services";

const getRoles = () => {
    return dispatch => {
        dispatch(request());

        roleService.getRoles()
            .then(
                roles => dispatch(success(roles)),
                error => dispatch(failure(error))
            );
    };

    function request() {
        return createAction(roleConstants.ROLES_GET_REQUEST);
    }

    function success(data) {
        return createAction(roleConstants.ROLES_GET_SUCCESS)({data});
    }

    function failure(error) {
        return createAction(roleConstants.ROLES_GET_FAILURE)({error});
    }
};

const addRole = (role) => {
    return dispatch => {
        roleService.addRole({id: +new Date(), name: role})
            .then(data => dispatch(success(data)));
    };

    function success(data) {
        return createAction(roleConstants.ROLES_ADD_SUCCESS)({role: data});
    }
};

const updateRole = (role) => {
    return dispatch => {
        roleService.updateRole(role)
            .then(data => dispatch(success(data)));
    };

    function success(data) {
        return createAction(roleConstants.ROLES_UPDATE_SUCCESS)({role: data});
    }
};

const deleteRole = (role) => {
    return dispatch => {
        roleService.deleteRole(role)
            .then(data => dispatch(success(role)));
    };

    function success(data) {
        return createAction(roleConstants.ROLES_DELETE_SUCCESS)({role: data});
    }
};

export const roleActions = {
    getRoles,
    addRole,
    updateRole,
    deleteRole
};