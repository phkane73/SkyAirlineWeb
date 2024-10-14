import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import AddEditPlanePositionDrawer from "../../Components/AddEditPlanePositionDrawer";
import MovePlaneDrawer from "../../Components/MovePlaneDrawer";
import { getAllAirport } from "../../Services/v2/AirportServices";
import { getAllPlanePosition } from "../../Services/v2/PlanePositionServices";
import { getAllPlane } from "../../Services/v2/PlaneServices";
export default function PlanePositionManagement() {
  const [listPlanePosition, setListPlanePosition] = useState([]);
  const [render, setRender] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [planes, setPlanes] = useState([]);
  const [airports, setAirports] = useState([]);
  const [planeName, setPlaneName] = useState("");
  const [airportCode, setAirportCode] = useState("");
  const [takeOff, setTakeOff] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      const [listAirport, listPlane, response] = await Promise.all([
        getAllAirport(),
        getAllPlane(),
        getAllPlanePosition({
          page,
          limit,
          planeName,
          airportCode,
          thePlaneTookOff: takeOff,
        }),
      ]);
      if (response) {
        setTotalItems(response.total);
        setTotalPages(response.totalPages);
        setListPlanePosition(response.data);
      }
      if (listPlane) {
        setPlanes(listPlane);
      }
      if (listAirport) {
        setAirports(listAirport);
      }
    }
    fetchData();
  }, [page, limit, render, planeName, airportCode, takeOff]);

  const handleSearchByPlane = (event) => {
    setPlaneName(event.target.value);
  };

  const handleSearchByAirport = (event) => {
    setAirportCode(event.target.value);
  };

  const handleSearchByTakeOff = (event) => {
    setTakeOff(event.target.value);
  };

  const handleChildChange = () => {
    setRender(!render);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div className="px-10 pt-3">
      <h1 className="text-center text-2xl font-bold uppercase">
        Plane Position Management
      </h1>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-5">
          <AddEditPlanePositionDrawer
            type={1}
            onChildChange={handleChildChange}
          />
          <MovePlaneDrawer onChildChange={handleChildChange} />
        </div>
        <div className="flex gap-3">
          <FormControl className="w-[230px]" size="small">
            <InputLabel id="planeName">Search by Plane Name</InputLabel>
            <Select
              labelId="planeName"
              id="planeName"
              name="planeName"
              value={planeName}
              label="Search by Plane Name"
              onChange={handleSearchByPlane}
            >
              <MenuItem value={""}>None</MenuItem>
              {planes.map((plane) => (
                <MenuItem key={plane.id} value={plane.planeName}>
                  {plane.planeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-[230px]" size="small">
            <InputLabel id="airportCode">Search by Airport Name</InputLabel>
            <Select
              labelId="airportCode"
              id="airportCode"
              name="airportCode"
              value={airportCode}
              label="Search by Airport Name"
              onChange={handleSearchByAirport}
            >
              <MenuItem value={""}>None</MenuItem>
              {airports.map((airport) => (
                <MenuItem key={airport.id} value={airport.airportCode}>
                  {airport.airportName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-[230px]" size="small">
            <InputLabel id="thePlaneTookOff">Has Take Off</InputLabel>
            <Select
              labelId="thePlaneTookOff"
              id="thePlaneTookOff"
              name="thePlaneTookOff"
              value={takeOff}
              label="Has Take Off"
              onChange={handleSearchByTakeOff}
            >
              <MenuItem value={undefined}>None</MenuItem>
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <TableContainer component={Paper} sx={{ maxHeight: 470, maxWidth: 1200 }}>
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
                Airport Code
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
                Airport Name
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
                Start Time
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
                End Time
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
                Has Take Off
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
                Edit Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPlanePosition?.map((planePosition) => {
              let status;
              if (planePosition.thePlaneTookOff === false) {
                status = (
                  <TableCell style={{ fontSize: "16px", textAlign: "center" }}>
                    <span className="pr-5 text-red-600">
                      <i className="fa-solid fa-square-xmark"></i>
                    </span>
                  </TableCell>
                );
              } else {
                status = (
                  <TableCell style={{ fontSize: "16px", textAlign: "center" }}>
                    <span className="pr-5 text-green-600">
                      <i className="fa-solid fa-square-check"></i>
                    </span>
                  </TableCell>
                );
              }
              return (
                <TableRow key={planePosition.id} style={{ cursor: "default" }}>
                  <TableCell style={{ fontSize: "15px" }}>
                    {planePosition.plane.planeName}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {planePosition.airport.airportCode}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {planePosition.airport.airportName}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {dayjs(planePosition.startTime).format(
                      "HH:mm:ss - DD/MM/YYYY"
                    )}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {planePosition.endTime
                      ? dayjs(planePosition.endTime).format(
                          "HH:mm:ss - DD/MM/YYYY"
                        )
                      : "None"}
                  </TableCell>
                  {status}
                  <TableCell style={{ fontSize: "15px" }}>
                    <AddEditPlanePositionDrawer
                      planePosition={planePosition}
                      onChildChange={handleChildChange}
                      type={0}
                      takeOff={planePosition.thePlaneTookOff}
                    />
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
        <h4 className="mt-2">Total: {totalItems ?? 0}</h4>
      </div>
    </div>
  );
}
