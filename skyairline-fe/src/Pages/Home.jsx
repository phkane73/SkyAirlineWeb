import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "../Components/Carousel";
import { removeSession } from "../Redux/reducers/SessionReducer";
import { getAllOperatingAirport } from "../Services/v2/AirportServices";
import dayjs from "dayjs";
import { checkFlightIsExist, getPriceOfFlight } from "../Services/v2/FlightServices";
const Home = () => {
  const [listAirportDeparture, setListAirportDeparture] = useState([]);
  const [listAirportArrival, setListAirportArrival] = useState([]);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Auth.token);
  useEffect(() => {
    async function fetchData() {
      const data = await getAllOperatingAirport();
      // console.log(result);
      // const data = await getAllAirportOperation();
      setListAirportDeparture(data);
      setListAirportArrival(data);
      dispatch(removeSession(token));
    }
    fetchData();
  }, [dispatch, token]);

  const handleSubmit = async (event) => {
    if (!date || !departure || !arrival) {
      setMessage(
        <span className="text-red-600 absolute">
          Vui lòng nhập đầy đủ thông tin!
        </span>
      );
    } else {
      const result = await checkFlightIsExist({
        departureAirportId: departure.id,
        arrivalAirportId: arrival.id,
        departureTime: dayjs(date).format("YYYY-MM-DD"),
      });
      if (result) {
        Navigate(`/booking/chooseflight/${result.id}`);
      } else {
        toast.error("Không có chuyến bay phù hợp!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Carousel></Carousel>
      <div className="container absolute top-[100px] z-50">
        <div className="bg-white/80 backdrop-blur-xl mt-2 rounded-lg p-8 shadow-xl float-end flex flex-col items-center">
          <h1 className="leading-9 uppercase text-2xl font-bold text-black">
            Tìm chuyến bay
          </h1>
          <div className="flex flex-col gap-3 mt-4">
            <Autocomplete
              value={departure}
              disablePortal
              id="combo-box-demo1"
              options={listAirportDeparture}
              sx={{ width: 300, paddingTop: "8px" }}
              onChange={(event, newValue) => {
                setMessage("");
                setDeparture(newValue);
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) =>
                `${option.airportCode} - ${option.airportLocation}`
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {`${option.airportCode} - ${option.airportLocation}`}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <span>
                      <i className="fa-solid fa-plane pr-3"></i>
                      Chọn điểm khởi hành
                    </span>
                  }
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
            <Autocomplete
              value={arrival}
              disablePortal
              id="combo-box-demo"
              options={listAirportArrival}
              sx={{ width: 300, paddingTop: "8px" }}
              onChange={(event, newValue) => {
                setMessage("");
                setArrival(newValue);
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) =>
                `${option.airportCode} - ${option.airportLocation}`
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {`${option.airportCode} - ${option.airportLocation}`}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    <span>
                      <i className="fa-solid fa-location-dot pr-4"></i>
                      Chọn điểm đến
                    </span>
                  }
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  disablePast
                  sx={{ width: 300 }}
                  label="Departure Time"
                  format="DD/MM/YYYY"
                  value={date}
                  onChange={(newValue) => {
                    setMessage("");
                    setDate(newValue);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="relative w-[100%]">{message}</div>
          <button
            className="mt-8 text-white font-semibold py-2 px-10 bg-black border rounded
                hover:bg-[#2D7690] transition-all"
            type="button"
            onClick={handleSubmit}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
