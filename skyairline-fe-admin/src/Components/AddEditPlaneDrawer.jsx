import { FormControlLabel, Switch, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import { addPlane, updatePlane } from "../Services/v2/PlaneServices";
import AlertComponent from "./Alert";

export default function AddEditPlaneDrawer({ plane, type, onChildChange }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ ...plane } ?? {});
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [typeAlerts, setTypeAlerts] = React.useState({});

  const toggleDrawer = (newOpen) => () => {
    if (type === 1 && !newOpen) {
      setFormData({});
    }
    setFormData({ ...plane });
    setOpen(newOpen);
  };

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
    if (validate || Object.values(formData).length < 2) {
      setTypeAlerts({
        code: "error",
        message: "Please fill in all required fields!",
      });
      setAlertOpen(true);
    } else if (type === 1) {
      const res = await addPlane({
        ...formData,
      });
      if (res.code === 200) {
        onChildChange();
      }
      handleAlert(res.code, res.message);
    } else {
      const res = await updatePlane({
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
        <h1 className="uppercase font-bold text-2xl">
          {plane ? "Plane Detail" : " Add plane"}
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
          <TextField
            id="planeName"
            name="planeName"
            size="small"
            label="Plane Name"
            variant="outlined"
            value={formData.planeName}
            onChange={handleInputChange}
          />
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
            {plane ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Box>
  );

  return (
    <div>
      {plane ? (
        <Button onClick={toggleDrawer(true)} variant="outlined">
          {plane.planeName}
        </Button>
      ) : (
        <Button
          onClick={toggleDrawer(true)}
          variant="contained"
          className="!bg-[#2D7690]"
        >
          Add new plane
        </Button>
      )}

      <Drawer anchor={"right"} open={open}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
