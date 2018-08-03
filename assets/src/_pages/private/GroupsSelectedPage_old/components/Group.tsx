import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import {IGroup} from "../../../../_interfaces/_groups";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface IProps extends WithStyles<typeof styles> {
    group: IGroup
    onSave?: (group) => void
    onDelete?: (group) => void
    handleClickUpload?: (group) => void
    handleClickDownload?: (group) => void
}

interface IState {
    isEditing: boolean
    groupLocal: IGroup
}

const styles = (theme: Theme) => createStyles({
    card: {
        // maxWidth: 345,
        // height: 410
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
        const {group, classes} = this.props;

        return (
            <Grid item xs={12}>
                <Card className={classes.card} raised>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {group.name}
                        </Typography>
                    </CardContent>
                    <CardActions />
                </Card>
            </Grid>
        );
    }

    // private handleClickUpload = () => {
    //     if (this.props.handleClickUpload) {
    //         this.props.handleClickUpload(this.props.group.id);
    //     }
    // };

    // private handleClickDownload = () => {
    //     if (this.props.handleClickDownload) {
    //         this.props.handleClickDownload(this.props.group.id);
    //     }
    // };
}

export const Group = withStyles(styles, {withTheme: true})(Component);

