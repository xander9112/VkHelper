import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import {store} from "./_helpers";
import {App} from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./_assets/app.css";

ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <CssBaseline />
            <App />
        </React.Fragment>
    </Provider>,
    document.getElementById("root") as HTMLElement
);

registerServiceWorker();
