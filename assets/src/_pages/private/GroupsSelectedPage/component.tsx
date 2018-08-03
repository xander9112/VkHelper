import * as React from "react";
import {maxBy, random, cloneDeep} from "lodash";
import Grid from "@material-ui/core/Grid/Grid";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import {RouteComponentProps} from "react-router";
import {IGroup, IStates} from "../../../_interfaces";
import {IPhoto} from "../../../_interfaces";
import Button from "@material-ui/core/Button/Button";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import {LeftSide} from "./components/LeftSide";
import {RightSide} from "./components/RightSide";
import LinearProgress from "@material-ui/core/es/LinearProgress/LinearProgress";

interface IProps extends WithStyles<typeof styles> {
  state: IStates
  from: IGroup
  to: IGroup
  photos: {
    from: {
      state: IStates
      items: IPhoto[]
    },
    to: {
      state: IStates
      items: IPhoto[]
    }
  }
  getSelectedGroups: (from, to) => void
  getPhotos: (type, params) => void
  uploadPhotos: (params) => void
}

interface IState {
  uploadedPhoto: number
  selected: {
    from: IPhoto[],
    to: IPhoto[],
    [key: string]: any
  },
  album: {
    from: number | null,
    to: number | null
  }
}

const styles = (theme: Theme) => createStyles({
  middleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  progressWrap: {
    flexGrow: 1
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Component extends React.Component<IProps & RouteComponentProps<any, any>, IState> {
  public state = {
    uploadedPhoto: 0,
    selected: {
      from: [],
      to: []
    },
    album: {
      from: null,
      to: null
    }
  };

  public componentDidMount() {
    const {params: {from, to}} = this.props.match;

    this.props.getSelectedGroups(from, to);
  }

  // TODO: Показать прелоадер
  public render() {
    const {classes, from, to, photos, state} = this.props;
    const {album, selected} = this.state;

    return (
      <Grid container spacing={24}>
        {
          state === "LOADED"
            ? <React.Fragment>
              <Grid item xs={5}>
                <LeftSide
                  photos={photos.from.items}
                  group={from}
                  selected={selected.from}
                  getPhotos={this.getPhotos}
                  handleSelect={this.handleSelect}
                />
              </Grid>
              <Grid item xs={2} className={classes.middleContainer}>
                <Button
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  disabled={!(album.from && album.to && selected.from.length)}
                  onClick={this.handleSubmit}
                >
                  <KeyboardArrowRight />
                </Button>
              </Grid>
              <Grid item xs={5}>
                <RightSide
                  photos={photos.to.items}
                  group={to}
                  selected={selected.to}
                  getPhotos={this.getPhotos}
                  handleSelect={this.handleSelect}
                />
              </Grid>
            </React.Fragment>
            : <div className={classes.progressWrap}>
              <LinearProgress />
            </div>
        }
      </Grid>
    );
  }

  private handleSubmit = async () => {
    const {to} = this.props;
    const {album, selected} = this.state;

    if (album.from && album.to && selected.from.length) {
      this.setState({uploadedPhoto: selected.from.length});
      await this.uploadPhotos({album_id: album.to, group_id: to.id, sources: cloneDeep(selected.from)});
    }
  };

  private uploadPhotos = async (params) => {
    const {album_id, group_id, sources} = params;
    const photoCount = 1;

    const uploadSources = sources.slice(0, photoCount)
      .map(source => maxBy(source.sizes, (size) => size.width).url);

    const caption = sources[0].text.replace(/[0-9]*.?руб/ig, (reg) => {
      let price = parseInt(reg.split("руб")[0], 10);

      price += (price / 100) * 20;

      return price;
    });

    await this.props.uploadPhotos({album_id, group_id, source: uploadSources, caption});

    sources.splice(0, photoCount);

    let {uploadedPhoto} = this.state;

    uploadedPhoto += photoCount;

    this.setState({uploadedPhoto});

    if (sources.length) {
      setTimeout(this.uploadPhotos, random(500, 2000), {album_id, group_id, sources});
    } else {
      this.setState({uploadedPhoto: 0});
    }
  };

  private handleSelect = (type, selected: IPhoto | IPhoto[]) => {
    let selectedPhotos = this.state.selected[type] as IPhoto[];

    if (Array.isArray(selected)) {
      selectedPhotos = selected;
    } else {
      const photoItem = selectedPhotos.find(item => item.id === selected.id);

      if (photoItem) {
        const index = selectedPhotos.indexOf(photoItem);
        selectedPhotos.splice(index, 1);
      } else {
        selectedPhotos.push(selected);
      }
    }


    const newState = {
      selected: {
        ...this.state.selected,
        [type]: selectedPhotos
      }
    };

    this.setState(newState);
  };

  private getPhotos = (type, params) => {
    const {album} = this.state;

    album[type.toLowerCase()] = params.album_id;
    this.setState({album});
    this.props.getPhotos(type, params);
  };
}

export const styledGroupsSelectedPage = withStyles(styles, {withTheme: true})(Component);
