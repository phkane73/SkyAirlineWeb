import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import AddEditAirportDrawer from "../../Components/AddEditAirportDrawer";
import AddRunway from "../../Components/AddRunway";
import EditRunway from "../../Components/EditRunway";
import Search from "../../Components/Search";
import { getAllAirport } from "../../Services/v2/AirportServices";
export default function AirportManagement() {
  const [data, setData] = useState([]);
  const [listAirport, setListAirport] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllAirport();
      if (data) {
        const sortedData = data.sort((a, b) => b.id - a.id);
        setData(sortedData);
        setListAirport(sortedData);
      }
    }
    fetchData();
  }, [render]);

  const handleSearch = (query) => {
    const filteredDate = query
      ? listAirport.filter((item) =>
          item.airportCode.toLowerCase().includes(query.toLowerCase())
        )
      : data;
    setListAirport(filteredDate);
  };

  const handleChildChange = () => {
    setRender(!render);
  };

  return (
    <div className="px-10 pt-3">
      <h1 className="text-center text-2xl font-bold uppercase">
        Airport Management
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <AddEditAirportDrawer type={1} onChildChange={handleChildChange} />
          <AddRunway onChildChange={handleChildChange}></AddRunway>
        </div>
        <Search text="Enter Airport Code for search" onSearch={handleSearch} />
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
                Location
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
                Max Load
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
                Runway
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAirport?.map((airport) => {
              let status;
              if (airport.isOperating === false) {
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
                <TableRow key={airport.id} style={{ cursor: "default" }}>
                  <TableCell style={{ fontSize: "15px" }}>
                    <AddEditAirportDrawer
                      airport={airport}
                      onChildChange={handleChildChange}
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {airport.airportLocation}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {airport.airportName}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }}>
                    {airport.maxLoad}
                  </TableCell>
                  {status}
                  <TableCell style={{ fontSize: "15px", textAlign: "center" }}>
                    <EditRunway
                      runways={airport.runways}
                      onChildChange={handleChildChange}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <h4 className="mt-2">Total: {listAirport.length ?? 0}</h4>
    </div>
  );
}
