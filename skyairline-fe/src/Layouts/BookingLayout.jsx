import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Steps from "../Components/Step";
import { useNavigate } from "react-router-dom";
function BookingLayout({ children }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  // setTimeout(() => {
  //   navigate("/");
  //   alert("Đã hết phiên làm việc. Vui lòng đặt vé lại!");
  // }, 6000);

  const onChangeStep = (step) => {
    setStep(step);
  };
  return (
    <div>
      <Header></Header>
      <Steps step={step}></Steps>
      <div>{React.cloneElement(children, { onChangeStep })}</div>
      <Footer></Footer>
    </div>
  );
}
export default BookingLayout;
