import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { allUsers } from "../Services/UserServices";
import dayjs from "dayjs";

const ListTicket = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const listUser = await allUsers();
      setUsers(listUser);
    }
    fetchData();
  }, []);

  return (
    <div className="px-10 py-3">
      <h1 className="text-center text-3xl font-bold">DANH SÁCH HÀNH KHÁCH</h1>
      <div className="flex justify-between items-center">
        {/* <Search onSearch={handleSearch} /> */}
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
                Tên người dùng
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "18px",
                }}
              >
                Số điện thoại
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "18px",
                }}
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "black",
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "18px",
                }}
              >
                Ngày sinh
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => {
              return (
                <TableRow key={u.id}>
                  <TableCell style={{ fontSize: "16px" }}>
                    {u.username}
                  </TableCell>
                  <TableCell style={{ fontSize: "16px" }}>{u.phone}</TableCell>
                  <TableCell style={{ fontSize: "16px" }}>{u.email}</TableCell>
                  <TableCell style={{ fontSize: "16px" }}>
                    {dayjs(u.birthday).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <h4 className="mt-2">Total: {listPlane.length}</h4> */}
    </div>
  );
};

export default ListTicket;
