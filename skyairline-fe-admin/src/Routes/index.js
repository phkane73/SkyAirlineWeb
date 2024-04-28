import Login from "../Components/LoginForm";
import Overview from "../Pages/Overview";
import Airport from "../Pages/AirportManagement";
import Plane from "../Pages/PlaneManagement";
import CreateSchedule from "../Pages/CreateSchedule";
import ListSchedule from "../Pages/ListSchedule";
import RevenueManagement from "../Pages/RevenueManagement";
import ListTicket from "../Pages/ListTicket";
import ListUser from "../Pages/ListUser";
import AuthLayout from "../Layouts/AuthLayout";
const routes = [
  { path: "/overview", page: Overview },
  { path: "/", page: Login, layout: AuthLayout },
  { path: "/airport", page: Airport },
  { path: "/plane", page: Plane },
  { path: "/schedule/create", page: CreateSchedule },
  { path: "/schedule/list", page: ListSchedule },
  { path: "/revenue", page: RevenueManagement },
  { path: "/ticket", page: ListTicket },
  { path: "/users", page: ListUser },
];

export default routes;
