import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link, useParams, useNavigate } from "react-router-dom";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import { findFlight } from "../Services/FlightServices";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/joy/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { setFlights } from "../Redux/reducers/SessionReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000 20px",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const ChooseFlight = ({ onChangeStep }) => {
  var duration = require("dayjs/plugin/duration");
  dayjs.extend(duration);
  onChangeStep(0);
  const dispatch = useDispatch();
  const [openBusiness, setOpenBusiness] = React.useState(false);
  const handleOpenBusiness = () => {
    setOpenBusiness(true);
  };
  const handleCloseBusiness = () => setOpenBusiness(false);
  const [openDeluxe, setOpenDeluxe] = React.useState(false);
  const handleOpenDeluxe = () => {
    setOpenDeluxe(true);
  };
  const handleCloseDeluxe = () => setOpenDeluxe(false);
  const [openClassic, setOpenClassic] = React.useState(false);
  const handleOpenClassic = () => {
    setOpenClassic(true);
  };
  const handleCloseClassic = () => setOpenClassic(false);
  const { departure, arrival, date } = useParams();
  const [listFlight, setListFlight] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  var businessPrice = 0;
  var deluxePrice = 0;
  var classicPrice = 0;
  useEffect(() => {
    async function fetchData() {
      const data = await findFlight(
        departure,
        arrival,
        dayjs(date).format("YYYY-MM-DD HH:mm")
      );
      if (data) {
        setLoading(false);
        dispatch(setFlights({ data }));
      }
    }
    fetchData();
  }, [departure, arrival, date, dispatch]);

  const store = useSelector((state) => state.Session.flights.data);
  const auth = useSelector((state) => state.Auth.token);
  useEffect(() => {
    if (store) {
      setListFlight(store);
    }
  }, [store]);

  const handleAuth = (e, count) => {
    if (!auth) {
      e.preventDefault();
      navigate("/login");
    }
    if (count === 0) {
      e.preventDefault();
      toast.error("🦄 Wow so easy!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
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
      <div className="container my-5">
        <div className="h-[50px] flex items-center bg-white sticky top-0 z-50 pl-2 mb-5">
          <Link
            to="/"
            className="bg-black hover:bg-black/70 text-white font-bold py-2 px-4 rounded transition-all flex items-center pl-1"
          >
            <ChevronLeftIcon />
            <span>Quay lại</span>
          </Link>
          <span className="text-center uppercase text-3xl font-bold ml-[300px]">
            Chọn chuyến bay
          </span>
        </div>

        {loading ? (
          <CircularProgress
            size="lg"
            sx={{ marginLeft: 65, marginTop: 10, marginBottom: 30 }}
          />
        ) : (
          <>
            <div className="flex justify-center mb-10">
              <div className="h-[80px] bg-gray-400/30 rounded-md w-2/3 flex items-center gap-6 justify-center">
                <span className="font-bold text-2xl text-[#2D7690]">
                  {listFlight.length > 0
                    ? listFlight[0].departureAirport.location
                    : ""}
                </span>
                <div className="flex gap-2 text-2xl">
                  <FlightTakeoffIcon />
                  <HorizontalRuleIcon />
                  <HorizontalRuleIcon />
                  <HorizontalRuleIcon />
                  <div className="flex flex-col items-center">
                    <i className="fa-solid fa-plane"></i>
                    <span className="text-sm">
                      {listFlight.length > 0
                        ? dayjs
                            .duration(
                              dayjs(listFlight[0].arrivalTime).diff(
                                dayjs(listFlight[0].departureTime)
                              )
                            )
                            .format("HH:mm")
                        : ""}
                    </span>
                  </div>
                  <HorizontalRuleIcon />
                  <HorizontalRuleIcon />
                  <HorizontalRuleIcon />
                  <FlightLandIcon />
                </div>
                <span className="font-bold text-2xl text-[#2D7690]">
                  {listFlight.length > 0
                    ? listFlight[0].arrivalAirport.location
                    : ""}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-10">
              {listFlight.map((flight) => {
                var countBusiness = 0;
                var countDeluxe = 0;
                var countClassic = 0;
                return (
                  <div
                    className=" bg-[#2D7690] backdrop-blur-xl w-[100%] h-[150px] rounded-md shadow-lg shadow-[#2D7690]/50 flex text-white py-1"
                    key={flight.id}
                  >
                    <div className="w-1/2 h-[100%] flex flex-col items-center justify-center gap-1 text-gray-200">
                      <span>Mã chuyến bay: {flight.flightCode}</span>
                      <span>Máy bay: {flight.planeName}</span>
                      <span>Còn 8 ghế</span>
                      <div className="flex gap-1">
                        <div className="flex flex-col items-center">
                          <span className="text-xl">
                            {dayjs(flight.departureTime).format("HH:mm")}
                          </span>
                          <span>{flight.departureAirport.airportName}</span>
                        </div>
                        <i className="fa-solid fa-arrow-right text-xl"></i>
                        <div className="flex flex-col items-center">
                          <span className="text-xl">
                            {dayjs(flight.arrivalTime).format("HH:mm")}
                          </span>
                          <span>{flight.arrivalAirport.airportName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 flex gap-1">
                      <div className="w-1/3 bg-white rounded-md flex flex-col">
                        <Link
                          to={`/booking/validinformation/${flight.id}/${1}`}
                          onClick={(e) => handleAuth(e, countBusiness)}
                          className="h-[100%]"
                        >
                          <div className="h-[50px] rounded-t-md bg-[#dbb42c]">
                            <h1 className="text-center leading-[50px] uppercase font-bold text-xl">
                              Business
                            </h1>
                            <div className="flex flex-col items-center mt-[10px]">
                              <span className="text-xl text-black">
                                {flight.seatDetails.map((f) => {
                                  if (
                                    f.seat.ticketClass.className === "BUSINESS"
                                  ) {
                                    businessPrice =
                                      f.seat.ticketClass.ticketClassPrice +
                                      flight.price;
                                    if (f.status === "AVAILABLE") {
                                      countBusiness++;
                                    }
                                  }
                                  return "";
                                })}
                                {new Intl.NumberFormat()
                                  .format(businessPrice)
                                  .replaceAll(",", ",")}
                                VND
                              </span>
                              <span className="text-black">
                                Còn {countBusiness} ghế
                              </span>
                            </div>
                          </div>
                        </Link>
                        <button
                          className="text-blue-600 underline hover:text-black transition-all"
                          onClick={handleOpenBusiness}
                        >
                          Chi tiết
                        </button>
                      </div>
                      <div className="w-1/3 bg-white flex flex-col rounded-md">
                        <Link
                          to={`/booking/validinformation/${flight.id}/${2}`}
                          onClick={(e) => handleAuth(e, countDeluxe)}
                          className="h-[100%]"
                        >
                          <div className="h-[50px] rounded-t-md bg-[#cb0303]">
                            <h1 className="text-center leading-[50px] uppercase font-bold text-xl">
                              Deluxe
                            </h1>
                            <div className="flex flex-col items-center mt-[20px]">
                              <span className="text-xl text-black">
                                {flight.seatDetails.map((f) => {
                                  if (
                                    f.seat.ticketClass.className === "DELUXE"
                                  ) {
                                    deluxePrice =
                                      f.seat.ticketClass.ticketClassPrice +
                                      flight.price;
                                    if (f.status === "AVAILABLE") {
                                      countDeluxe++;
                                    }
                                  }
                                  return "";
                                })}
                                {new Intl.NumberFormat()
                                  .format(deluxePrice)
                                  .replaceAll(",", ",")}
                                VND
                              </span>
                              <span className="text-black">
                                Còn {countDeluxe} ghế
                              </span>
                            </div>
                          </div>
                        </Link>
                        <button
                          className="text-blue-600 underline hover:text-black transition-all"
                          onClick={handleOpenDeluxe}
                        >
                          Chi tiết
                        </button>
                      </div>
                      <div className="w-1/3 mr-1 bg-white rounded-md flex flex-col">
                        <Link
                          to={`/booking/validinformation/${flight.id}/${3}`}
                          onClick={(e) => handleAuth(e, countClassic)}
                          className="h-[100%]"
                        >
                          <div className="h-[50px] rounded-t-md bg-[#058c42]">
                            <h1 className="text-center leading-[50px] uppercase font-bold text-xl">
                              Classic
                            </h1>
                            <div className="flex flex-col items-center mt-[20px]">
                              <span className="text-xl text-black">
                                {flight.seatDetails.map((f) => {
                                  if (
                                    f.seat.ticketClass.className === "CLASSIC"
                                  ) {
                                    classicPrice =
                                      f.seat.ticketClass.ticketClassPrice +
                                      flight.price;
                                    if (f.status === "AVAILABLE") {
                                      countClassic++;
                                    }
                                  }
                                  return "";
                                })}
                                {new Intl.NumberFormat()
                                  .format(classicPrice)
                                  .replaceAll(",", ",")}
                                VND
                              </span>
                              <span className="text-black">
                                Còn {countClassic} ghế
                              </span>
                            </div>
                          </div>
                        </Link>
                        <button
                          className="text-blue-600 underline hover:text-black transition-all"
                          onClick={handleOpenClassic}
                        >
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Modal
        open={openBusiness}
        onClose={handleCloseBusiness}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="text-[#dbb42c] text-center text-2xl uppercase mb-4">
              Đặc quyền hạng business
            </h1>
            <ul>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Hành lý xách tay: 14kg cho đường bay Úc, Kazakhstan; 10kg cho
                các đường bay còn lại.
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Phòng chờ sang trọng (không áp dụng trên các chuyến bay nội địa
                Thái Lan và các sân bay có phòng chờ không đạt tiêu chuẩn hoặc
                đóng cửa trong giờ hoạt động của chuyến bay)
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Ưu tiên làm thủ tục trước chuyến bay
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Ưu tiên phục vụ hành lý
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Ưu tiên qua cửa an ninh (tùy theo điều kiện từng sân bay)
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Phục vụ đưa đón riêng ra tàu bay (áp dụng trường hợp tàu bay đậu
                bãi; không áp dụng đối với sân bay không cung cấp dịch vụ xe đưa
                đón riêng)
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Ưu tiên chọn chỗ ngồi trên tàu bay (không áp dụng các hàng ghế
                dành cho khách Business)
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Thưởng thức ẩm thực tươi ngon suốt chuyến bay
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Bộ tiện ích (chuyến bay từ 04 tiếng trở lên)
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Hoàn bảo lưu định danh tiền vé trong vòng 02 (hai) năm kể từ
                ngày khởi hành dự kiến
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Bảo hiểm Sky Care
              </li>
            </ul>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openDeluxe}
        onClose={handleCloseDeluxe}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="text-[#cb0303] text-center text-2xl uppercase mb-4">
              Đặc quyền hạng deluxe
            </h1>
            <ul>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Hành lý xách tay: 10kg cho đường bay Úc, Kazakhstan; 07kg cho
                các đường bay còn lại.
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Hành lý ký gửi: 40kg cho đường bay Úc, Kazakhstan; 20kg cho các
                đường bay còn lại.
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Suất ăn & nước uống cho đường bay Úc, Kazakhstan.
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Chọn trước chỗ ngồi yêu thích (khi còn chỗ, không áp dụng các
                hàng ghế dành cho SkyBoss và Business)
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Miễn phí thay đổi chuyến bay, ngày bay, hành trình (Thu chênh
                lệch giá Vé - nếu có)
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Bảo hiểm Sky Care (chưa áp dụng cho các chuyến bay do Thai
                Vietjet khai thác)
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Bảo hiểm Sky Care
              </li>
            </ul>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openClassic}
        onClose={handleCloseClassic}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="text-[#058c42] text-center text-2xl uppercase mb-4">
              Đặc quyền hạng classic
            </h1>
            <ul>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Hành lý xách tay: 07Kg.
              </li>
              <li className="mb-3">
                <i className="fa-solid fa-circle-check text-green-600 mr-2"></i>
                Bảo hiểm Sky Care
              </li>
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ChooseFlight;
