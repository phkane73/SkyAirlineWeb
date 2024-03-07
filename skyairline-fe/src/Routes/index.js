import DefaultLayout from "../Layouts/DefaultLayout";
import LayoutAuth from "../Layouts/LayoutAuth";
import Login from "../Components/FormLogin";
import Register from "../Components/FormRegister";
import Home from "../Pages/Home";
import BookingLayout from "../Layouts/BookingLayout";
import ChooseFlight from "../Pages/ChooseFlight";
import ValidInformation from "../Pages/ValidInformation";

const routes = [
  { path: "/", page: Home, layout: DefaultLayout },
  { path: "/login", page: Login, layout: LayoutAuth },
  { path: "/register", page: Register, layout: LayoutAuth },
  {
    path: "/booking/chooseflight/:departure/:arrival/:date",
    page: ChooseFlight,
    layout: BookingLayout,
  },
  {
    path: "/booking/validinformation/:id/:class",
    page: ValidInformation,
    layout: BookingLayout,
  },
];

export default routes;
