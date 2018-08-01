import {MainPage} from "../_pages/private/MainPage";
import {AuthPage} from "../_pages/auth";

const indexRoutes = [{
    path: "/admin",
    component: AuthPage,
    private: false
}, {
    path: "/admin/auth",
    component: MainPage,
    private: true
}];

export default indexRoutes;
