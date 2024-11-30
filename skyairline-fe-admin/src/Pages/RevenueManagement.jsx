import React, { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Search from "../Components/Search";
import {
  countRevenue,
  revenueMonths,
  revenueYears,
  revenues,
} from "../Services/RevenueService";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.element,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RevenueManagement = () => {
  const isMounted = useRef(false);
  const [data, setData] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [revenueMonth, setRevenueMonth] = useState([]);
  const [revenueYear, setRevenueYear] = useState([]);
  useEffect(() => {
    if (!isMounted.current) {
      async function fetchData() {
        await countRevenue();
      }
      fetchData();
      isMounted.current = true;
    }
    async function fetchRevenues() {
      const result = await revenues();
      const resultMonth = await revenueMonths();
      const resultYear = await revenueYears();
      setRevenueMonth(resultMonth);
      setRevenueYear(resultYear);
      setRevenue(result);
      setData(result);
    }
    fetchRevenues();
  }, []);

  const handleSearch = (query) => {
    const filteredDate = query
      ? revenue.filter((item) => item.date.includes(query))
      : data;
    setRevenue(filteredDate);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="px-10">
        <h1 className="text-center text-3xl font-bold my-3">
            REVENUE MANAGEMENT
        </h1>
        <div className="flex">
          <div className="flex justify-between items-center"></div>
          <div className="w-1/4 mr-10">
            <Search onSearch={handleSearch} />
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 480, maxWidth: 1200 }}
            >
              <Table
                sx={{ maxWidth: 1200 }}
                stickyHeader
                aria-label="sticky table"
              >
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
                      Date
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        textTransform: "uppercase",
                        fontSize: "18px",
                      }}
                    >
                      Revenue
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {revenue.map((r) => {
                    return (
                      <TableRow key={r.id} style={{ cursor: "default" }}>
                        <TableCell>{r.date}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat()
                            .format(r.totalRevenue)
                            .replaceAll(",", ".") + " đ"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <h4 className="mt-2">Total: {listPlane.length}</h4> */}
          </div>
          <div className="w-3/4 h-[540px]">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Months" {...a11yProps(0)} />
                  <Tab label="Years" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <BarChart
                  width={850}
                  height={460}
                  data={revenueMonth}
                  margin={{
                    top: 5,
                    left: 100,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    barSize={30}
                    dataKey="totalRevenue"
                    name="Total Price"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <BarChart
                  width={870}
                  height={460}
                  data={revenueYear}
                  margin={{
                    top: 5,
                    left: 100,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    barSize={30}
                    dataKey="totalRevenue"
                    name="Tổng tiền"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueManagement;
