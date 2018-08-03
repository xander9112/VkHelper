import * as React from "react";
import {history} from "../../../_helpers";

interface IProps {
  logout: () => void,
}

class LogoutPage extends React.Component<IProps> {
  public componentDidMount() {
    this.props.logout();

    history.push("/");
  }

  public render = () => (<React.Fragment />);
}

export {LogoutPage};
