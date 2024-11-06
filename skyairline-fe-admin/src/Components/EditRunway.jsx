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
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { updatedRunway } from "../Services/v2/RunwayServices";
import AlertComponent from "./Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditRunway({ runways, onChildChange }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [typeAlerts, setTypeAlerts] = React.useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAlertOpen(false);
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

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    function fetchData() {
      setFormData(runways);
    }
    fetchData();
  }, [runways]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await updatedRunway(formData);
    if (res.code === 200) {
      onChildChange();
    }
    handleAlert(res.code, res.message);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFormData = formData.map((runway, i) => {
      if (i === index) {
        return {
          ...runway,
          [name]: value,
        };
      }
      return runway;
    });
    setFormData(updatedFormData);
  };

  const handleResetAvailableTime = async (id) => {
    const res = await resetAvailableTime(id);
    if (res.code === 200) {
      onChildChange();
    }
    handleAlert(res.code, res.message);
  };

  return (
    <div>
      <button
        className="bg-black opacity-90 text-white font-bold py-1 px-2 rounded uppercase mb-1 transition-all"
        onClick={() => {
          handleOpen();
        }}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="text-center text-xl mb-2 uppercase">Runway List</h1>
            <form onSubmit={handleSubmit}>
              <AlertComponent
                open={alertOpen}
                handleClose={handleAlertClose}
                message={typeAlerts.message}
                type={typeAlerts.code}
              />
              <div className="flex flex-col items-center">
                {runways.length > 0
                  ? formData?.map((runway, index) => (
                      <div
                        className="mx-4 mt-5 flex gap-14 items-center"
                        key={runway.id}
                      >
                        <TextField
                          id="runwayCode"
                          name="runwayCode"
                          size="small"
                          label="Runway Code"
                          variant="outlined"
                          value={runway.runwayCode}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        <FormControl className="w-[230px]" size="small">
                          <InputLabel id="runwayType">Runway Type</InputLabel>
                          <Select
                            labelId="runwayType"
                            id="runwayType"
                            name="runwayType"
                            value={runway.runwayType}
                            label="Runway Type"
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          >
                            <MenuItem value={"Take Off"}>Take Off</MenuItem>
                            <MenuItem value={"Landing"}>Landing</MenuItem>
                            <MenuItem value={"All"}>All</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          disabled={true}
                          id="availableTime"
                          name="availableTime"
                          size="small"
                          label="Available Time"
                          variant="outlined"
                          value={
                            runway.availableTime
                              ? dayjs(runway.availableTime).format(
                                  "HH:mm:ss - DD/MM/YYYY"
                                )
                              : ""
                          }
                        />
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleResetAvailableTime(runway.id)}
                        >
                          <i className="fa-solid fa-arrows-rotate"></i>
                        </IconButton>
                        <FormControlLabel
                          className="flex flex-col"
                          control={
                            <Switch
                              id="isOperating"
                              name="isOperating"
                              checked={runway.isOperating}
                              onChange={(event) => {
                                const updatedValue = event.target.checked;
                                const updatedRunway = {
                                  ...runway,
                                  isOperating: updatedValue,
                                };

                                setFormData((prevFormData) =>
                                  prevFormData.map((r, i) =>
                                    i === index ? updatedRunway : r
                                  )
                                );
                              }}
                            />
                          }
                          label={runway.isOperating ? "Active" : "Pending"}
                        />
                      </div>
                    ))
                  : "No runway"}
                {runways.length > 0 && (
                  <button
                    className="bg-black w-[100px] text-white font-bold py-2 px-5 rounded uppercase mt-4 transition-all float-end"
                    type="submit"
                  >
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
