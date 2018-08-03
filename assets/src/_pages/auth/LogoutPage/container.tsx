import {connect} from "react-redux";
import {LogoutPage} from "./component";
import {authActions} from "../../../_actions";

const mapStateToProps = (state) => ({...state.auth});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

const connectedLogoutPage = connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
export {connectedLogoutPage as LogoutPage};
