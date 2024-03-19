import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getInfo, confirmInformation } from "../Services/UserServices";
import FormHelperText from "@mui/material/FormHelperText";
import Menu from "@mui/material/Menu";
import ListItemText from "@mui/material/ListItemText";
import { getFlight, getClass } from "../Services/FlightServices";
import CircularProgress from "@mui/joy/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  setTicketClass,
  setTotalPrice,
  setFlight,
} from "../Redux/reducers/SessionReducer";

const ValidInformation = ({ onChangeStep }) => {
  onChangeStep(1);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleDown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { id, idClass } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [birthday, setBirthday] = useState(null);
  const [flight, setF] = useState({});
  const [tClass, setTClass] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
  });
  const fee = 584000;
  const [price, setPrice] = useState(0);

  const store = useSelector((state) => state.Session);
  const auth = useSelector((state) => state.Auth.token);
  useEffect(() => {
    async function fetchData() {
      if (auth) {
        const data = await getInfo(auth);
        if (data) {
          setFormData({
            username: data.username,
            email: data.email,
            phoneNumber: data.phone,
          });
          data.birthday ? setBirthday(dayjs(data.birthday)) : setBirthday(null);
        }
        const f = await getFlight(id);
        const c = await getClass(idClass);
        if (c && f) {
          dispatch(setFlight(f));
          dispatch(setTicketClass(c));
          dispatch(setTotalPrice(f.price + c.ticketClassPrice + fee));
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [id, idClass, dispatch, auth]);

  useEffect(() => {
    if (store) {
      setF(store.flight);
      setPrice(store.totalPrice);
      setTClass(store.ticketClass);
    }
  }, [store]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = (
        <span className="text-red-500">Vui lòng nhập họ và tên!</span>
      );
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = (
        <span className="text-red-500">Vui lòng nhập số điện thoại!</span>
      );
    } else {
      //Số điện thoại phải là số và có 10 chữ số
      const numbericValue = formData.phoneNumber.replace(/\D/g, "");
      const isValid = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(numbericValue);
      if (!isValid) {
        newErrors.phoneNumber = (
          <span className="text-red-500">Số điện thoại không hợp lệ!</span>
        );
      }
      //Số điện thoại phải bắt đầu bằng số 0
      if (!formData.phoneNumber.startsWith("0")) {
        newErrors.phoneNumber = (
          <span className="text-red-500">Số điện thoại không hợp lệ!</span>
        );
      }
    }
    if (!birthday) {
      newErrors.birthday = (
        <span className="text-red-500">Vui lòng nhập ngày tháng năm sinh!</span>
      );
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const result = await confirmInformation(formData, birthday);
      if (result) {
        navigate("/booking/chooseseat");
      }
    }
  };

  return (
    <div>
      <div className="container my-5">
        <div className="h-[50px] flex items-center bg-white sticky top-0 z-50 pl-2 mb-5">
          <button
            to="/"
            className="bg-black hover:bg-black/70 text-white font-bold py-2 px-4 rounded transition-all flex items-center pl-1"
            onClick={handleClick}
          >
            <ChevronLeftIcon />
            <span>Quay lại</span>
          </button>
        </div>
        {loading ? (
          <CircularProgress
            size="lg"
            sx={{ marginLeft: 65, marginTop: 10, marginBottom: 30 }}
          />
        ) : (
          <div className="flex">
            <div className="w-2/3 flex flex-col items-center pr-10">
              <span className="uppercase text-3xl font-bold">
                Xác nhận thông tin
              </span>
              <span className="mb-4">Thông tin phải chính xác với CCCD</span>
              <form onSubmit={handleSubmit} className="w-[100%]">
                <div className="flex justify-between h-[80px]">
                  <TextField
                    required
                    name="username"
                    value={formData.username}
                    id="username"
                    label="Họ và tên"
                    variant="outlined"
                    sx={{ width: "40%" }}
                    helperText={errors.username}
                    onChange={handleInputChange}
                  />
                  <div className="flex flex-col w-[40%]">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={["DatePicker"]}
                        sx={{ width: "100%", padding: 0, overflow: "inherit" }}
                      >
                        <DatePicker
                          value={birthday}
                          format="DD/MM/YYYY"
                          label="Ngày tháng năm sinh *"
                          sx={{ width: "100%" }}
                          onChange={(newValue) => {
                            setErrors({});
                            setBirthday(newValue);
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <FormHelperText sx={{ marginLeft: 1 }}>
                      {errors.birthday}
                    </FormHelperText>
                  </div>
                </div>
                <div className=" flex justify-between mt-10 h-[80px]">
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    label="Số điện thoại"
                    variant="outlined"
                    sx={{ width: "40%" }}
                    helperText={errors.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="email"
                    name="email"
                    value={formData.email}
                    label="Email"
                    variant="outlined"
                    sx={{ width: "40%" }}
                    disabled
                  />
                </div>
                <button
                  className="mt-8 text-white font-semibold py-2 px-10 bg-black border rounded
                hover:bg-[#2D7690] transition-all float-end"
                  type="button"
                  onClick={handleSubmit}
                >
                  Xác nhận
                </button>
              </form>
            </div>
            <div className="w-1/3 bg-gray-200 rounded">
              <div className="flex flex-col justify-center">
                <div className="text-xl text-white font-bold uppercase p-3 bg-[#2D7690] rounded-t w-[100%] text-center ">
                  Thông tin đặt vé
                </div>
                <div>
                  <div className="py-2 px-1 bg-white mt-4 mb-4">
                    <h1 className="text-xl font-bold">
                      {Object.keys(flight).length > 0
                        ? flight.departureAirport.location +
                          " -> " +
                          flight.arrivalAirport.location
                        : ""}
                    </h1>
                    <h2>
                      {dayjs(flight.departureTime).format("DD/MM/YYYY")} |{" "}
                      {dayjs(flight.departureTime).format("HH:mm")} -{" "}
                      {dayjs(flight.arrivalTime).format("HH:mm")} |{" "}
                      {flight.flightCode}
                    </h2>
                    <h2>
                      {Object.keys(flight).length > 0 && tClass.className}
                    </h2>
                  </div>
                  <div className="bg-yellow-50 mx-5 py-2 px-3 rounded flex justify-between">
                    <h1>Giá vé</h1>
                    <h1>
                      {new Intl.NumberFormat()
                        .format(flight.price + tClass.ticketClassPrice)
                        .replaceAll(",", ",")}
                      VND
                    </h1>
                  </div>
                </div>
                <button
                  className="bg-yellow-50 mt-2 mx-5 py-2 px-3 rounded flex justify-between cursor-pointer"
                  onClick={handleDown}
                >
                  <h1>Thuế, phí</h1>
                  <h1>
                    {new Intl.NumberFormat().format(fee).replaceAll(",", ",")}
                    VND <i className="fa-solid fa-caret-down"></i>
                  </h1>
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    "& .MuiMenu-paper": { backgroundColor: "rgb(254 252 232)" },
                  }}
                >
                  <ListItemText
                    primary={
                      <div className="text-sm py-1 px-3 rounded flex justify-between w-[320px]">
                        <h1>Phụ thu dịch vụ hệ thống</h1>
                        <h1>215,000VND</h1>
                      </div>
                    }
                  />
                  <ListItemText
                    primary={
                      <div className="text-sm py-1 px-3 rounded flex justify-between w-[320px]">
                        <h1>Phụ thu quản trị hệ thống</h1>
                        <h1>215,000VND</h1>
                      </div>
                    }
                  />
                  <ListItemText
                    primary={
                      <div className="text-sm py-1 px-3 rounded flex justify-between w-[320px]">
                        <h1>Phí sân bay quốc nội</h1>
                        <h1>100,000VND</h1>
                      </div>
                    }
                  />
                  <ListItemText
                    primary={
                      <div className="text-sm py-1 px-3 rounded flex justify-between w-[320px]">
                        <h1>Thuế VAT</h1>
                        <h1>34,400VND</h1>
                      </div>
                    }
                  />
                  <ListItemText
                    primary={
                      <div className="text-sm py-1 px-3 rounded flex justify-between w-[320px]">
                        <h1>Phí an ninh soi chiếu</h1>
                        <h1>20,000VND</h1>
                      </div>
                    }
                  />
                </Menu>
                <div className="bg-yellow-50 mt-2 mx-5 py-2 px-3 rounded flex justify-between">
                  <h1>Phí dịch vụ</h1>
                  <h1>0</h1>
                </div>
                <div className="mt-7 text-xl text-white font-bold uppercase p-3 bg-[#2D7690] w-[100%] flex justify-between">
                  <h1>Tổng tiền</h1>
                  <h1>
                    {new Intl.NumberFormat().format(price).replaceAll(",", ",")}
                    VND
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidInformation;
