import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import {IPhoto} from "../../../../_interfaces";
import {Photo} from "./Photo";
import TablePagination from "@material-ui/core/es/TablePagination/TablePagination";
import {TablePaginationActionsWrapped} from "../../GroupsSelectedPage_old/components/TablePaginationActions";

interface IProps extends WithStyles<typeof styles> {
  photos: IPhoto[],
  selected?: IPhoto[],
  handleSelect?: (id) => void
  handleDelete?: (ownerId, photoId) => void
}

interface IState {
  pagination: {
    rowsPerPage: number,
    page: number
  }
}

const styles = (theme: Theme) => createStyles({
  photoContainer: {
    marginTop: 24
  }
});

class Component extends React.Component<IProps, IState> {
  public state = {
    pagination: {
      rowsPerPage: 5,
      page: 0
    }
  };

  public render() {
    const {selected, classes} = this.props;
    const {pagination} = this.state;

    const photos = this.paginate(this.props.photos, pagination.rowsPerPage, pagination.page);

    return (
      <Grid container spacing={24}>
        {photos.map(photo => <Photo
          photo={photo}
          key={photo.id}
          selected={selected}
          handleSelect={this.handleSelect}
        />)}
        <Grid container spacing={24} className={classes.photoContainer}>
          <TablePagination
            colSpan={3}
            count={this.props.photos.length}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.page}
            component="div"
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActionsWrapped}
          />
        </Grid>

      </Grid>
    );
  }

  private handleSelect = (photo) => {
    if (this.props.handleSelect) {
      this.props.handleSelect(photo);
    }
  };

  private paginate = (array, pageSize, pageNumber) => {
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  };

  private handleChangePage = (event, page) => {
    const {pagination} = this.state;

    pagination.page = page;

    this.setState({pagination});
  };

  private handleChangeRowsPerPage = (event) => {
    const {pagination} = this.state;

    pagination.rowsPerPage = event.target.value;
    this.setState({pagination});
  };
}

export const Photos = withStyles(styles, {withTheme: true})(Component);

