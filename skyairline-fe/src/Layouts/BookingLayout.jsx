import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Steps from "../Components/Step";
function BookingLayout({ children }) {
  const [step, setStep] = useState(0);

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
