import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import FlightIcon from "@mui/icons-material/Flight";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import HailIcon from "@mui/icons-material/Hail";
import CreditCardIcon from "@mui/icons-material/CreditCard";


const Steps = ({ step }) => {
  const steps = [
    {
      id: 0,
      value: (
        <span className="text-black font-bold">
          <FlightIcon /> Chọn chuyến bay
        </span>
      ),
    },
    {
      id: 1,
      value: (
        <span className="text-black font-bold">
          <HailIcon /> Xác nhận thông tin
        </span>
      ),
    },
    {
      id: 2,
      value: (
        <span className="text-black font-bold">
          <AirlineSeatReclineExtraIcon /> Chọn ghế ngồi
        </span>
      ),
    },
    {
      id: 3,
      value: (
        <span className="text-black font-bold">
          <CreditCardIcon /> Thanh toán
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="container">
        <div className="step-booking w-[100%] h-[100px] pt-4 flex items-center rounded-md bg-yellow-100">
          <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label.id}>
                  <StepLabel>{label.value}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Steps;
