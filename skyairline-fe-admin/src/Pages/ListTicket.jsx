import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getTickets } from "../Services/TicketServices";
import dayjs from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import Search from "../Components/Search";

const ListTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getTickets();
      if (result) {
        setLoading(false);
        setData(result);
        setTickets(result);
      }
    }
    fetchData();
  }, []);

  console.log(data);

  const handleSearch = (query) => {
    const filteredDate =
      query !== ""
        ? tickets.filter(
            (item) =>
              item.paymentId.toLowerCase().includes(query.toLowerCase()) ||
              item.flightSchedule.flightCode
                .toLowerCase()
                .includes(query.toLowerCase())
          )
        : data;
    setTickets(filteredDate);
  };

  return (
    <div className="px-10 py-3">
      <h1 className="text-center text-3xl font-bold">DANH SÁCH VÉ</h1>
      <div className="flex justify-between items-center">
        <Search onSearch={handleSearch} />
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
                    Ngày đặt
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Mã thanh toán
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Người đặt vé
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Mã chuyến bay
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Mã ghế
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "uppercase",
                      fontSize: "18px",
                    }}
                  >
                    Giá vé
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
                        {t.flightSchedule.flightCode}
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
