import {connect} from "react-redux";
import {groupsSelectedActions} from "../../../_actions";
import {styledGroupsSelectedPage} from "./component";

const mapStateToProps = (state) => ({...state.groupsSelected});

const mapDispatchToProps = (dispatch) => ({
  getSelectedGroups: (from, to) => dispatch(groupsSelectedActions.getSelectedGroups(from, to)),
  clearSelectedGroups: () => dispatch(groupsSelectedActions.clearSelectedGroups()),
  getPhotos: (type, params) => dispatch(groupsSelectedActions.getPhotos(type, params)),
  uploadPhotos: (params) => dispatch(groupsSelectedActions.uploadPhotos(params))
});

const connected = connect(mapStateToProps, mapDispatchToProps)(styledGroupsSelectedPage);
export {connected as GroupsSelectedPage};
