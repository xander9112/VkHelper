import {combineReducers} from "redux";

import {authentication} from "./authentication.reducer";
import {users} from "./users.reducer";
import {alert} from "./alert.reducer";
import {roles} from "./role.reducer";
import {groups} from "./group.reducer";


const rootReducer = combineReducers({
    alert,
    authentication,
    users,
    roles,
    groups
});

export default rootReducer;
