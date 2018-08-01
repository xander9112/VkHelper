// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import {HomePage} from "../_pages/private/HomePage";
import {RolesPage} from "../_pages/private/RolesPage";


const dashboardRoutes = [
    {
        path: "/home",
        sidebarName: "HomePage",
        navbarName: "Material Dashboard",
        icon: Dashboard,
        component: HomePage
    },
    {
        path: "/roles",
        sidebarName: "RolesPage",
        navbarName: "Material Dashboard",
        icon: Person,
        component: RolesPage
    },
    {redirect: true, path: "/", to: "/admin", navbarName: "Redirect"}
];

export default dashboardRoutes;
