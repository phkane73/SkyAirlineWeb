import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import { getAllAirport } from "../Services/v2/AirportServices";
import { createRunway } from "../Services/v2/RunwayServices";
import AlertComponent from "./Alert";

export default function AddRunway({ onChildChange }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [typeAlerts, setTypeAlerts] = React.useState({});
  const [airports, setAirports] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const airportList = await getAllAirport();
      if (airportList) {
        setAirports(airportList);
      }
    }
    fetchData();
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setFormData({});
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
    if (!formData.isOperating) {
      formData.isOperating = false;
    }
    const validate = Object.values(formData).some(
      (value) => value === undefined || value === null || value === ""
    );
    if (validate || Object.values(formData).length < 3) {
      setTypeAlerts({
        code: "error",
        message: "Please fill in all required fields!",
      });
      setAlertOpen(true);
    } else {
      const res = await createRunway({
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
    <Box sx={{ width: 300 }} role="presentation">
      <div className="flex items-center justify-between ml-4">
        <h1 className="uppercase font-bold text-2xl">Add Runway</h1>
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
          <TextField
            id="runwayCode"
            name="runwayCode"
            size="small"
            label="Runway Code"
            variant="outlined"
            value={formData.runwayCode}
            onChange={handleInputChange}
          />
          <FormControl size="small">
            <InputLabel id="runwayType">Runway Type</InputLabel>
            <Select
              labelId="runwayType"
              id="runwayType"
              name="runwayType"
              value={formData.runwayType}
              label="Runway Type"
              onChange={handleInputChange}
            >
              <MenuItem value={undefined}></MenuItem>
              <MenuItem value={"Take Off"}>Take Off</MenuItem>
              <MenuItem value={"Landing"}>Landing</MenuItem>
              <MenuItem value={"All"}>All</MenuItem>
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
                // .filter((item) => item.isOperating === true)
                .map((airport) => (
                  <MenuItem key={airport.id} value={airport.id}>
                    {airport.airportCode + " - " + airport.airportName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </div>
      </form>
    </Box>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        variant="contained"
        className="!bg-[#2D7690]"
      >
        Add runway
      </Button>
      <Drawer anchor={"right"} open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
