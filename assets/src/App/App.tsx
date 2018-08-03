import * as React from "react";
import {Router, Route} from "react-router-dom";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid/Grid";

import {history} from "../_helpers";
import {alertActions} from "../_actions";
import {PrivateRoute} from "../_components";
import {MainPage} from "../_pages/private/MainPage";
import {AuthPage} from "../_pages/auth/";
import {IUser} from "../_interfaces";

interface IProps {
  alert: {
    type: string,
    message: string,
  },
  auth: {
    loggingIn: boolean
    user: IUser
  }
  dispatch: (params: object) => {}
}

class App extends React.Component<IProps> {
  constructor(props) {
    super(props);

    const {dispatch} = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }

  public componentDidMount() {
    if (!this.props.auth.loggingIn) {
      history.push("/auth");
    }
  }

  public render() {
    const {alert, auth} = this.props;

    return (
      <Grid container>
        {alert.message &&
        <div className={`alert ${this.props.alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
          <React.Fragment>
            {
              auth.loggingIn
                ? <PrivateRoute path="/" component={MainPage} />
                : <Route path="/auth" component={AuthPage} />
            }
          </React.Fragment>
        </Router>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const {alert, auth} = state;

  return {
    alert,
    auth
  };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};
