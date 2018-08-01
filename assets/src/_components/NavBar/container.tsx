import {connect} from "react-redux";
import {NavBar} from "./component";
import {userActions} from "../../_actions";

function mapStateToProps(state) {
    const {loggingIn, user} = state.authentication;

    return {
        loggingIn,
        user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(userActions.logout())
    };
};

const connectedNavbar = connect(mapStateToProps, mapDispatchToProps)(NavBar);
export {connectedNavbar as NavBar};