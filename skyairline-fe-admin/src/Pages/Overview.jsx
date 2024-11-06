import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueMonths } from "../Services/RevenueService";
import { flightCount } from "../Services/ScheduleServices";
import { ticketCount } from "../Services/TicketServices";
import { userCount } from "../Services/UserServices";
import { getAllAirport } from "../Services/v2/AirportServices";

const Overview = () => {
  const [countTicket, setCountTicket] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countFlight, setCountFlight] = useState(0);
  const [countAirport, setCountAirport] = useState(0);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ticket = await ticketCount();
      setCountTicket(ticket);
      const user = await userCount();
      setCountUser(user);
      const flight = await flightCount();
      setCountFlight(flight);
      const airport = await getAllAirport();
      setCountAirport(airport.length);
      const result = await revenueMonths();
      setRevenue(result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="px-10 py-3">
        <div className="flex gap-5 mt-5">
          <Link
            to="/ticket"
            className="w-1/4 h-[150px] rounded-md shadow-sm shadow-red-500 flex items-center justify-between p-5"
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm uppercase">Tổng số vé</span>
              <span className="text-2xl font-bold">{countTicket} vé</span>
              <span className="underline">Xem chi tiết</span>
            </div>
            <div className="bg-red-500 w-[70px] h-[70px] rounded-full flex justify-center items-center">
              <i className="fa-solid fa-ticket text-4xl text-white"></i>
            </div>
          </Link>
          <Link
            to="/users"
            className="w-1/4 h-[150px] rounded-md shadow-sm shadow-green-500 flex items-center justify-between p-5"
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm uppercase">Số người dùng</span>
              <span className="text-2xl font-bold">{countUser} account</span>
              <span className="underline">Xem chi tiết</span>
            </div>
            <div className="bg-green-500 w-[70px] h-[70px] rounded-full flex justify-center items-center">
              <i className="fa-solid fa-user text-4xl text-white"></i>
            </div>
          </Link>
          <Link
            to="/schedule/list"
            className="w-1/4 h-[150px] rounded-md shadow-sm shadow-blue-500 flex items-center justify-between p-5"
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm uppercase">Số chuyến bay</span>
              <span className="text-2xl font-bold">{countFlight} flight</span>
              <span className="underline">Xem chi tiết</span>
            </div>
            <div className="bg-blue-500 w-[70px] h-[70px] rounded-full flex justify-center items-center">
              <i className="fa-solid fa-plane-departure text-4xl text-white"></i>
            </div>
          </Link>
          <Link
            to="/airport"
            className="w-1/4 h-[150px] rounded-md shadow-sm shadow-yellow-500 flex items-center justify-between p-5"
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm uppercase">Số sân bay</span>
              <span className="text-2xl font-bold">{countAirport} sân bay</span>
              <span className="underline">Xem chi tiết</span>
            </div>
            <div className="bg-yellow-500 w-[70px] h-[70px] rounded-full flex justify-center items-center">
              <i className="fa-solid fa-inbox text-4xl text-white"></i>
            </div>
          </Link>
        </div>

        <LineChart
          width={1200}
          height={400}
          data={revenue}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default Overview;
