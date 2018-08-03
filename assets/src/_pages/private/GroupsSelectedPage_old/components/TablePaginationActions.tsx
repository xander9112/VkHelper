import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const styles = (theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

interface IProps extends WithStyles<typeof styles> {
  count: number,
  page: number,
  rowsPerPage: number,
  onChangePage: (event, page) => void
}

class TablePaginationActions extends React.Component<IProps> {
  public render() {
    const {classes, count, page, rowsPerPage} = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    );
  }

  private handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  private handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  private handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  private handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    );
  };
}


export const TablePaginationActionsWrapped = withStyles(styles, {withTheme: true})(TablePaginationActions);

