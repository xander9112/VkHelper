import * as React from "react";
import {cloneDeep} from "lodash";
import Button from "@material-ui/core/Button/Button";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

interface IProps extends WithStyles<typeof styles> {
    open: boolean
    handleClose?: () => void
    handleSubmit?: (value) => void
}

const styles = (theme: Theme) => createStyles({});

const stateFields = {
    roleName: ""
};

class AddModal extends React.Component<IProps> {
    public state = {
        fields: cloneDeep(stateFields)
    };

    public render() {
        const {open} = this.props;
        const {roleName} = this.state.fields;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Добавить роль</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        id="roleName"
                        label="Роль"
                        type="email"
                        fullWidth
                        value={roleName}
                        onChange={(e) => this.handleChangeField({
                            name: "roleName",
                            value: e.target ? e.target.value : ""
                        })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Отменить
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Добавить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private handleClose = () => {
        if (this.props.handleClose) {
            this.props.handleClose();
        }
    };

    private cleanFields = () => {
        const cleanFields = cloneDeep(stateFields);

        this.setState({fields: cleanFields});
    };

    private handleSubmit = () => {
        if (this.props.handleSubmit) {
            this.props.handleSubmit(this.state.fields.roleName);

            this.cleanFields();
        }
    };

    private handleChangeField = ({name, value}) => {
        const {fields} = this.state;
        fields[name] = value;
        this.setState({fields});
    };
}

const styledAddModal = withStyles(styles, {withTheme: true})(AddModal);

export {styledAddModal as AddModal};
