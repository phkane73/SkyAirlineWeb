import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { millisecondsToHoursAndMinutes } from "../../common/convertTime";
import { formatCurrency } from "../../common/formatCurrency";
import AddEditFlightRouteDrawer from "../../Components/AddEditFlightRouteDrawer";
import  Search  from "../../Components/Search";
import { getAllFlightRoute } from "../../Services/v2/FlightRouteServices";
export default function FlightRouteManagement() {
  const [data, setData] = useState([]);
  const [flightRoutes, setFlightRoutes] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllFlightRoute();
      if (data) {
        const sortedData = data.sort((a, b) => a.id - b.id);
        setData(sortedData);
        setFlightRoutes(sortedData);
      }
    }
    fetchData();
  }, [render]);

  const handleSearch = (query) => {
    const filteredDate = query
      ? flightRoutes.filter(
          (item) =>
            item.arrivalAirport.airportCode
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            item.departureAirport.airportCode
              .toLowerCase()
              .includes(query.toLowerCase())
        )
      : data;
    setFlightRoutes(filteredDate);
  };

  const handleChildChange = () => {
    setRender(!render);
  };

  return (
    <div className="px-10 pt-3">
      <h1 className="text-center text-2xl font-bold uppercase">
        Flight Route Management
      </h1>
      <div className="flex justify-between items-center">
        <AddEditFlightRouteDrawer type={1} onChildChange={handleChildChange} />
        <Search text="Enter airport code for search" onSearch={handleSearch} />
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
                Id
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
                Airport A
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
                Airport B
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
                Flight Route Price
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
                Flight Route Est.Time
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
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flightRoutes?.map((flightRoute) => {
              const { minutes, hours } = millisecondsToHoursAndMinutes(
                flightRoute.flightRouteEstTime
              );
              let status;
              if (flightRoute.isOperating === false) {
                status = (
                  <TableCell style={{ fontSize: "15px" }}>
                    <span className="pr-5 text-red-600">
                      <i className="fa-solid fa-circle"></i>
                    </span>
                    DeActive
                  </TableCell>
                );
              } else {
                status = (
                  <TableCell style={{ fontSize: "15px" }}>
                    <span className="pr-5 text-green-600">
                      <i className="fa-solid fa-circle"></i>
                    </span>
                    Active
                  </TableCell>
                );
              }
              return (
                <TableRow key={flightRoute.id} style={{ cursor: "default" }}>
                  <TableCell style={{ fontSize: "15px" }}>
                    <AddEditFlightRouteDrawer
                      flightRoute={flightRoute}
                      onChildChange={handleChildChange}
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {flightRoute.arrivalAirport.airportCode}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {flightRoute.departureAirport.airportCode}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {formatCurrency(flightRoute.flightRoutePrice.toString())}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {`${hours}h ${minutes}min`}
                  </TableCell>
                  {status}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <h4 className="mt-2">Total: {flightRoutes.length ?? 0}</h4>
    </div>
  );
}
