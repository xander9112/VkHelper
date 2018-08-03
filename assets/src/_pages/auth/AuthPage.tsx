import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {LoginPage} from "./LoginPage";
import {LogoutPage} from "./LogoutPage";

interface IProps {
  location: {
    pathname: string
  }
  match: {
    url: string
  }
}

class AuthPage extends React.Component<IProps> {
  constructor(props) {
    super(props);
  }

   public render() {
    const {location, match} = this.props;

    return (
      <div>
        {location.pathname === "/auth"
          ?
          <Redirect to={{pathname: "/auth/login"}} />
          :
          <React.Fragment>
            <Route path={`${match.url}/login`} component={LoginPage} />
            <Route path={`${match.url}/logout`} component={LogoutPage} />
          </React.Fragment>
        }
      </div>
    );
  }
}

export {AuthPage};
