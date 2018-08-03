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

import {history} from "../../../_helpers";

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
  },

  header: {
    textAlign: "center"
  }
});

interface IProps extends WithStyles<typeof styles> {
  login: (login: string, password: string) => void,
  loggingIn: boolean,
}

class LoginPage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    // reset login status
    this.state = {
      value: 0,
      login: "",
      loading: false,
      password: "",
      submitted: false
    };
  }

  public componentDidMount() {
    if (this.props.loggingIn) {
      history.push("/");
    }
  }

  public render() {
    const {login, password, loading} = this.state;
    const {classes} = this.props;

    return (
      <Dialog open={true}>
        <DialogTitle className={classes.header}>Авторизация</DialogTitle>
        <DialogContent>
          <DialogContentText />

          <form action="" onSubmit={this.handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="login"
              name="login"
              label="email / телефон"
              type="text"
              fullWidth
              required
              value={login}
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

    const {login, password} = this.state;

    if (login && password) {
      this.props.login(login, password);
    }
  };
}

const styledLoginPage = withStyles(styles)(LoginPage);

export {styledLoginPage as LoginPage};
