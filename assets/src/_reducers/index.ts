import {combineReducers} from "redux";

import {alert} from "./alert.reducer";
import {auth} from "./auth.reducer";
import {roles} from "./role.reducer";
import {groups} from "./group.reducer";
import {groupsSelected} from "./groupsSelected.reducer";


const rootReducer = combineReducers({
  alert,
  auth,
  roles,
  groups,
  groupsSelected
});

export default rootReducer;
