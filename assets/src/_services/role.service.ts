import {fetchApi} from "../_helpers";

const getRoles = () => fetchApi("roles");
const addRole = (role) => fetchApi("roles", {method: "POST", body: JSON.stringify(role)});
const updateRole = (role) => fetchApi(`roles/${role.id}`, {method: "PUT", body: JSON.stringify(role)});
const deleteRole = (role) => fetchApi(`roles/${role.id}`, {method: "DELETE", body: JSON.stringify(role)});

export const roleService = {
    getRoles,
    addRole,
    updateRole,
    deleteRole
};
