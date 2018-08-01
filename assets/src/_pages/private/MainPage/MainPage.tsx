import * as React from "react";
import {connect} from "react-redux";
import {userActions} from "../../../_actions";
import {NavBar} from "../../../_components/NavBar";
import {IUser} from "../../../_interfaces";
import Grid from "@material-ui/core/Grid/Grid";
import {PrivateRoute} from "../../../_components";
import {HomePage} from "../HomePage";
import {RolesPage} from "../RolesPage";
import {GroupsPage} from "../GroupsPage";
import {GroupsSelectedPage} from "../GroupsSelectedPage";

interface IProps {
    user: IUser,
    users: {
        loading: boolean,
        error: string,
        items: IUser[]
    },
    getAll: () => {}
}

class MainPage extends React.Component<IProps> {
    public componentDidMount() {
        this.props.getAll();
    }

    public render() {
        return (
            <Grid item xs={12}>
                <NavBar>
                    <PrivateRoute exact path="/admin" component={HomePage} />
                    <PrivateRoute path="/admin/roles" component={RolesPage} />
                    <PrivateRoute exact path="/admin/groups" component={GroupsPage} />
                    <PrivateRoute path="/admin/groups/selected" component={GroupsSelectedPage} />
                </NavBar>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const {users, authentication} = state;
    const {user} = authentication;
    return {
        user,
        users
    };
}

const mapDispatchToProps = (dispatch) => ({
    getAll: () => dispatch(userActions.getAll)
});

const connectedMainPage = connect(mapStateToProps, mapDispatchToProps)(MainPage);
export {connectedMainPage as MainPage};
