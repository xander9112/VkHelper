import {connect} from "react-redux";
import {roleActions} from "../../../_actions";
import {styledRolesPage} from "./component";

const mapStateToProps = (state) => ({...state.roles});

const mapDispatchToProps = (dispatch) => ({
    getRoles: () => dispatch(roleActions.getRoles()),
    addRole: (role) => dispatch(roleActions.addRole(role)),
    updateRole: (role) => dispatch(roleActions.updateRole(role)),
    deleteRole: (role) => dispatch(roleActions.deleteRole(role))
});

const connectedRolesPage = connect(mapStateToProps, mapDispatchToProps)(styledRolesPage);
export {connectedRolesPage as RolesPage};