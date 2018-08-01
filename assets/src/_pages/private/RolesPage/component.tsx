import * as React from "react";

import {IStates} from "../../../_interfaces/_states";
import {IRole} from "../../../_interfaces/_roles";
import Grid from "@material-ui/core/Grid/Grid";
import List from "@material-ui/core/List/List";
import {Add} from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import {AddModal} from "./AddModal";
import {Role} from "./Role";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

interface IProps extends WithStyles<typeof styles> {
    state: IStates,
    data: IRole[],
    getRoles: () => void
    addRole: (role) => void
    updateRole: (role) => void
    deleteRole: (role) => void
}

const styles = (theme: Theme) => createStyles({
    fab: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    }
});

class Component extends React.Component<IProps> {
    public state = {
        open: false
    };

    public componentDidMount() {
        this.props.getRoles();
    }

    public render() {
        const {data, classes, state} = this.props;
        const {open} = this.state;

        return (
            <Grid>
                {
                    state === "LOADING"
                        ?
                        <CircularProgress size={100} />
                        :
                        state === "LOADED" && data.length
                            ?
                            <List>
                                {
                                    data.map((item) => (
                                        <Role
                                            key={item.id}
                                            role={item}
                                            onSave={this.handleSave}
                                            onDelete={this.handleDelete}
                                        />
                                    ))
                                }
                            </List>
                            :
                            <Typography variant="headline" component="h3">
                                У вас пока нет ролей!
                            </Typography>
                }
                <Button variant="fab" className={classes.fab} onClick={this.handleOpen}>
                    <Add />
                </Button>

                <AddModal open={open} handleClose={this.handleClose} handleSubmit={this.handleSubmit} />
            </Grid>
        );
    }

    private handleOpen = () => {
        this.setState({open: true});
    };

    private handleClose = (): void => {
        this.setState({open: false});
    };

    private handleSubmit = (role): void => {
        this.props.addRole(role);
        this.handleClose();
    };

    private handleSave = (role): void => {
        this.props.updateRole(role);
    };

    private handleDelete = (role): void => {
        this.props.deleteRole(role);
    };
}

export const styledRolesPage = withStyles(styles, {withTheme: true})(Component);

