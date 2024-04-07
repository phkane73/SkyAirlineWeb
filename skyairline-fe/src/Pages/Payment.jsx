import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  createPaymentPaypal,
  capturePaymentPaypal,
} from "../Services/PaymentServices";
import { useSelector } from "react-redux";
import { getInfo } from "../Services/UserServices";
import dayjs from "dayjs";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CircularProgress from "@mui/joy/CircularProgress";
// import LinearProgress from "@mui/joy/LinearProgress";
const Payment = ({ onChangeStep }) => {
  onChangeStep(3);
  const initialOptions = {
    clientId:
      "AVb4L9dRkYo_DCNxUPkyi38KPZuJW90TpzYthv6QIxhOBMJMns0rrfk3pWNSZAvPGm6LcVhXfsMJEM4l",
    currency: "USD",
    intent: "capture",
  };

  const [info, setInfo] = useState({});
  const store = useSelector((state) => state.Session);
  const auth = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const createOrder = async () => {
    try {
      const response = await createPaymentPaypal(
        (store.totalPrice / 24000).toFixed(2)
      );
      if (response !== null) {
        return response;
      }
      // setLoadingPayment(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onApprove = async (data) => {
    try {
      const user = await getInfo(auth);
      if (user) {
        setLoading(true);
        const response = await capturePaymentPaypal(
          data.orderID,
          "paypal",
          store.totalPrice,
          store.seat.seatId,
          store.flight.id,
          user.id
        );
        if (response !== null) {
          setLoading(false);
          alert("Thanh toán thành công");
          navigate("/ticket");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getInfo(auth);
      setInfo(data);
    }
    fetchData();
  }, [auth, store]);

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="container my-5">
      {loading ? (
        <CircularProgress
          size="lg"
          sx={{ marginLeft: 65, marginTop: 10, marginBottom: 30 }}
        />
      ) : (
        <>
          <div className="h-[50px] flex items-center bg-white pl-2 mb-5">
            <button
              to="/"
              className="bg-black hover:bg-black/70 text-white font-bold py-2 px-4 rounded transition-all flex items-center pl-1"
              onClick={handleClick}
            >
              <ChevronLeftIcon />
              <span>Quay lại</span>
            </button>
          </div>
          <div className="flex mt-3">
            <div className="w-2/3 rounded-md border-2 p-3">
              <h1 className="text-2xl uppercase font-bold text-center">
                Xác nhận thông tin đặt vé
              </h1>
              <div>
                <h1 className="font-bold text-xl mt-3 bg-gray-300 rounded-sm">
                  Thông tin hành khách
                </h1>
                <div className="flex gap-6">
                  <h2>Họ và tên: {info.username}</h2>
                  <h2>Số điện thoại: {info.phone}</h2>
                  <h2>
                    Ngày sinh: {dayjs(info.birthday).format("DD/MM/YYYY")}
                  </h2>
                </div>
              </div>
              <div>
                <div className="font-bold text-xl mt-3 bg-gray-300 rounded-sm">
                  Thông tin chuyến bay
                </div>
                <div className="flex gap-6">
                  <h2>Mã chuyến bay: {store.flight.flightCode}</h2>
                  <h2>
                    Ngày khởi hàng:{" "}
                    {dayjs(store.flight.departureTime).format("DD/MM/YYYY")}
                  </h2>
                </div>
                <div className="flex justify-between px-10 items-center">
                  <div>
                    <h1 className="font-bold uppercase text-center">
                      Điểm đến
                    </h1>
                    <div className="text-center">
                      {store.flight.departureAirport?.location}
                    </div>
                    <div>{store.flight.departureAirport?.airportName}</div>
                    <div className="text-center">
                      {dayjs(store.flight.departureTime).format("HH:mm")}
                    </div>
                  </div>
                  <div>
                    <DoubleArrowIcon />
                  </div>
                  <div>
                    <h1 className="font-bold uppercase text-center">
                      Điểm đến
                    </h1>
                    <div className="text-center">
                      {store.flight.arrivalAirport?.location}
                    </div>
                    <div>{store.flight.arrivalAirport?.airportName}</div>
                    <div className="text-center">
                      {dayjs(store.flight.arrivalTime).format("HH:mm")}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-bold text-xl mt-3 bg-gray-300 rounded-sm">
                  Chi tiết chuyến bay {store.flight.flightCode}
                </div>
                <div className="flex gap-6">
                  <h2>Mã ghế: {store.seat.seatCode}</h2>
                  <h2>Hạng chuyến bay: {store.ticketClass.className}</h2>
                  <h2>Tên máy bay: {store.flight.planeName}</h2>
                </div>
              </div>
            </div>
            <div className="w-1/3 pl-10 flex flex-col">
              <h1 className="text-2xl uppercase font-bold text-center mb-4">
                Thanh toán ngay
              </h1>
              <span className="text-2xl text-center mb-6">
                {new Intl.NumberFormat()
                  .format(store.totalPrice)
                  .replaceAll(",", ",") + "đ"}
              </span>
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  onApprove={(data, action) => {
                    onApprove(data, action);
                  }}
                  createOrder={createOrder}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Payment;
