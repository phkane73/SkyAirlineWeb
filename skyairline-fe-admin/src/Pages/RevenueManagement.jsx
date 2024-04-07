import React, { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { countRevenue } from "../Services/RevenueService";

const RevenueManagement = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      async function fetchData() {
        await countRevenue();
      }
      fetchData();
      isMounted.current = true;
    }
  });

  return (
    <div>
      <div className="px-10 py-3">
        <h1 className="text-center text-3xl font-bold">Quản lý doanh số</h1>
        <div className="flex justify-between items-center">
          {/* <AddPlane onChildChange={handleChildChange} /> */}
          {/* <Search onSearch={handleSearch} /> */}
        </div>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 480, maxWidth: 1200 }}
        >
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
            <TableBody></TableBody>
          </Table>
        </TableContainer>
        {/* <h4 className="mt-2">Total: {listPlane.length}</h4> */}
      </div>
    </div>
  );
};

export default RevenueManagement;
