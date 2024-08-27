import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { listSchedule } from "../Services/ScheduleServices";
import Search from "../Components/Search";
import CircularProgress from "@mui/material/CircularProgress";

const ListSchedule = () => {
  const [data, setData] = useState([]);
  const [listSchedules, setListSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const data = await listSchedule();
      if (data) {
        setData(data);
        setLoading(false);
        setListSchedule(data);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filteredDate =
      query !== ""
        ? listSchedules.filter(
            (item) =>
              item.flightCode.toLowerCase().includes(query.toLowerCase()) ||
              item.departureTime.includes(query) ||
              item.arrivalTime.includes(query) ||
              item.planeName.toLowerCase().includes(query.toLowerCase()) ||
              item.departureAirport.airportName
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              item.arrivalAirport.airportName
                .toLowerCase()
                .includes(query.toLowerCase())
          )
        : data;
    setListSchedule(filteredDate);
  };

  return (
    <div className="px-10 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold my-5">DANH SÁCH CÁC CHUYẾN BAY</h1>
        <Search onSearch={handleSearch} />
      </div>

      {loading ? (
        <CircularProgress sx={{ marginLeft: 60, marginTop: 20 }} />
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 485, maxWidth: 1200 }}
          >
            <Table
              sx={{ maxWidth: 1200 }}
              stickyHeader
              aria-label="sticky table"
            >
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
                    Mã số
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    Tên máy bay
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    Điểm khởi hành
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    Điểm đến
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    Giờ khởi hành
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "16px",
                    }}
                  >
                    Giờ đến
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listSchedules.map((s) => {
                  return (
                    <TableRow key={s.id} style={{ cursor: "default" }}>
                      <TableCell>{s.flightCode}</TableCell>
                      <TableCell>{s.planeName}</TableCell>
                      <TableCell>{s.departureAirport.airportName}</TableCell>
                      <TableCell>{s.arrivalAirport.airportName}</TableCell>
                      <TableCell>{s.departureTime}</TableCell>
                      <TableCell>{s.arrivalTime}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <h4 className="mt-4">Total: {listSchedules.length}</h4>
        </>
      )}
    </div>
  );
};

export default ListSchedule;
