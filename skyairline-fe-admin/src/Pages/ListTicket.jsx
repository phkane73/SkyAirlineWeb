import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Search from "../Components/Search";
import { getTickets } from "../Services/TicketServices";
import { getFlightByIds } from "../Services/v2/FlightServices";

const ListTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getTickets();
      if (result) {
        setLoading(false);
        setData(result);
        setTickets(result);
        const idFlights = result.map((item) => item.idFlight);
        const f = await getFlightByIds(idFlights);
        setFlights(f);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filteredDate =
      query !== ""
        ? tickets.filter((item) =>
            item.paymentId.toLowerCase().includes(query.toLowerCase())
          )
        : data;
    setTickets(filteredDate);
  };

  return (
    <div className="px-10 py-3">
      <h1 className="text-center text-3xl font-bold uppercase">List Ticket</h1>
      <div className="flex justify-between items-center">
        <Search onSearch={handleSearch} text="Enter payment id by search" />
      </div>
      {loading ? (
        <CircularProgress sx={{ marginLeft: 60, marginTop: 20 }} />
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 480, maxWidth: 1200 }}
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
                      fontSize: "18px",
                    }}
                  >
                    Booking date
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Payment Id
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Ticket booker
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Flight Code
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Seat Code
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Ticket Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((t) => {
                  return (
                    <TableRow key={t.id}>
                      <TableCell style={{ fontSize: "16px" }}>
                        {dayjs(t.payDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {t.paymentId}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {t.user.username}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {flights
                          .filter((item) => item.id === t.idFlight)
                          .map((flight) => {
                            return flight.flightCode;
                          })}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {t.seat.seatCode}
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {new Intl.NumberFormat()
                          .format(t.ticketPrice)
                          .replaceAll(",", ".") + " đ"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>{" "}
          <h4 className="mt-2">Total: {tickets.length}</h4>
        </>
      )}
    </div>
  );
};

export default ListTicket;
