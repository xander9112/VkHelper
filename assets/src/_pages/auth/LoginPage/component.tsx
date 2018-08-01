import * as React from "react";
import {IState} from "./interfaces";
import {WithStyles, createStyles, withStyles} from "@material-ui/core";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

const styles = (theme: Theme) => createStyles({
    button: {},
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    },
    paper: {},
    root: {},
    wrapper: {
        margin: theme.spacing.unit,
        position: "relative"
    }
});

interface IProps extends WithStyles<typeof styles> {
    button: string,
    logout: () => {},
    login: (email: string, password: string) => void,
    loggingIn: boolean,
    paper: string,
    root: string,
}

class LoginPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            email: "",
            loading: false,
            password: "",
            submitted: false
        };
    }

    public render() {
        const {email, password, loading} = this.state;
        const {classes} = this.props;

        return (
            <Dialog
                open={true}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Авторизация</DialogTitle>
                <DialogContent>
                    <DialogContentText />
                    <form action="">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email адрес"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={this.handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            name="password"
                            label="Пароль"
                            type="password"
                            fullWidth
                            required
                            value={password}
                            onChange={this.handleChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <div className={classes.wrapper}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            onClick={this.handleSubmit}
                        >
                            Войти
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </DialogActions>
            </Dialog>
        );
    }

    private handleChange = (e) => {
        const {name} = e.target;
        const {value} = e.target;

        this.setState({[name]: value});
    };

    private handleSubmit = (e) => {
        e.preventDefault();

        this.setState({submitted: true});

        const {email, password} = this.state;

        if (email && password) {
            this.props.login(email, password);
        }
    };
}

const styledLoginPage = withStyles(styles)(LoginPage);

export {styledLoginPage as LoginPage};