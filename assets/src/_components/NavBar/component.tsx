import * as React from "react";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";

import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/Inbox";
import ExitToApp from "@material-ui/icons/ExitToApp";

import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, WithStyles, withStyles} from "@material-ui/core";
import {NavLink} from "react-router-dom";

import {IUser} from "../../_interfaces";
import ListItemSecondaryAction from "@material-ui/core/es/ListItemSecondaryAction/ListItemSecondaryAction";

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

interface IProps extends WithStyles<typeof styles> {
  user: IUser
  classes: {
    root: string
    appBar: string
    navIconHide: string
    toolbar: string
    drawerPaper: string
    drawerHeader: string
    content: string
  }
  theme: Theme

  [index: string]: any
}

interface IState {
  mobileOpen: boolean
}

class NavBar extends React.Component<IProps, IState> {
  public state = {
    mobileOpen: false
  };

  public render() {
    const {classes, user} = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <List>
            <ListItem>
              {/*<Avatar*/}
              {/*src={user.avatar}*/}
              {/*alt={user.first_name}*/}
              {/*/>*/}
              <ListItemText primary={`${user.last_name} ${user.first_name}`} secondary={user.status} />
              <ListItemSecondaryAction>
                <IconButton onClick={this.logout}>
                  <ExitToApp />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
        <Divider />
        <List>
          <NavLink to="/groups" activeClassName="active">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Группы" />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Заголовок
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }

  private logout = () => {
    this.props.logout();
  };

  private handleDrawerToggle = () => {
    this.setState(state => ({mobileOpen: !state.mobileOpen}));
  };
}

const styledNavBar = withStyles(styles, {withTheme: true})(NavBar);

export {styledNavBar as NavBar};
