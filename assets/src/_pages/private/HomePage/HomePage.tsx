import * as React from "react";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
// import {Link} from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import {userActions} from "../../../_actions";

class HomePage extends React.Component {
    public render() {
        return (
            <Grid>
                <Typography variant="headline" component="h3">
                    Главная страница
                </Typography>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export {connectedHomePage as HomePage};