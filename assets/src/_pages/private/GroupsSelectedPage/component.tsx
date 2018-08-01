import * as React from "react";
import {maxBy, random} from "lodash";
import Grid from "@material-ui/core/Grid/Grid";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Button from "@material-ui/core/Button/Button";
import {RouteComponentProps} from "react-router";
import {IGroup} from "../../../_interfaces";
import {IStates} from "../../../_interfaces";
import {IPhoto} from "../../../_interfaces";
import {Group} from "./Group";
import {Photo} from "./Photo";
import Typography from "@material-ui/core/es/Typography/Typography";
import Paper from "@material-ui/core/es/Paper/Paper";

interface IProps extends WithStyles<typeof styles> {
    state: IStates,
    selectedGroups: {
        from: IGroup,
        to: IGroup
    }
    photos: {
        from: {
            offset: number,
            count: number,
            items: IPhoto[]
        },
        to: {
            offset: number,
            count: number,
            items: IPhoto[]
        }
    }
    getSelectedGroups: (from, to) => void
    getPhotosFrom: (ownerId) => void
    getPhotosTo: (ownerId) => void
    uploadPhoto: (params) => void
}

interface IState {
    selected: IPhoto[]
    uploadingPhoto: number
}

const styles = (theme: Theme) => createStyles({
    photoContainer: {
        marginTop: 24
    },
    button: {
        position: "absolute",
        top: 300,
        margin: theme.spacing.unit
    },
    middleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    root: {
        padding: 15
    }
});

class Component extends React.Component<IProps & RouteComponentProps<any, any>, IState> {
    public state = {
        selected: [],
        uploadingPhoto: 0
    };

    public componentWillReceiveProps(newProps) {
        const {selectedGroups, photos} = newProps;

        if (newProps.state === "NOT_ASKED") {
            this.getSelectedGroups();
        }

        if (newProps.selectedGroups.from.id !== this.props.selectedGroups.from.id) {

            this.getPhotos("from", {selectedGroups, photos});
        }

        if (newProps.selectedGroups.to.id !== this.props.selectedGroups.to.id) {
            this.getPhotos("to", {selectedGroups, photos});
        }
    }

    public componentDidMount() {
        this.getData();
    };

    public render() {
        const {selectedGroups, photos, classes} = this.props;
        const {selected, uploadingPhoto} = this.state;

        return (
            <Grid container spacing={24}>
                <Grid item xs={5}>
                    <Group group={selectedGroups.from} />
                    <Grid container spacing={24} className={classes.photoContainer}>
                        {photos.from.items
                            .map(photo => <Photo photo={photo} key={photo.id} selected={selected}
                                                 handleSelect={this.handleSelect} />)}
                    </Grid>
                </Grid>
                <Grid item xs={2} className={classes.middleContainer}>
                    {selected.length
                        ? <Paper className={classes.root} elevation={6}>
                            <Typography variant="headline" component="h3">
                                {selected.length + uploadingPhoto} / {uploadingPhoto}
                            </Typography>
                        </Paper>
                        : ""
                    }

                    <Button
                        variant="fab"
                        color="primary"
                        aria-label="Add"
                        disabled={!selected.length}
                        className={classes.button}
                        onClick={this.uploadPhotos}
                    >
                        <KeyboardArrowRight />
                    </Button>
                </Grid>
                <Grid item xs={5}>
                    <Group group={selectedGroups.to} />

                    <Grid container spacing={24} className={classes.photoContainer}>
                        {photos.to.items
                            .map(photo => <Photo photo={photo} key={photo.id} />)
                        }
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    private getData = async () => {
        await this.getSelectedGroups();

        // this.getPhotos("to");
    };

    private uploadPhotos = async () => {
        const {selected} = this.state;

        if (!selected.length) {
            return;
        }

        const {id, main_album_id} = this.props.selectedGroups.to;

        await this.uploadPhoto(main_album_id, id, selected);
    };

    private uploadPhoto = async (albumId, groupId, selected) => {
        const photo = selected[0];
        const {sizes} = photo;

        const maxSize = maxBy(sizes, (size) => size.width);


        await this.props.uploadPhoto({
            albumId, groupId, photo: {
                id: photo.id,
                src: maxSize.src
            }
        });

        selected.splice(0, 1);

        let {uploadingPhoto} = this.state;

        uploadingPhoto += 1;

        this.setState({uploadingPhoto});

        if (selected.length) {
            setTimeout(this.uploadPhoto, random(1000, 5000), albumId, groupId, selected);
        } else {
            this.setState({uploadingPhoto: 0});
        }
    };

    private handleSelect = (photo: IPhoto) => {
        const selected = this.state.selected as IPhoto[];

        const photoItem = selected.find(item => item.id === photo.id);

        if (photoItem) {
            const index = selected.indexOf(photoItem);
            selected.splice(index, 1);
        } else {
            selected.push(photo);
        }

        this.setState({selected});
    };

    private getPhotos = (type, {selectedGroups, photos}) => {
        const {id, main_album_id} = selectedGroups[type];
        const {offset} = photos[type];

        if (type === "from") {
            if (main_album_id) {
                this.props.getPhotosFrom({ownerId: id, albumId: main_album_id, offset, photo_sizes: 1});
            }
        } else {
            if (main_album_id) {
                this.props.getPhotosTo({ownerId: id, albumId: main_album_id, offset});
            }
        }
    };

    private getSelectedGroups = () => {
        const {selectedGroups} = this.props;

        if (!(selectedGroups.from.id || selectedGroups.to.id)) {
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            const from = params.get("from");
            const to = params.get("to");

            return this.props.getSelectedGroups(from, to);
        }
    };

    // private redirect = () => {
    //     this.props.history.push({
    //         pathname: `${this.props.match.path}`,
    //         search: `?from=${169506764}&to=${169506783}&albumFrom=${111}&albumTo=${222}`,
    //         state: {some: "state"}
    //     });
    // };
}

export const styledGroupsSelectedPage = withStyles(styles, {withTheme: true})(Component);

