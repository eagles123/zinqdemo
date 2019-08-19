import React, { useState, useEffect } from "react";
import { Container, Grid, Fab } from "@material-ui/core";
import TopPanel from "./TopPanel";

const ZinqCaculator = () => {
  const [loan, setLoan] = useState(25000);
  const [values, setValues] = useState({
    loanTime: 30,
    interest: "",
    frequency: "Weekly"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container className="container">
      <TopPanel
        loan={loan}
        handleLoan={setLoan}
        values={values}
        handleChange={handleChange}
      />
    </Container>
  );
};

export default ZinqCaculator;
