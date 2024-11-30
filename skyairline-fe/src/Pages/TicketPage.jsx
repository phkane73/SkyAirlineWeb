import CircularProgress from "@mui/joy/CircularProgress";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSession } from "../Redux/reducers/SessionReducer";
import { getTicketsByUserId } from "../Services/TicketServices";
import { getFlightByIds } from "../Services/v2/FlightServices";
const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const token = useSelector((state) => state.Auth.token);
  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const result = await getTicketsByUserId(token);
      dispatch(removeSession(token));
      const sortedResult = [...result].sort(
        (a, b) => dayjs(b.payDate) - dayjs(a.payDate)
      );
      if (sortedResult) {
        setLoading(false);
        setTickets(sortedResult);
        const idFlights = result.map((item) => item.idFlight);
        const f = await getFlightByIds(idFlights);
        setFlights(f);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="w-[100%]">
          <h1 className="text-3xl uppercase text-center my-5 font-bold">
            Vé của bạn
          </h1>
          {loading ? (
            <CircularProgress
              size="lg"
              sx={{ marginLeft: 65, marginTop: 10, marginBottom: 30 }}
            />
          ) : (
            tickets.map((ticket) => {
              return (
                <div
                  className="ticket mb-8 w-2/3 mx-auto shadow-xl border-solid border-[#afb2b3] border-2"
                  key={ticket.id}
                >
                  <div className="flex">
                    <img
                      src={ticket.qrcode}
                      alt=""
                      className="w-[200px] h-[200px]"
                    />
                    <div className="w-[100%] font-bold">
                      <ul className="my-3 flex flex-col gap-4">
                        <li className="flex justify-between px-3 ">
                          <h1>Full name</h1>
                          <h1>{ticket.user.username}</h1>
                        </li>
                        <li className="flex justify-between px-3">
                          <h1>Phone number</h1>
                          <h1>{ticket.user.phone}</h1>
                        </li>
                        <li className="flex justify-between px-3">
                          <h1>Booking date</h1>
                          <h1>{dayjs(ticket.payDate).format("DD/MM/YYYY")}</h1>
                        </li>
                        <li className="flex justify-between px-3">
                          <h1>Email</h1>
                          <h1>{ticket.user.email}</h1>
                        </li>
                      </ul>
                      <div className="mx-3 border-t-2"></div>
                      <div className="px-3 text-2xl my-2 flex justify-between">
                        <h1>Total Value</h1>
                        <h1 className="text-red-600">
                          {new Intl.NumberFormat()
                            .format(ticket.ticketPrice)
                            .replaceAll(",", ",") + "đ"}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="mx-3 my-2 border-t-2 border-dashed border-black"></div>
                  <h1 className="mx-3 pl-1 text-xl text-white font-bold bg-[#2D7690] leading-9">
                    Flight information
                  </h1>
                  {flights
                    ? flights
                        .filter((item) => item.id === ticket.idFlight)
                        .map((flight) => {
                          return (
                            <div
                              className="bg-[#dbeef5] py-3 mx-3 mb-3 flex justify-between items-center"
                              key={flight.id}
                            >
                              <i className="fa-solid fa-circle text-2xl text-white ml-[-10px]"></i>
                              <div className="flex w-[90%] text-black font-medium">
                                <div className="w-2/3">
                                  <div className="flex justify-between mb-2">
                                    <div>
                                      <span>Date: </span>
                                      <span>
                                        {dayjs(flight.departureTime).format(
                                          "DD/MM/YYYY"
                                        )}
                                      </span>
                                    </div>
                                    <h1>Flight Code: XXXXXX(QR code)</h1>
                                  </div>
                                  <div className="flex justify-between items-center ">
                                    <div className="flex flex-col items-center">
                                      <h1 className="text-2xl font-bold">
                                        {
                                          flight.departureAirport
                                            .airportLocation
                                        }
                                      </h1>
                                      <h1 className="text-xl ">
                                        {dayjs(flight.departureTime).format(
                                          "HH:mm"
                                        )}
                                      </h1>
                                    </div>
                                    <i className="fa-solid fa-plane"></i>
                                    <div className="flex flex-col items-center ">
                                      <h1 className="text-2xl font-bold">
                                        {flight.arrivalAirport.airportLocation}
                                      </h1>
                                      <h1 className="text-xl ">
                                        {dayjs(flight.arrivalTime).format(
                                          "HH:mm"
                                        )}
                                      </h1>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-1/3 ml-2 flex flex-col items-center justify-center">
                                  <h1>{ticket.seat.ticketClass.className}</h1>
                                  <h1>Plane: {flight.plane.planeName}</h1>
                                  <h1>Seat Code: {ticket.seat.seatCode}</h1>
                                </div>
                              </div>
                              <i className="fa-solid fa-circle text-2xl text-white mr-[-10px]"></i>
                            </div>
                          );
                        })
                    : ""}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
