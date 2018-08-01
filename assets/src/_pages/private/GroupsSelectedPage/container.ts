import {connect} from "react-redux";
import {groupActions} from "../../../_actions";
import {styledGroupsSelectedPage} from "./component";

const mapStateToProps = (state) => ({...state.groups});

const mapDispatchToProps = (dispatch) => ({
    getSelectedGroups: (from, to) => dispatch(groupActions.getSelectedGroups(from, to)),
    getPhotosFrom: (params) => dispatch(groupActions.getPhotos("FROM", params)),
    getPhotosTo: (params) => dispatch(groupActions.getPhotos("TO", params)),
    uploadPhoto: (params) => dispatch(groupActions.uploadPhoto(params))
});

const connectedGroupsSelectedPage = connect(mapStateToProps, mapDispatchToProps)(styledGroupsSelectedPage);
export {connectedGroupsSelectedPage as GroupsSelectedPage};
