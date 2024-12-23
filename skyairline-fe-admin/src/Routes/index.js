import Login from "../Components/LoginForm";
import AuthLayout from "../Layouts/AuthLayout";
import CreateSchedule from "../Pages/CreateSchedule";
import ListSchedule from "../Pages/ListSchedule";
import ListTicket from "../Pages/ListTicket";
import ListUser from "../Pages/ListUser";
import Overview from "../Pages/Overview";
import RevenueManagement from "../Pages/RevenueManagement";
import Airport from "../Pages/v2/AirportManagement";
import FlightRoute from "../Pages/v2/FlightRouteManagement";
import FlightScheduleDetail from "../Pages/v2/FlightScheduleDetail";
import FlightScheduleManagement from "../Pages/v2/FlightScheduleManagement";
import Plane from "../Pages/v2/PlaneManagement";
import PlanePosition from "../Pages/v2/PlanePositionManagement";
const routes = [
  { path: "/overview", page: Overview },
  { path: "/", page: Login, layout: AuthLayout },
  { path: "/airport", page: Airport },
  { path: "/plane", page: Plane },
  { path: "/planePosition", page: PlanePosition },
  { path: "/flightRoute", page: FlightRoute },
  { path: "/flightSchedule", page: FlightScheduleManagement },
  { path: "/flightScheduleDetail/:id", page: FlightScheduleDetail },
  { path: "/schedule/create", page: CreateSchedule },
  { path: "/schedule/list", page: ListSchedule },
  { path: "/revenue", page: RevenueManagement },
  { path: "/ticket", page: ListTicket },
  { path: "/users", page: ListUser },
];

export default routes;
