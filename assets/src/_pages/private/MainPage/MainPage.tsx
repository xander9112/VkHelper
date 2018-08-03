import * as React from "react";
import {connect} from "react-redux";
import {NavBar} from "../../../_components/NavBar";
import {IUser} from "../../../_interfaces";
import Grid from "@material-ui/core/Grid/Grid";
import {PrivateRoute} from "../../../_components";
import {HomePage} from "../HomePage";
import {GroupsPage} from "../GroupsPage";
import {GroupsSelectedPage} from "../GroupsSelectedPage";

interface IProps {
  user: IUser,
}

class MainPage extends React.Component<IProps> {
  public render() {
    return (
      <Grid item xs={12}>
        <NavBar>
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute exact path="/groups" component={GroupsPage} />
          <PrivateRoute path="/groups/selected/from-:from/to-:to" component={GroupsSelectedPage} />
        </NavBar>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  const {users, auth} = state;
  const {user} = auth;
  return {
    user,
    users
  };
}

const mapDispatchToProps = () => ({});

const connectedMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage);
export {connectedMainPage as MainPage};
