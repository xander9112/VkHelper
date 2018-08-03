import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {IGroup, IPhoto} from "../../../../_interfaces";
import {SelectAlbum} from "./SelectAlbum";
import {Photos} from "./Photos";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";

interface IProps extends WithStyles<typeof styles> {
  photos: IPhoto[]
  group: IGroup
  selected: IPhoto[]
  getPhotos: (type, params) => void
  handleSelect: (type, selected: IPhoto | IPhoto[]) => void
}

interface IState {
  album: string | number,
  selectedAll: boolean

  [key: string]: any

}

const styles = (theme: Theme) => createStyles({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 150,
    height: 150
  },
  formControl: {
    width: "100%",
    marginTop: theme.spacing.unit
  }
});

class Component extends React.Component<IProps, IState> {
  public state = {
    album: "",
    selectedAll: false
  };

  public render() {
    const {classes, group, photos, selected} = this.props;
    const {albums} = group;
    const {album} = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image={group.photo_200}
              title={group.name}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="headline">{group.name}</Typography>
              </CardContent>
            </div>
          </Card>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <SelectAlbum
                name="album"
                title="Альбом"
                values={albums}
                value={album}
                handleChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                className={classes.formControl}
                control={
                  <Checkbox
                    disabled={!album}
                    checked={this.state.selectedAll}
                    onChange={this.handleSelectedAll}
                  />
                }
                label="Выбрать всё"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Photos
            photos={photos}
            selected={selected}
            handleSelect={this.handleSelect}
          />
        </Grid>
      </Grid>
    );
  }

  private handleSelectedAll = () => {
    const {selectedAll} = this.state;

    this.setState({selectedAll: !selectedAll});

    this.handleSelect(!selectedAll ? this.props.photos : []);
  };

  private handleSelect = (photo) => {
    this.props.handleSelect("from", photo);
  };

  private handleChange = (value) => {
    this.setState(value);
    const {group} = this.props;

    this.props.getPhotos("FROM", {owner_id: group.id, album_id: value.album});
  };
}

export const LeftSide = withStyles(styles, {withTheme: true})(Component);
