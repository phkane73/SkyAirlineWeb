import { Button, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AlertComponent from "../../Components/Alert";
import {
  approveFlightSchedule,
  checkApprove,
} from "../../Services/v2/FlightScheduleServices";
import { getAllFlightByFlightScheduleId } from "../../Services/v2/FlightServices";
export default function FlightScheduleDetail() {
  const [data, setData] = useState([]);
  const [flights, setFlights] = useState([]);
  const [render, setRender] = useState(false);
  const [approve, setApprove] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [typeAlerts, setTypeAlerts] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const [result, approved] = await Promise.all([
        getAllFlightByFlightScheduleId(id),
        checkApprove(id),
      ]);
      if (result) {
        setFlights(result);
      }
      if (approved) {
        setApprove(true);
      }
    }
    fetchData();
  }, [render, approve]);

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

  const handleApprove = async () => {
    const approveResult = await approveFlightSchedule(id);
    if (approveResult) {
      setRender(!render);
      handleAlert(approveResult.code, approveResult.message);
    }
  };

  return (
    <div className="px-10 pt-3">
      <h1 className="text-center text-2xl font-bold uppercase">
        Flight Schedule Detail
      </h1>
      <AlertComponent
        open={alertOpen}
        handleClose={handleAlertClose}
        message={typeAlerts.message}
        type={typeAlerts.code}
      />
      <div className="flex gap-3 mb-2 justify-between">
        <IconButton
          aria-label="delete"
          className="!bg-[#2D7690]"
          component={Link}
          to="/flightSchedule"
        >
          <i className="fa-regular fa-circle-left text-white"></i>
        </IconButton>
        {approve ? (
          ""
        ) : (
          <Button
            variant="contained"
            className="!bg-[#2D7690]"
            onClick={() => handleApprove()}
          >
            Approved
          </Button>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          {/* <AddEditAirportDrawer type={1} onChildChange={handleChildChange} />
          <AddRunway onChildChange={handleChildChange}></AddRunway> */}
        </div>
        {/* <Search text="Enter Airport Code for search" onSearch={handleSearch} /> */}
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 480, maxWidth: 1200 }}>
        <Table sx={{ maxWidth: 1200 }} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  cursor: "default",
                  fontSize: "16px",
                }}
              >
                Flight Code
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  cursor: "default",
                  fontSize: "16px",
                }}
              >
                Departure Time
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  cursor: "default",
                  fontSize: "16px",
                }}
              >
                Arrival Time
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  cursor: "default",
                  fontSize: "16px",
                }}
              >
                Plane Name
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  cursor: "default",
                  fontSize: "16px",
                }}
              >
                Departure Airport
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  cursor: "default",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                Arrival Airport
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights?.map((flight) => {
              return (
                <TableRow key={flight.id} style={{ cursor: "default" }}>
                  <TableCell style={{ fontSize: "15px" }}>
                    {flight.flightCode}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {dayjs(flight.departureTime).format(
                      "HH:mm:ss - DD/MM/YYYY"
                    )}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {dayjs(flight.arrivalTime).format("HH:mm:ss - DD/MM/YYYY")}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {flight.plane.planeName}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px", textAlign: "center" }}>
                    {flight.departureAirport.airportCode}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px", textAlign: "center" }}>
                    {flight.arrivalAirport.airportCode}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <h4 className="mt-2">Total: {flights.length ?? 0}</h4>
    </div>
  );
}
