import Login from "../Components/FormLogin";
import Register from "../Components/FormRegister";
import BookingLayout from "../Layouts/BookingLayout";
import DefaultLayout from "../Layouts/DefaultLayout";
import LayoutAuth from "../Layouts/LayoutAuth";
import ChooseFlight from "../Pages/ChooseFlight";
import ChooseSeat from "../Pages/ChooseSeat";
import Home from "../Pages/Home";
import Payment from "../Pages/Payment";
import TicketPage from "../Pages/TicketPage";
import ValidInformation from "../Pages/ValidInformation";
const routes = [
  { path: "/", page: Home, layout: DefaultLayout },
  { path: "/login", page: Login, layout: LayoutAuth },
  { path: "/register", page: Register, layout: LayoutAuth },
  { path: "/ticket", page: TicketPage, layout: DefaultLayout },
  {
    path: "/booking/chooseflight/:id",
    page: ChooseFlight,
    layout: BookingLayout,
  },
  {
    path: "/booking/validinformation/:id/:idClass",
    page: ValidInformation,
    layout: BookingLayout,
  },
  {
    path: "/booking/chooseseat",
    page: ChooseSeat,
    layout: BookingLayout,
  },
  {
    path: "/booking/payment",
    page: Payment,
    layout: BookingLayout,
  },
];

export default routes;
