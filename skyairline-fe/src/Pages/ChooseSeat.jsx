import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link, useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ListItemText from "@mui/material/ListItemText";
import Seat from "../Components/Seat";
import Menu from "@mui/material/Menu";
import { setFlight } from "../Redux/reducers/SessionReducer";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  createPaymentPaypal,
  capturePaymentPaypal,
} from "../Services/PaymentServices";

const ChooseSeat = ({ onChangeStep }) => {
  onChangeStep(2);
  const fee = 584000;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  const [price, setPrice] = useState(0);
  const [flight, setF] = useState({});
  const [tClass, setTClass] = useState({});
  const [seats, setSeats] = useState([]);
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const initialOptions = {
    clientId:
      "AVb4L9dRkYo_DCNxUPkyi38KPZuJW90TpzYthv6QIxhOBMJMns0rrfk3pWNSZAvPGm6LcVhXfsMJEM4l",
    currency: "USD",
    intent: "capture",
  };
  const open = Boolean(anchorEl);
  const handleDown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const store = useSelector((state) => state.Session);
  const tk = useSelector((state) => state.Auth.token);
  useEffect(() => {
    setF(store.flight);
    setTClass(store.ticketClass);
    setPrice(store.totalPrice);
    setSeats(store.flight.seatDetails);
  }, [store, seats, tk]);

  useEffect(() => {
    const seatsCopy = [...seats];
    seatsCopy.sort((a, b) => a.id.seat_id - b.id.seat_id);
    let row = [];
    for (let i = 0; i < seatsCopy.length; i += 6) {
      row.push(seatsCopy.slice(i, i + 6));
    }
    setRows(row);
  }, [seats]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/seatTopic");
    const stompClient = Stomp.over(socket);

    const connectAndSubscribe = () => {
      stompClient.connect({}, (frame) => {
        console.log("Connected: " + frame);
        stompClient.subscribe("/topic/seatTopic", (response) => {
          dispatch(setFlight(JSON.parse(response.body)));
        });
      });
    };
    connectAndSubscribe();
  }, [dispatch]);

  const createOrder = async () => {
    try {
      const response = await createPaymentPaypal(price);
      if (response !== null) return response;
    } catch (error) {
      console.log(error);
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await capturePaymentPaypal(data.orderID);
      if (response.data !== null) {
        console.log("Success");
      }
    } catch (error) {
      console.log(error);
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
        <div className="flex">
          <div className="w-2/3 flex flex-col items-center">
            <div>
              <h6 className="text-center text-xl mb-5 font-bold">
                Chọn chỗ ngồi
              </h6>
            </div>
            <div>
              <ul className="flex justify-between gap-10">
                <li className="flex flex-col items-center">
                  <div className="businessSeat p-3 w-[15px] bg-red-500 rounded"></div>
                  <span>Business</span>
                  <span>A (1--12)</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="deluxeSeat p-3 w-[15px] bg-yellow-500 rounded"></div>
                  <span>Deluxe</span>
                  <span>B (1--18)</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="basicSeat p-3 w-[15px] bg-green-500 rounded"></div>
                  <span>Classic</span>
                  <span>A (1--30)</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="seating p-3 w-[15px] bg-purple-800 rounded"></div>
                  <span>Đang chọn</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="seating p-3 w-[15px] bg-blue-600 rounded"></div>
                  <span>Có người</span>
                  <span>đang chọn</span>
                </li>
                <li className="flex flex-col items-center">
                  <div className="seated p-3 w-[15px] bg-gray-500 rounded"></div>
                  <span>Đã đặt</span>
                </li>
              </ul>
            </div>
            <div className="w-[60%]">
              <h1 className="uppercase text-center my-5 font-bold">
                Chọn ghế bạn muốn
              </h1>
              <div>
                <div>
                  {rows.length > 0
                    ? rows.map((row, index) => {
                        if (index === 1 || index === 4) {
                          return (
                            <ul
                              key={index}
                              className="flex justify-around mb-14"
                            >
                              {row.map((seat, i) => {
                                if (i === 2) {
                                  return (
                                    <li
                                      key={i}
                                      className="seat mr-9 flex flex-col items-center"
                                    >
                                      <Seat
                                        status={seat.status}
                                        class={seat.seat.ticketClass.className}
                                        id={seat.id.seat_id}
                                        idSchedule={seat.id.flight_schedule_id}
                                        idUser={seat.userBookingSeat}
                                        code={seat.seat.seatCode}
                                      ></Seat>
                                      <span className="text-sm">
                                        {seat.seat.seatCode}
                                      </span>
                                    </li>
                                  );
                                } else {
                                  return (
                                    <li
                                      key={i}
                                      className="seat flex flex-col items-center"
                                    >
                                      <Seat
                                        status={seat.status}
                                        class={seat.seat.ticketClass.className}
                                        id={seat.id.seat_id}
                                        idSchedule={seat.id.flight_schedule_id}
                                        idUser={seat.userBookingSeat}
                                        code={seat.seat.seatCode}
                                      ></Seat>
                                      <span className="text-sm">
                                        {seat.seat.seatCode}
                                      </span>
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          );
                        } else {
                          return (
                            <ul key={index} className="flex justify-around">
                              {row.map((seat, i) => {
                                if (i === 2) {
                                  return (
                                    <li
                                      key={i}
                                      className="seat mr-9 flex flex-col items-center mb-5"
                                    >
                                      <Seat
                                        status={seat.status}
                                        class={seat.seat.ticketClass.className}
                                        id={seat.id.seat_id}
                                        idSchedule={seat.id.flight_schedule_id}
                                        idUser={seat.userBookingSeat}
                                        code={seat.seat.seatCode}
                                      ></Seat>
                                      <span className="text-sm">
                                        {seat.seat.seatCode}
                                      </span>
                                    </li>
                                  );
                                } else {
                                  return (
                                    <li
                                      key={i}
                                      className="seat flex flex-col items-center mb-5"
                                    >
                                      <Seat
                                        status={seat.status}
                                        class={seat.seat.ticketClass.className}
                                        id={seat.id.seat_id}
                                        idSchedule={seat.id.flight_schedule_id}
                                        idUser={seat.userBookingSeat}
                                        code={seat.seat.seatCode}
                                      ></Seat>
                                      <span className="text-sm">
                                        {seat.seat.seatCode}
                                      </span>
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          );
                        }
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className=" bg-gray-200 rounded">
              <div className="flex flex-col justify-center">
                <div className="text-xl text-white font-bold uppercase p-3 bg-[#2D7690] rounded-t w-[100%] text-center">
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
                    <h2>{tClass.className}</h2>
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
                <div>
                  <Link
                    to="/booking/payment"
                    className="bg-yellow-500 hover:bg-yellow-500/70 text-white font-bold py-3 px-4  transition-all flex justify-center pl-1 mt-2 uppercase text-xl rounded-lg"
                  >
                    <span>Thanh toán</span>
                  </Link>
                  {/* <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseSeat;
