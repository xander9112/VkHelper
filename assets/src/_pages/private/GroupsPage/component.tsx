import * as React from "react";
import {RouteComponentProps} from "react-router";

import {IStates} from "../../../_interfaces";
import {IGroup} from "../../../_interfaces";
import Grid from "@material-ui/core/Grid/Grid";
import {Add} from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";

import {Group} from "./Group";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {IUser} from "../../../_interfaces";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";

interface ISelectedGroup {
  from: number | null,
  to: number | null
}

interface IProps extends WithStyles<typeof styles> {
  state: IStates,
  user: IUser,
  data: IGroup[],
  count: number,
  getGroups: (userId) => void
  uploadPhotos: (from, to) => void
  updateGroup: (role) => void
  deleteGroup: (role) => void
}

interface IState {
  open: boolean
  onlyWithAlbum: boolean
  filter: string,
  selectedGroups: ISelectedGroup
}

const styles = (theme: Theme) => createStyles({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

class Component extends React.Component<IProps & RouteComponentProps<any, any>, IState> {
  public state = {
    open: false,
    filter: "",
    onlyWithAlbum: true,
    selectedGroups: {
      from: null,
      to: null
    }
  };

  public componentDidMount() {
    if (this.props.state === "NOT_ASKED") {
      this.props.getGroups(this.props.user.user);
    }
  }


  public render() {
    const {data, classes, state, count} = this.props;
    const {filter, selectedGroups, onlyWithAlbum} = this.state;

    let groups = data
      .filter(group => group.deactivated !== "banned");

    if (onlyWithAlbum) {
      groups = groups.filter(group => group.main_album_id);
    }

    if (filter.length) {
      groups = groups.filter(group => {
        const name = group.name.toLowerCase();
        return name.indexOf(filter.toLowerCase()) > -1;
      });
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Имя"
            value={this.state.filter}
            onChange={this.handleFilterChange}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.onlyWithAlbum}
                onChange={this.handleOnlyWithAlbumChange}
              />
            }
            label="Только с альбомами"
          />
        </Grid>

        {
          state === "LOADING"
            ?
            <CircularProgress size={100} />
            :
            state === "LOADED" && count
              ?
              groups.map((item) => (
                <Group
                  key={item.id}
                  group={item}
                  selectedGroups={selectedGroups}
                  handleClickUpload={this.handleClickUpload}
                  handleClickDownload={this.handleClickDownload}
                  onSave={this.handleSave}
                  onDelete={this.handleDelete}
                />
              ))
              :
              <Typography variant="headline" component="h3">
                Список групп пуст
              </Typography>
        }
        <Button variant="fab" className={classes.fab} onClick={this.handleOpen}>
          <Add />
        </Button>

        {/*<AddModal open={open} handleClose={this.handleClose} handleSubmit={this.handleSubmit} />*/}
      </Grid>
    );
  }

  private handleOnlyWithAlbumChange = () => {
    const {onlyWithAlbum} = this.state;

    this.setState({onlyWithAlbum: !onlyWithAlbum});
  };

  private handleFilterChange = (event) => {
    this.setState({filter: event.target.value});
  };

  private handleOpen = () => {
    this.setState({open: true});
  };

  // private handleClose = (): void => {
  //     this.setState({open: false});
  // };

  private handleSubmit = (): void => {
    // this.props.addGroup(role);
    // this.handleClose();
    const {selectedGroups} = this.state;

    if (selectedGroups.from && selectedGroups.to) {
      this.props.history.push({
        pathname: `${this.props.match.path}/selected`,
        search: `?from=${selectedGroups.from}&to=${selectedGroups.to}`
      });
      // this.props.uploadPhotos(selectedGroups.from, selectedGroups.to);
    }
  };

  private handleSave = (role): void => {
    this.props.updateGroup(role);
  };

  private handleDelete = (role): void => {
    this.props.deleteGroup(role);
  };

  private handleClickUpload = (group) => {
    const {selectedGroups} = this.state;
    selectedGroups.from = selectedGroups.from === group ? null : group;

    this.setState({selectedGroups});

    this.handleSubmit();

  };

  private handleClickDownload = (group) => {
    const {selectedGroups} = this.state;
    selectedGroups.to = selectedGroups.to === group ? null : group;

    this.setState({selectedGroups});

    this.handleSubmit();
  };
}

export const styledGroupsPage = withStyles(styles, {withTheme: true})(Component);

