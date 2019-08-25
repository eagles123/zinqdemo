import React, { useState, useEffect } from "react";
import { Container, Grid, Fab } from "@material-ui/core";
import { upFront, trailing } from "../Utils/fakeCashBackService";
import Slider from "../Components/Slider";

const CashBack = () => {
  //total loan amount
  const [loan, setLoan] = useState(250000);
  // upfront
  const [cashBack, setCashBack] = useState(upFront(loan));
  //trailing
  const [trail, setTraillling] = useState(trailing(loan));

  function handleSliderChange(name, value) {
    setLoan(value);
  }

  //effect to triger when loan amount is changed
  useEffect(() => {
    setCashBack(upFront(loan));
    setTraillling(trailing(loan));
  }, [loan]);

  return (
    <Container className="container">
      <Grid container className="cashback">
        <Grid item xs={12} md={6} className="cash-left">
          <h2>CASH BACK INCENTIVE</h2>
          <br />
          <h4>How many loans do you know that pay you?</h4>
          <p>
            That's the Zinq difference: earning cash back over the life of your
            loan.
          </p>
          <p>Sound too good to be true? Nope. Just smart.</p>
          <Fab
            variant="extended"
            size="medium"
            className="howwork"
            style={{
              textTransform: "none",
              backgroundColor: "#673ab7",
              color: "white",
              marginTop: "2rem",
              marginBottom: "1rem"
            }}
          >
            How It Works
          </Fab>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="cash-slider">
            <p>
              Loan amount:{" "}
              <span className="amount">${loan.toLocaleString()}</span>
            </p>
            <Slider
              value={loan}
              onChange={handleSliderChange}
              width={"70%"}
              min={250000}
              max={2500000}
              step={1000}
            />
            <p style={{ fontSize: "1.3rem" }}>
              Your Cash Back is:{" "}
              <span className="amount">${cashBack.toLocaleString()}</span>
            </p>
            <p>In the first year alone!</p>
            <p>
              And <span className="amount">${trail.toLocaleString()}</span> over
              the life of the loan!
            </p>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CashBack;
