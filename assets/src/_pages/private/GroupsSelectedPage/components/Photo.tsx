import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
import {IPhoto} from "../../../../_interfaces/index";
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";

interface IProps extends WithStyles<typeof styles> {
  photo: IPhoto,
  selected?: IPhoto[],
  handleSelect?: (id) => void
  handleDelete?: (ownerId, photoId) => void
}

// interface IState {
// }

const styles = (theme: Theme) => createStyles({
  card: {
    maxWidth: 345,
    cursor: "pointer"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

class Component extends React.Component<IProps> {
  public state = {};

  public render() {
    const {photo, classes, selected} = this.props;
    let isSelected = false;
    const image = photo.sizes.find(item => item.type === "m");

    if (selected) {
      isSelected = !!selected.find(item => item.id === photo.id);
    }

    return (
      <Grid item xs={4}>
        <Card className={classes.card} onClick={this.handleSelect}>
          <CardMedia
            className={classes.media}
            image={image.url}
            title={photo.name}
          />
          <CardContent>
            <Typography component="p">
              {photo.text}
            </Typography>
          </CardContent>
          {selected
            ? <CardActions className={classes.actions} disableActionSpacing>
              <Checkbox
                checked={isSelected}
                onChange={this.handleSelect}
              />
            </CardActions>
            : ""
          }
        </Card>
      </Grid>
    );
  }

  private handleSelect = () => {
    if (this.props.handleSelect) {
      this.props.handleSelect(this.props.photo);
    }
  };
}

export const Photo = withStyles(styles, {withTheme: true})(Component);

