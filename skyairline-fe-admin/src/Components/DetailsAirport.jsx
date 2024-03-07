import React, { useEffect, useState } from "react";
import {
  getInfoAirport,
  getPlaneList,
  deleteFlightTime,
} from "../Services/AirportServices";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import UpdateDetailFlightTime from "./UpdateDetailFlightTime";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "2px solid #000",
  p: 4,
  height: 600,
};

const DetailsAirport = ({ id, name, location, load }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const [airports, setAirports] = useState([]);
  const [planeList, setPlaneList] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await getInfoAirport(id);
      setAirports(data);
    }
    fetchData();
  }, [id, render, load]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPlaneList(id);
      if (data === false) {
        setPlaneList([]);
      } else {
        setPlaneList(data);
      }
    }
    fetchData();
  }, [id]);

  const convertToTime = (data) => {
    const time = data * 60;
    const hour = parseInt(time / 60);
    const minute = parseInt(time % 60);
    return (
      <span>
        {hour} giờ {minute} phút
      </span>
    );
  };

  const handleChildChange = () => {
    setRender(!render);
  };

  const handleDelete = async (id) => {
    await deleteFlightTime(id);
    setOpenDialog(false);
    setRender(!render);
  };

  return (
    <div>
      <button
        className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-5 rounded transition-all ml-3"
        onClick={() => {
          handleOpen();
        }}
      >
        Chi tiết
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", marginBottom: 3 }}
          >
            {name} ở {location}
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="columns-2 flex justify-between">
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 500, maxWidth: 600 }}
              >
                <Table
                  sx={{ maxWidth: 600 }}
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
                        Đến sân bay
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          textTransform: "uppercase",
                          fontSize: "16px",
                        }}
                      >
                        Thời gian bay
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          textTransform: "uppercase",
                          fontSize: "16px",
                        }}
                      >
                        Chi phí bay
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          textTransform: "uppercase",
                          fontSize: "16px",
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {airports.map((a) => {
                      return (
                        <TableRow key={a.id} style={{ cursor: "default" }}>
                          {a.from.airportName === name ? (
                            <TableCell style={{ fontSize: "16px" }}>
                              {a.to.airportName}
                            </TableCell>
                          ) : (
                            <TableCell style={{ fontSize: "16px" }}>
                              {a.from.airportName}
                            </TableCell>
                          )}
                          <TableCell style={{ fontSize: "16px" }}>
                            {convertToTime(a.estimateTime)}
                          </TableCell>
                          <TableCell style={{ fontSize: "16px" }}>
                            {new Intl.NumberFormat()
                              .format(a.price)
                              .replaceAll(",", ".")}
                            <span> vnd</span>
                            <UpdateDetailFlightTime
                              id={a.id}
                              price={a.price}
                              onChildChange={handleChildChange}
                            />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <button onClick={handleOpenDialog}>
                              <DeleteForeverIcon
                                style={{ fontSize: "30px", color: "red" }}
                              />
                            </button>
                            <Dialog
                              open={openDialog}
                              onClose={handleCloseDialog}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {
                                  "Bạn có chắc chắn muốn xóa tuyến đường bay này!!"
                                }
                              </DialogTitle>
                              <DialogActions>
                                <button
                                  className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 ml-2 px-4 rounded transition-all"
                                  onClick={handleCloseDialog}
                                >
                                  Thoát
                                </button>

                                <button
                                  className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 ml-2 px-4 rounded transition-all"
                                  onClick={() => handleDelete(a.id)}
                                >
                                  Xác nhận xóa
                                </button>
                              </DialogActions>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 500, maxWidth: 180 }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{
                          backgroundColor: "black",
                          color: "white",
                          textTransform: "uppercase",
                          fontSize: "16px",
                        }}
                      >
                        <h1>Máy bay hiện có</h1>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planeList.length > 0 ? (
                      planeList.map((plane) => {
                        return (
                          <TableRow key={plane.id} sx={{ cursor: "default" }}>
                            <TableCell align="center" sx={{ fontSize: 16 }}>
                              {plane.planeName}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableCell></TableCell>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailsAirport;
