import {connect} from 'react-redux';
import {LoginPage} from './component';
import {userActions} from '../../../_actions';

function mapStateToProps(state) {
    const {loggingIn} = state.authentication;
    return {
        loggingIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(userActions.login(email, password)),
        logout: () => dispatch(userActions.logout()),
    }
};

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export {connectedLoginPage as LoginPage};