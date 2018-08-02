import * as React from "react";
import {Router, Route} from "react-router-dom";
import {connect} from "react-redux";

import {history} from "../_helpers";
import {alertActions} from "../_actions";
import {PrivateRoute} from "../_components";
import {MainPage} from "../_pages/private/MainPage";
import {AuthPage} from "../_pages/auth/";
import Grid from "@material-ui/core/Grid/Grid";

interface IProps {
  alert: {
    type: string,
    message: string,
  },
  dispatch: (params: object) => {}
}

class App extends React.Component<IProps> {
  constructor(props) {
    super(props);

    const {dispatch} = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  public render() {
    const {alert} = this.props;
    return (
      <Grid container>
        {alert.message &&
        <div className={`alert ${this.props.alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
          <React.Fragment>
            <Route path="/auth" component={AuthPage} />
            <PrivateRoute path="/admin" component={MainPage} />
          </React.Fragment>
        </Router>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const {alert} = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};
