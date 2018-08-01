import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import {IGroup} from "../../../_interfaces/_groups";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloudDownload from "@material-ui/icons/CloudDownload";
import CloudUpload from "@material-ui/icons/CloudUpload";

interface IProps extends WithStyles<typeof styles> {
    group: IGroup
    onSave?: (group) => void
    onDelete?: (group) => void
    handleClickUpload?: (group) => void
    handleClickDownload?: (group) => void
    selectedGroups: {
        from: number | null
        to: number | null
    }
}

interface IState {
    isEditing: boolean
    groupLocal: IGroup
}

const styles = (theme: Theme) => createStyles({
    card: {
        maxWidth: 345,
        height: 410
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    }
});

class Component extends React.Component<IProps, IState> {
    public state = {
        isEditing: false,
        groupLocal: {} as any
    };

    public render() {
        const {group, classes, selectedGroups} = this.props;

        const from = !!selectedGroups.from && selectedGroups.from !== group.id;
        const fromTo = !!selectedGroups.to && selectedGroups.to === group.id;
        const to = !!selectedGroups.to && selectedGroups.to !== group.id;
        const toFrom = !!selectedGroups.from && selectedGroups.from === group.id;

        const disabledUpload = from || fromTo;
        const disabledDownload = to || toFrom;

        return (
            <Grid item xs={3}>
                <Card className={classes.card} raised>
                    <CardMedia
                        className={classes.media}
                        image={group.photo_200}
                        title={group.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {group.name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            disabled={disabledUpload}
                            size="small"
                            color="primary"
                            onClick={this.handleClickUpload}
                        >
                            <CloudUpload className={classes.leftIcon} />
                            Выгрузить
                        </Button>
                        <Button
                            disabled={disabledDownload}
                            size="small"
                            color="primary"
                            onClick={this.handleClickDownload}
                        >
                            <CloudDownload className={classes.leftIcon} />
                            Загрузить
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

    private handleClickUpload = () => {
        if (this.props.handleClickUpload) {
            this.props.handleClickUpload(this.props.group.id);
        }
    };

    private handleClickDownload = () => {
        if (this.props.handleClickDownload) {
            this.props.handleClickDownload(this.props.group.id);
        }
    };
}

export const Group = withStyles(styles, {withTheme: true})(Component);

