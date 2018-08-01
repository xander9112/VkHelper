import * as React from "react";
import {cloneDeep} from "lodash";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import {IRole} from "../../../_interfaces/_roles";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Delete, Edit, Save} from "@material-ui/icons";
import Input from "@material-ui/core/Input/Input";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";

interface IProps extends WithStyles<typeof styles> {
    role: IRole,
    onSave?: (role) => void
    onDelete?: (role) => void
}

interface IState {
    isEditing: boolean
    roleLocal: IRole
}

const styles = (theme: Theme) => createStyles({});

class Component extends React.Component<IProps, IState> {
    public state = {
        isEditing: false,
        roleLocal: {} as any
    };

    public render() {
        const {role} = this.props;
        const {isEditing, roleLocal} = this.state;

        return (
            <ListItem>
                {isEditing
                    ?
                    <ClickAwayListener onClickAway={this.handleSave}>
                        <Input
                            value={roleLocal.name}
                            name="name"
                            onChange={this.handleChange}
                        />
                    </ClickAwayListener>
                    :
                    <ListItemText primary={role.name} onDoubleClick={() => this.handleToggleEdit(true)} />
                }
                <ListItemSecondaryAction>
                    {isEditing
                        ?
                        <IconButton aria-label="Edit" onClick={this.handleSave}>
                            <Save />
                        </IconButton>
                        :
                        <IconButton aria-label="Edit" onClick={() => this.handleToggleEdit(true)}>
                            <Edit />
                        </IconButton>
                    }
                    <IconButton aria-label="Delete" onClick={this.handleDelete}>
                        <Delete />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    private handleDelete = () => {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.role);

        }
    };

    private handleChange = (event) => {
        const value = event.target ? event.target.value : "";
        const name = event.target ? event.target.name : "";
        const {roleLocal} = this.state;

        roleLocal[name] = value;

        this.setState({roleLocal});
    };

    private handleSave = () => {
        if (this.props.onSave) {
            this.props.onSave(this.state.roleLocal);
        }

        this.handleToggleEdit(false);
    };

    private handleToggleEdit = (isEditing) => {
        this.setState({
            isEditing,
            roleLocal: isEditing ? cloneDeep(this.props.role) : {}
        });
    };
}

export const Role = withStyles(styles, {withTheme: true})(Component);

