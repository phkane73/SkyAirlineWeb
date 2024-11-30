import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import {
  hoursAndMinutesToMilliseconds,
  millisecondsToHoursAndMinutes,
} from "../common/convertTime";
import { getAllAirport } from "../Services/v2/AirportServices";
import {
  addFlightRoute,
  updateFlightRoute,
} from "../Services/v2/FlightRouteServices";
import AlertComponent from "./Alert";

export default function AddEditFlightRouteDrawer({
  flightRoute,
  type,
  onChildChange,
}) {
  const { hours, minutes } = millisecondsToHoursAndMinutes(
    flightRoute?.flightRouteEstTime ?? 0
  );

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(
    flightRoute
      ? {
          id: flightRoute.id,
          arrivalAirportId: flightRoute.arrivalAirport.id,
          departureAirportId: flightRoute.departureAirport.id,
          flightRoutePrice: flightRoute.flightRoutePrice,
          isOperating: flightRoute.isOperating,
          hours,
          minutes,
        }
      : {}
  );
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [typeAlerts, setTypeAlerts] = React.useState({});
  const [airports, setAirports] = React.useState([]);

  const toggleDrawer = (newOpen) => () => {
    if (type === 1 && !newOpen) {
      setFormData({});
    }
    if (flightRoute) {
      setFormData({
        id: flightRoute.id,
        arrivalAirportId: flightRoute.arrivalAirport.id,
        departureAirportId: flightRoute.departureAirport.id,
        flightRoutePrice: flightRoute.flightRoutePrice,
        isOperating: flightRoute.isOperating,
        hours,
        minutes,
      });
    }
    setOpen(newOpen);
  };

  React.useEffect(() => {
    async function fetchData() {
      const airportList = await getAllAirport();

      if (airportList) {
        setAirports(airportList);
      }
    }
    fetchData();
  }, []);

  const handleChangeSwitch = (args) => {
    setFormData({ ...formData, isOperating: args });
  };

  const handleAlert = (code, message) => {
    if (code === 200) {
      setTypeAlerts({
        code: "success",
        message,
      });
      setAlertOpen(true);
    } else {
      setTypeAlerts({
        code: "error",
        message,
      });
      setAlertOpen(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.isOperating) {
      formData.isOperating = false;
    }
    const validate = Object.values(formData).some(
      (value) => value === undefined || value === null || value === ""
    );
    if (validate || Object.values(formData).length < 6) {
      setTypeAlerts({
        code: "error",
        message: "Please fill in all required fields!",
      });
      setAlertOpen(true);
    } else if (type === 1) {
      const res = await addFlightRoute({
        arrivalAirportId: formData.arrivalAirportId,
        departureAirportId: formData.departureAirportId,
        flightRouteEstTime: hoursAndMinutesToMilliseconds(
          formData.hours,
          formData.minutes
        ),
        flightRoutePrice: formData.flightRoutePrice,
        isOperating: formData.isOperating,
      });
      if (res.code === 200) {
        onChildChange();
      }
      handleAlert(res.code, res.message);
    } else {
      const res = await updateFlightRoute({
        id: formData.id,
        arrivalAirportId: formData.arrivalAirportId,
        departureAirportId: formData.departureAirportId,
        flightRouteEstTime: hoursAndMinutesToMilliseconds(
          formData.hours,
          formData.minutes
        ),
        flightRoutePrice: formData.flightRoutePrice,
        isOperating: formData.isOperating,
      });
      if (res.code === 200) {
        onChildChange();
      }
      handleAlert(res.code, res.message);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <div className="flex items-center justify-between ml-4">
        <h1 className="uppercase font-bold text-2xl">
          {flightRoute ? "Plane Detail" : " Add flightRoute"}
        </h1>
        <button onClick={toggleDrawer(false)} className="p-4">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <AlertComponent
          open={alertOpen}
          handleClose={handleAlertClose}
          message={typeAlerts.message}
          type={typeAlerts.code}
        />
        <div className="mx-4 mt-3 flex flex-col gap-10">
          <FormControl size="small">
            <InputLabel id="arrivalAirportId">Airport A</InputLabel>
            <Select
              labelId="arrivalAirportId"
              id="arrivalAirportId"
              name="arrivalAirportId"
              value={formData.arrivalAirportId || ""}
              label="Airport A"
              onChange={handleInputChange}
            >
              {airports
                .filter(
                  (item) =>
                    item.isOperating === true &&
                    item.id !== formData.departureAirportId
                )
                .map((airport) => (
                  <MenuItem key={airport.id} value={airport.id}>
                    {airport.airportCode + " - " + airport.airportName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="departureAirportId">Airport B</InputLabel>
            <Select
              labelId="departureAirportId"
              id="departureAirportId"
              name="departureAirportId"
              value={formData.departureAirportId || ""}
              label="Airport B"
              onChange={handleInputChange}
            >
              {airports
                .filter(
                  (item) =>
                    item.isOperating === true &&
                    item.id !== formData.arrivalAirportId
                )
                .map((airport) => (
                  <MenuItem key={airport.id} value={airport.id}>
                    {airport.airportCode + " - " + airport.airportName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            id="flightRoutePrice"
            name="flightRoutePrice"
            size="small"
            label="Flight Route Price"
            variant="outlined"
            value={formData.flightRoutePrice}
            onChange={handleInputChange}
          />
          <div className="flex gap-2">
            <TextField
              id="hours"
              name="hours"
              size="small"
              label="Hours"
              variant="outlined"
              value={formData.hours}
              type="number"
              onChange={handleInputChange}
            />
            <TextField
              id="minutes"
              name="minutes"
              size="small"
              label="Minutes"
              variant="outlined"
              value={formData.minutes}
              type="number"
              onChange={handleInputChange}
            />
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isOperating ?? false}
                onChange={() => handleChangeSwitch(!formData.isOperating)}
              />
            }
            label={formData.isOperating ? "Active" : "DeActive"}
          />
          <Button variant="contained" type="submit">
            {flightRoute ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Box>
  );

  return (
    <div>
      {flightRoute ? (
        <Button onClick={toggleDrawer(true)} variant="outlined">
          {flightRoute.id}
        </Button>
      ) : (
        <Button
          onClick={toggleDrawer(true)}
          variant="contained"
          className="!bg-[#2D7690]"
        >
          Add new flight route
        </Button>
      )}

      <Drawer anchor={"right"} open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
