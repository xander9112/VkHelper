import {connect} from "react-redux";
import {groupActions} from "../../../_actions";
import {styledGroupsSelectedPage} from "./component";

const mapStateToProps = (state) => ({...state.groups});

const mapDispatchToProps = (dispatch) => ({
  getSelectedGroups: (from, to) => dispatch(groupActions.getSelectedGroups(from, to)),
  getPhotos: (type, params) => dispatch(groupActions.getPhotos(type, params)),
  uploadPhoto: (params) => dispatch(groupActions.uploadPhoto(params)),
  clearSelectedGroups: () => dispatch(groupActions.clearSelectedGroups())
});

const connectedGroupsSelectedPage = connect(mapStateToProps, mapDispatchToProps)(styledGroupsSelectedPage);
export {connectedGroupsSelectedPage as GroupsSelectedPage};
