import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import AddEditPlaneDrawer from "../../Components/AddEditPlaneDrawer";
import Search from "../../Components/Search";
import { getAllPlane } from "../../Services/v2/PlaneServices";
export default function PlaneManagement() {
  const [data, setData] = useState([]);
  const [listPlane, setListPlane] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPlane();
      if (data) {
        const sortedData = data.sort((a, b) => b.id - a.id);
        setData(sortedData);
        setListPlane(sortedData);
      }
    }
    fetchData();
  }, [render]);

  const handleSearch = (query) => {
    const filteredDate = query
      ? listPlane.filter((item) =>
          item.planeName.toLowerCase().includes(query.toLowerCase())
        )
      : data;
    setListPlane(filteredDate);
  };

  const handleChildChange = () => {
    setRender(!render);
  };

  return (
    <div className="px-10 pt-3">
      <h1 className="text-center text-2xl font-bold uppercase">
        Plane Management
      </h1>
      <div className="flex justify-between items-center">
        <AddEditPlaneDrawer type={1} onChildChange={handleChildChange} />
        <Search text="Enter plane name for search" onSearch={handleSearch} />
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
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPlane?.map((plane) => {
              let status;
              if (plane.isOperating === false) {
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
                <TableRow key={plane.id} style={{ cursor: "default" }}>
                  <TableCell style={{ fontSize: "15px" }}>
                    <AddEditPlaneDrawer
                      plane={plane}
                      onChildChange={handleChildChange}
                    />
                  </TableCell>
                  {status}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <h4 className="mt-2">Total: {listPlane.length ?? 0}</h4>
    </div>
  );
}
