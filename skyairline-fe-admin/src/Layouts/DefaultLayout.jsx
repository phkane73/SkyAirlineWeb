import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Grid from "@mui/material/Grid";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/");
    }
  });
  return (
    <div>
      <Header />
      <Grid container>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
        <Grid item md={10}>
          {children}
        </Grid>
      </Grid>
    </div>
  );
};

export default DefaultLayout;
