import {connect} from "react-redux";
import {LoginPage} from "./component";
import {authActions} from "../../../_actions";

const mapStateToProps = (state) => ({...state.auth});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(authActions.login(email, password)),
  };
};

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export {connectedLoginPage as LoginPage};
