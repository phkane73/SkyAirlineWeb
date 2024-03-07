import Login from "../Components/LoginForm";
import Overview from "../Pages/Overview";
import Airport from "../Pages/AirportManagement";
import Plane from "../Pages/PlaneManagement"
import CreateSchedule from "../Pages/CreateSchedule";
import ListSchedule from "../Pages/ListSchedule";

const routes = [
  { path: "/", page: Overview },
  { path: "/login", page: Login },
  { path: "/airport", page: Airport },
  { path: "/plane", page: Plane },
  { path: "/schedule/create", page: CreateSchedule },
  { path: "/schedule/list", page: ListSchedule },
];

export default routes;
