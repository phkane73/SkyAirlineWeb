import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  Pagination,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertComponent from "../../Components/Alert";
import {
  deleteFlightSchedule,
  getAllFlightScheduleWithPaginate,
} from "../../Services/v2/FlightScheduleServices";
import { generateFlight } from "../../Services/v2/FlightServices";
const FlightScheduleManagement = () => {
  const [startFlightScheduleTime, setStartFlightScheduleTime] = useState(null);
  const [endFlightScheduleTime, setEndFlightScheduleTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [render, setRender] = useState(false);
  const [listFlightSchedule, setListFlightSchedule] = useState([]);
  const [approved, setApproved] = useState(null);
  const [startTimeSchedule, setStartTimeSchedule] = useState(null);
  const [endTimeSchedule, setEndTimeSchedule] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [typeAlerts, setTypeAlerts] = useState({});
  const [open, setOpen] = useState(false);
  const [idFlightSchedule, setIdFlightSchedule] = useState(0);

  const handleOpen = (id) => {
    setOpen(true);
    setIdFlightSchedule(id);
  };
  const handleClose = () => {
    setOpen(false);
    setIdFlightSchedule(0);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 510,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  };
  //   const handleCreate = async (event) => {
  //     event.preventDefault();
  //     const startFlightScheduleTimeTime = dayjs(startFlightScheduleTime).format("YYYY-MM-DD HH:mm");
  //     const endTime = dayjs(endFlightScheduleTime).format("YYYY-MM-DD HH:mm");
  //     var error = false;
  //     setMessage("");
  //     if (startFlightScheduleTimeTime === "Invalid Date" || endTime === "Invalid Date") {
  //       error = true;
  //       setMessage(
  //         <span className="text-red-600 absolute">
  //           Vui lòng nhập đầy đủ thông tin!
  //         </span>
  //       );
  //     }
  //     if (dayjs(startFlightScheduleTimeTime).isSame(dayjs(), "date")) {
  //       error = true;
  //       setMessage(
  //         <span className="text-red-600 absolute">
  //           Ngày bắt đầu phải sau ngày hiện tại!
  //         </span>
  //       );
  //     }
  //     if (dayjs(startFlightScheduleTimeTime).isAfter(dayjs(endTime))) {
  //       error = true;
  //       setMessage(
  //         <span className="text-red-600 absolute">
  //           Thời gian bắt đầu phải trước thời gian kết thúc!
  //         </span>
  //       );
  //     }
  //     if (error === false) {
  //       setLoading(true);
  //       //   const data = await createSchedule(startFlightScheduleTimeTime, endTime, 0);
  //       if (data) {
  //         const array = Object.values(data);
  //         setTotal(array.length);
  //         setMessage("");
  //         if (array.length !== 0) {
  //           setListSchedule(array);
  //         } else {
  //           alert("Ngày này đã có lịch bay!");
  //         }
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   const handleSave = async (event) => {
  //     event.preventDefault();
  //     const startFlightScheduleTimeTime = dayjs(startFlightScheduleTime).format("YYYY-MM-DD HH:mm");
  //     const endTime = dayjs(endFlightScheduleTime).format("YYYY-MM-DD HH:mm");
  //     if (listSchedule.length > 0 && loading === false) {
  //       setSave(true);
  //       //   const data = await createSchedule(startFlightScheduleTimeTime, endTime, 1);
  //       if (data) {
  //         setSave(false);
  //         alert("Đã lưu các chuyến bay");
  //       }
  //     } else {
  //       setMessage(
  //         <span className="text-red-600 absolute">Vui lòng tạo lịch!</span>
  //       );
  //     }
  //   };

  const handleCreateFlightSchedule = async () => {
    if (!startFlightScheduleTime || !endFlightScheduleTime) {
      handleAlert(
        400,
        "Please enter start and end time schedule to create a flight schedule"
      );
    } else {
      setLoading(true);
      generateFlight({
        startFlightScheduleTime,
        endFlightScheduleTime,
      })
        .then((result) => {
          setRender(!render);
          handleAlert(result.data.code, result.data.message);
          setLoading(false);
        })
        .catch((error) => {
          handleAlert(
            error.response.data.statusCode,
            error.response.data.message
          );
          setLoading(false);
        });
      
    }
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
    async function fetchData() {
      const response = await getAllFlightScheduleWithPaginate({
        page,
        limit,
        startTimeSchedule,
        endTimeSchedule,
        approved,
      });
      if (response) {
        setTotalItems(response.total);
        setTotalPages(response.totalPages);
        setListFlightSchedule(response.data);
      }
    }
    fetchData();
  }, [page, limit, render, startTimeSchedule, endTimeSchedule, approved]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDeleteFlightSchedule = async () => {
    const result = await deleteFlightSchedule(idFlightSchedule);
    if (result) {
      setRender(!render);
      handleAlert(result.code, result.message);
    }
  };

  const handleResetFilter = (event) => {
    setStartTimeSchedule(null);
    setEndTimeSchedule(null);
  };

  return (
    <div className="p-3">
      <h1 className="text-center text-3xl font-bold pb-2">
        FLIGHT SCHEDULE MANAGEMENT
      </h1>
      <AlertComponent
        open={alertOpen}
        handleClose={handleAlertClose}
        message={typeAlerts.message}
        type={typeAlerts.code}
      />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this flight schedule?
            </Typography>
            <div className="flex gap-3 justify-end">
              <Button onClick={handleClose} variant="contained" color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteFlightSchedule}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="flex gap-2">
        <div className="basis-4/5">
          <div className="flex gap-3 mb-1 justify-end items-center">
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{ padding: 0 }}
            >
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  name="startTimeSchedule"
                  value={startTimeSchedule}
                  disablePast
                  format="DD/MM/YYYY HH:mm:ss"
                  label="Search by start time"
                  onChange={(newValue) => {
                    setStartTimeSchedule(newValue);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{ padding: 0 }}
            >
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  name="endTimeSchedule"
                  value={endTimeSchedule}
                  disablePast
                  format="DD/MM/YYYY HH:mm:ss"
                  label="Search by start time"
                  onChange={(newValue) => {
                    setEndTimeSchedule(newValue);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <IconButton
              color="primary"
              size="small"
              onClick={handleResetFilter}
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </IconButton>
          </div>
          <TableContainer component={Paper} sx={{ maxHeight: 420 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    Start time schedule
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    End time schedule
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    Details
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listFlightSchedule.map((fs) => {
                  return (
                    <TableRow key={fs.id} style={{ cursor: "default" }}>
                      <TableCell style={{ fontSize: "15px" }}>
                        {dayjs(fs.startTimeSchedule).format(
                          "HH:mm:ss - DD/MM/YYYY"
                        )}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }}>
                        {dayjs(fs.endTimeSchedule).format(
                          "HH:mm:ss - DD/MM/YYYY"
                        )}
                      </TableCell>
                      <TableCell
                        style={{ fontSize: "15px", textAlign: "center" }}
                      >
                        {fs.approved === true ? (
                          <Chip label="Approved" color="success" />
                        ) : undefined}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }}>
                        <IconButton
                          aria-label="delete"
                          color="info"
                          component={Link}
                          to={`/flightScheduleDetail/${fs.id}`}
                        >
                          <i className="fa-solid fa-list"></i>
                        </IconButton>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }}>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleOpen(fs.id)}
                          disabled={fs.approved}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex justify-between items-center pt-3">
            <Pagination
              count={totalPages}
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
            <h4 className="mt-4">Total flight schedule: {totalItems}</h4>
          </div>
        </div>
        <div className="basis-1/5 relative">
          {loading ? (
            <LinearProgress />
          ) : (
            <LinearProgress
              sx={{
                "& .MuiLinearProgress-bar": {
                  transition: "none",
                },
              }}
              variant="determinate"
              value={100}
            />
          )}
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{ padding: 0 }}
          >
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                name="startFlightScheduleTime"
                value={startFlightScheduleTime}
                disablePast
                format="DD/MM/YYYY HH:mm:ss"
                label="Start time schedule"
                onChange={(newValue) => {
                  setStartFlightScheduleTime(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                name="endFlightScheduleTime"
                value={endFlightScheduleTime}
                disablePast
                format="DD/MM/YYYY HH:mm:ss"
                label="End time schedule"
                onChange={(newValue) => {
                  setEndFlightScheduleTime(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div className="flex justify-center">
            <button
              className="bg-black hover:bg-gray-700 text-center text-white font-bold py-2 px-5 rounded uppercase mt-4 transition-all"
              type="button"
              onClick={handleCreateFlightSchedule}
            >
              Create Flight Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightScheduleManagement;
