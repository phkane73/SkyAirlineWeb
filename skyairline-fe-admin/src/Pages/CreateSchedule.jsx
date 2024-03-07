import React, { useState } from "react";
import dayjs from "dayjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createSchedule } from "../Services/ScheduleServices";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

const CreateSchedule = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [save, setSave] = useState(false);
  const [listSchedule, setListSchedule] = useState([]);
  const [total, setTotal] = useState(0);

  const handleCreate = async (event) => {
    event.preventDefault();
    const startTime = dayjs(start).format("YYYY-MM-DD HH:mm");
    const endTime = dayjs(end).format("YYYY-MM-DD HH:mm");
    var error = false;
    setMessage("");
    if (startTime === "Invalid Date" || endTime === "Invalid Date") {
      error = true;
      setMessage(
        <span className="text-red-600 absolute">
          Vui lòng nhập đầy đủ thông tin!
        </span>
      );
    }
    if (dayjs(startTime).isSame(dayjs(), "date")) {
      error = true;
      setMessage(
        <span className="text-red-600 absolute">
          Ngày bắt đầu phải sau ngày hiện tại!
        </span>
      );
    }
    if (dayjs(startTime).isAfter(dayjs(endTime))) {
      error = true;
      setMessage(
        <span className="text-red-600 absolute">
          Thời gian bắt đầu phải trước thời gian kết thúc!
        </span>
      );
    }
    if (error === false) {
      setLoading(true);
      const data = await createSchedule(startTime, endTime, 0);
      if (data) {
        const array = Object.values(data);
        setTotal(array.length);
        setMessage("");
        setListSchedule(array);
        setLoading(false);
      }
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const startTime = dayjs(start).format("YYYY-MM-DD HH:mm");
    const endTime = dayjs(end).format("YYYY-MM-DD HH:mm");
    if (listSchedule.length > 0 && loading === false) {
      setSave(true);
      const data = await createSchedule(startTime, endTime, 1);
      if (data) {
        setSave(false);
        alert("Đã lưu các chuyến bay");
      }
    } else {
      setMessage(
        <span className="text-red-600 absolute">Vui lòng tạo lịch!</span>
      );
    }
  };

  return (
    <div className="p-3">
      <h1 className="text-center text-3xl font-bold pb-2">TẠO LỊCH BAY</h1>
      <div className="flex gap-2">
        <div className="basis-4/5">
          {loading ? (
            <TableContainer sx={{ height: 400 }}>
              <Table stickyHeader aria-label="sticky table">
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
                <TableBody></TableBody>
              </Table>
              <CircularProgress sx={{ marginLeft: 60, marginTop: 20 }} />
            </TableContainer>
          ) : (
            <>
              <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
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
                    {listSchedule.map((s) => {
                      return (
                        <TableRow key={s.id} style={{ cursor: "default" }}>
                          <TableCell>{s.flightCode}</TableCell>
                          <TableCell>{s.planeName}</TableCell>
                          <TableCell>
                            {s.departureAirport.airportName}
                          </TableCell>
                          <TableCell>{s.arrivalAirport.airportName}</TableCell>
                          <TableCell>{s.departureTime}</TableCell>
                          <TableCell>{s.arrivalTime}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <h4 className="mt-4">Tổng số chuyến bay: {total}</h4>
            </>
          )}
        </div>
        <div className="basis-1/5 relative">
          {save ? (
            <LinearProgress />
          ) : (
            <LinearProgress
              sx={{
                "& .MuiLinearProgress-bar": {
                  transition: "none",
                },
              }}
              variant="determinate"
              value={save}
            />
          )}
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{ padding: 0 }}
          >
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                name="start"
                value={start}
                disablePast
                format="DD/MM/YYYY HH:mm"
                label="Chọn ngày bắt đầu"
                onChange={(newValue) => {
                  setMessage("");
                  setStart(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker
                name="end"
                value={end}
                disablePast
                format="DD/MM/YYYY HH:mm"
                label="Chọn ngày kết thúc"
                onChange={(newValue) => {
                  setMessage("");
                  setEnd(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div className="relative">{message}</div>
          <div className="mt-8">
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-5 rounded uppercase mt-4 transition-all"
              type="button"
              onClick={handleCreate}
            >
              Tạo lịch mới
            </button>
            <button
              className="bg-black hover:bg-gray-700 text-white font-bold float-end py-2 px-5 rounded uppercase mt-4 transition-all"
              type="button"
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;
