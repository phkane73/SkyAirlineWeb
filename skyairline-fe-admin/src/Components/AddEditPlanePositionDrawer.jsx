import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getAllAirport } from "../Services/v2/AirportServices";
import {
  addPlanePosition,
  getPlanesNoPosition,
  updatePlanePosition,
} from "../Services/v2/PlanePositionServices";
import { getAllPlane } from "../Services/v2/PlaneServices";
import AlertComponent from "./Alert";
export default function AddEditPlanePositionDrawer({
  planePosition,
  type,
  onChildChange,
  takeOff,
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(
    planePosition
      ? {
          id: planePosition.id,
          airportId: planePosition.airport.id,
          planeId: planePosition.plane.id,
          startTime: dayjs(planePosition.startTime),
        }
      : {}
  );
  const [alertOpen, setAlertOpen] = useState(false);
  const [typeAlerts, setTypeAlerts] = useState({});
  const [planes, setPlanes] = useState([]);
  const [allPlanes, setAllPlanes] = useState([]);
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [allPlane, planeList, airportList] = await Promise.all([
        getAllPlane(),
        getPlanesNoPosition(),
        getAllAirport(),
      ]);
      if (planeList) {
        setPlanes(planeList);
      }
      if (airportList) {
        setAirports(airportList);
      }
      if (allPlane) {
        setAllPlanes(allPlane);
      }
    }
    fetchData();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    if (type === 1 && !newOpen) {
      setFormData({});
    }
    if (planePosition) {
      setFormData({
        id: planePosition.id,
        airportId: planePosition.airport.id,
        planeId: planePosition.plane.id,
        startTime: dayjs(planePosition.startTime),
      });
    }
    setOpen(newOpen);
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
    const validate = Object.values(formData).some(
      (value) => value === undefined || value === null || value === ""
    );
    if (validate || Object.values(formData).length < 3) {
      setTypeAlerts({
        code: "error",
        message: "Please fill in all required fields!",
      });
      setAlertOpen(true);
    } else if (type === 1) {
      const res = await addPlanePosition({
        ...formData,
      });
      if (res.code === 200) {
        onChildChange();
      }
      handleAlert(res.code, res.message);
    } else {
      const res = await updatePlanePosition({
        ...formData,
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
    <Box sx={{ width: 320 }} role="presentation">
      <div className="flex items-center justify-between ml-4 mt-2">
        <h1 className="uppercase font-bold text-2xl">
          {type === 0 ? "Plane Position Detail" : " Add Plane Position"}
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
        <div className="mx-4 mt-5 flex flex-col gap-10">
          <FormControl size="small">
            <InputLabel id="planeId">Choose Plane</InputLabel>
            <Select
              labelId="planeId"
              id="planeId"
              name="planeId"
              value={formData.planeId || ""}
              label="Choose Plane"
              onChange={handleInputChange}
            >
              {type === 1
                ? planes
                    .filter((item) => item.isOperating === true)
                    .map((plane) => (
                      <MenuItem key={plane.id} value={plane.id}>
                        {plane.planeName}
                      </MenuItem>
                    ))
                : allPlanes
                    .filter((item) => item.isOperating === true)
                    .map((plane) => (
                      <MenuItem key={plane.id} value={plane.id}>
                        {plane.planeName}
                      </MenuItem>
                    ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel id="airportId">Choose Airport</InputLabel>
            <Select
              labelId="airportId"
              id="airportId"
              name="airportId"
              value={formData.airportId || ""}
              label="Choose Airport"
              onChange={handleInputChange}
            >
              {airports
                .filter((item) => item.isOperating === true)
                .map((airport) => (
                  <MenuItem key={airport.id} value={airport.id}>
                    {airport.airportCode + " - " + airport.airportName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{ padding: 0 }}
          >
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                disablePast
                views={["year", "day", "hours", "minutes", "seconds"]}
                name="start"
                value={formData.startTime}
                format="DD/MM/YYYY HH:mm:ss"
                label="Start Time"
                onChange={(newValue) => {
                  setFormData({ ...formData, startTime: newValue });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button variant="contained" type="submit">
            {type === 0 ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Box>
  );

  return (
    <div>
      {type !== 1 ? (
        <Button
          onClick={toggleDrawer(true)}
          variant="outlined"
          disabled={takeOff}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </Button>
      ) : (
        <Button
          onClick={toggleDrawer(true)}
          variant="contained"
          className="!bg-[#2D7690]"
        >
          Add new plane position
        </Button>
      )}

      <Drawer anchor={"right"} open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
