import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddPlane from "../Components/AddPlane";
import Search from "../Components/Search";
import {
  getAllPlane,
  activePlane,
  deActivePlane,
} from "../Services/PlaneServices";

const PlaneManagement = () => {
  const [data, setData] = useState([]);
  const [listPlane, setListPlane] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPlane();
      setData(data);
      setListPlane(
        data.sort((a, b) => {
          if (a.operation && !b.operation) {
            return -1;
          }
          return 1;
        })
      );
    }
    fetchData();
  }, [render]);

  async function handleActivePlane(id) {
    await activePlane(id);
    setRender(!render);
  }

  async function handleDeActivePlane(id) {
    await deActivePlane(id);
    setRender(!render);
  }

  const handleSearch = (query) => {
    const filteredDate = query
      ? listPlane.filter(
          (item) =>
            item.planeName.toLowerCase().includes(query.toLowerCase()) ||
            item.onAirport.airportName
              .toLowerCase()
              .includes(query.toLowerCase())
        )
      : data;
    setListPlane(filteredDate);
  };

  const handleChildChange = () => {
    setRender(!render);
  };

  return (
    <div className="px-10 py-3">
      <h1 className="text-center text-3xl font-bold">DANH SÁCH MÁY BAY</h1>
      <div className="flex justify-between items-center">
        <AddPlane onChildChange={handleChildChange} />
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
                Trạng thái máy bay
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "18px",
                }}
              >
                Tên máy bay
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "18px",
                }}
              >
                Đang ở sân bay
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
            {listPlane.map((plane) => {
              let status;
              if (plane.operation === false) {
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
                <TableRow key={plane.id} style={{ cursor: "default" }}>
                  {status}
                  <TableCell style={{ fontSize: "18px" }}>
                    {plane.planeName}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    {plane.onAirport.airportName}
                  </TableCell>
                  <TableCell>
                    {plane.operation ? (
                      <button
                        className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 ml-2 px-4 rounded transition-all"
                        onClick={() => handleDeActivePlane(plane.id)}
                      >
                        Ngưng hoạt động
                      </button>
                    ) : (
                      <button
                        className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 ml-2 px-4 rounded transition-all"
                        onClick={() => handleActivePlane(plane.id)}
                      >
                        Tái hoạt động
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <h4 className="mt-2">Total: {listPlane.length}</h4>
    </div>
  );
};

export default PlaneManagement;
