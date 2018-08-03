import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import {IGroup, IPhoto} from "../../../../_interfaces";

interface IProps extends WithStyles<typeof styles> {
  photos: IPhoto[],
  selectedGroups: IGroup,
  selected: IPhoto[],
  getGroup: (groupId) => void
}

interface IState {
  test?: any
}

const styles = (theme: Theme) => createStyles({
  root: {},
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
    width: 151,
    height: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

class Component extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    const {classes} = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cover}
              image="/static/images/cards/live-from-space.jpg"
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="headline">Live From Space</Typography>
                <Typography variant="subheading" color="textSecondary">
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="Previous">
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton aria-label="Play/pause">
                  <PlayArrowIcon className={classes.playIcon} />
                </IconButton>
                <IconButton aria-label="Next">
                  <SkipNextIcon />
                </IconButton>
              </div>
            </div>

          </Card>
        </Grid>
      </Grid>
    );
  }
}

export const LeftSide = withStyles(styles, {withTheme: true})(Component);
