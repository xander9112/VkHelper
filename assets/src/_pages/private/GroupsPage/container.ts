import {connect} from "react-redux";
import {groupActions} from "../../../_actions";
import {styledGroupsPage} from "./component";

const mapStateToProps = (state) => ({...state.groups, user: state.authentication.user});

const mapDispatchToProps = (dispatch) => ({
    getGroups: (userId) => dispatch(groupActions.getGroups(userId)),
    updateGroup: (group) => dispatch(groupActions.updateGroup(group)),
    deleteGroup: (group) => dispatch(groupActions.deleteGroup(group))
});

const connectedGroupsPage = connect(mapStateToProps, mapDispatchToProps)(styledGroupsPage);
export {connectedGroupsPage as GroupsPage};
