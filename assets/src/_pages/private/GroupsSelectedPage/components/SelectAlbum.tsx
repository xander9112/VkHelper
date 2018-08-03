import * as React from "react";
import {Theme} from "@material-ui/core/styles/createMuiTheme";
import {createStyles, withStyles, WithStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Input from "@material-ui/core/es/Input/Input";
import {IAlbum} from "../../../../_interfaces/_album";

interface IProps extends WithStyles<typeof styles> {
  name: string
  title: string
  values: IAlbum[]
  value: string | number
  handleChange: (value) => void
}

const styles = (theme: Theme) => createStyles({
  formControl: {
    width: "100%",
    marginTop: theme.spacing.unit
  }
});

class Component extends React.Component<IProps> {
  public render() {
    const {classes, name, title, values, value} = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-helper">{title}</InputLabel>
        <Select
          value={value}
          onChange={this.handleChange}
          input={<Input name={name} id="age-helper" />}
          autoWidth
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {values.map(item => <MenuItem value={item.id} key={item.id}>{item.title}</MenuItem>)}

        </Select>
      </FormControl>
    );
  }

  private handleChange = (event) => {
    this.props.handleChange({[event.target.name]: event.target.value});
  };
}

export const SelectAlbum = withStyles(styles, {withTheme: true})(Component);
