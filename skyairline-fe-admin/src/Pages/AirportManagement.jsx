import React, { useEffect, useState } from "react";
import {
  getAllAirport,
  activeAirport,
  deActiveAirport,
} from "../Services/AirportServices";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DetailsAirport from "../Components/DetailsAirport";
import AddAirport from "../Components/AddAirport";
import UpdateFlightTime from "../Components/UpdateFlightTime";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Search from "../Components/Search";

export default function AirportManagement() {
  const [data, setData] = useState([]);
  const [listAirport, setListAirport] = useState([]);
  const [render, setRender] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAllAirport();
      setData(data);
      setListAirport(
        data.sort((a, b) => {
          if (a.operation && !b.operation) {
            return -1;
          }
          return 1;
        })
      );
      console.log(data);
    }
    fetchData();
  }, [render]);

  async function handleActiveAirport(id) {
    const data = await activeAirport(id);
    if (data) {
      setRender(!render);
    } else {
      alert("Sân bay chưa có tuyến đường nào, hãy thêm ít nhất 1 tuyến đường!");
    }
  }

  async function handleDeActiveAirport(id) {
    await deActiveAirport(id);
    handleClose();
    setRender(!render);
  }

  const handleChildChange = () => {
    setRender(!render);
  };

  const handleSearch = (query) => {
    const filteredDate = query
      ? listAirport.filter((item) =>
          item.airportName.toLowerCase().includes(query.toLowerCase())
        )
      : data;
    setListAirport(filteredDate);
  };

  return (
    <div className="px-10 py-3">
      <h1 className="text-center text-3xl font-bold">DANH SÁCH SÂN BAY</h1>
      <div className="flex justify-between items-center">
        <AddAirport onChildChange={handleChildChange} />
        <Search onSearch={handleSearch} />
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
                  fontSize: "18px",
                }}
              >
                Tên sân bay
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "18px",
                }}
              >
                Trạng thái hoạt động
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "18px",
                }}
              >
                Các chức năng
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "18px",
                }}
              >
                Đổi trạng thái
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAirport.map((airport) => {
              let status;
              if (airport.operation === false) {
                status = (
                  <TableCell style={{ fontSize: "16px" }}>
                    <span className="pr-5 text-red-600">
                      <i className="fa-solid fa-circle"></i>
                    </span>
                    Không hoạt động{" "}
                  </TableCell>
                );
              } else {
                status = (
                  <TableCell style={{ fontSize: "16px" }}>
                    <span className="pr-5 text-green-600">
                      <i className="fa-solid fa-circle"></i>
                    </span>
                    Đang hoạt động{" "}
                  </TableCell>
                );
              }
              return (
                <TableRow key={airport.id} style={{ cursor: "default" }}>
                  <TableCell style={{ fontSize: "18px" }}>
                    {airport.airportName}
                  </TableCell>
                  {status}
                  <TableCell sx={{ display: "flex" }}>
                    {airport.operation ? (
                      <>
                        <UpdateFlightTime
                          onChildChange={handleChildChange}
                          id={airport.id}
                          name={airport.airportName}
                        />
                        <DetailsAirport
                          id={airport.id}
                          name={airport.airportName}
                          location={airport.location}
                          load={render}
                        />
                      </>
                    ) : (
                      <UpdateFlightTime
                        onChildChange={handleChildChange}
                        id={airport.id}
                        name={airport.airportName}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {airport.operation ? (
                      <div>
                        <button
                          className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 ml-2 px-4 rounded transition-all"
                          onClick={handleClickOpen}
                        >
                          Dừng hoạt động
                        </button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {
                              "Bạn hãy cẩn thận với việc dừng hoạt động một sân bay!"
                            }
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Khi dừng hoạt đông một sân bay. Các tuyến đường
                              bay đến sân bay này sẽ bị hủy. Sẽ không tiến hành
                              lên lình trình cho sân bay này trong thời gian
                              tới.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <button
                              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 ml-2 px-4 rounded transition-all"
                              onClick={handleClose}
                            >
                              Thoát
                            </button>

                            <button
                              className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 ml-2 px-4 rounded transition-all"
                              onClick={() => handleDeActiveAirport(airport.id)}
                            >
                              Xác nhận dừng
                            </button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    ) : (
                      <button
                        className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 ml-2 px-4 rounded transition-all"
                        onClick={() => handleActiveAirport(airport.id)}
                      >
                        Tái Hoạt động
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <h4 className="mt-2">Total: {listAirport.length}</h4>
    </div>
  );
}
