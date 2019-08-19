import React, { useState, useEffect } from "react";
import Slider from "../Components/Slider";
import { monthlyRepay } from "../Utils/fakeCaculatorService";
import { TextField, Grid } from "@material-ui/core/";

const TopPanel = props => {
  //error message for term of year
  const [termError, setTermError] = useState("");
  //error message for interest rate
  const [rateError, setRateError] = useState("");
  const { loan, handleLoan, values, handleChange } = props;
  const frequency = [
    "Weekly",
    "Fortnightly",
    "Monthly",
    "Quarterly",
    "HalfYearly",
    "Yearly"
  ];

  //validate term of year between 1-30 years range
  function validateTerm() {
    let temp = parseInt(values.loanTime);
    if (typeof temp === "number" && !isNaN(temp)) {
      if (temp <= 0 || temp > 30) {
        setTermError("Term range must between 1-30 years");
      } else {
        setTermError("");
      }
    }
  }
  //validate interest rate between 0-99 years range
  function validateInterest() {
    let temp = parseInt(values.interest);
    if (typeof temp === "number" && !isNaN(temp)) {
      if (temp < 0 || temp > 99) {
        setRateError("Interest rate must be in 0-99% range");
      } else {
        setRateError("");
      }
    }
  }

  //lifecycle hook to validate term of year and interest rate
  useEffect(() => {
    validateTerm();
    validateInterest();
  }, [values.loanTime, values.interest]);
  return (
    <>
      <h2>THE ZINQ-CACULATOR</h2>
      <p>
        {" "}
        Take our Zinq calculator for a spin... and see if the numbers add up for
        you:
      </p>
      <Slider value={loan} onChange={handleLoan} name={"loan"} width={"70%"} />
      <p>
        Loan amount: <span>${loan.toLocaleString()}</span>
      </p>
      <Grid container className="caculator-field">
        <Grid item xs={10} md={3} spacing={1}>
          <TextField
            type="number"
            value={values.loanTime}
            onChange={handleChange("loanTime")}
            error={termError}
            style={{ margin: 8 }}
            placeholder="Term of Loan (in years)"
            helperText={termError}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={10} md={3} spacing={1}>
          <TextField
            type="number"
            value={values.interest}
            onChange={handleChange("interest")}
            error={rateError}
            style={{ margin: 8 }}
            placeholder="Interest rate (%)"
            helperText={rateError}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={10} md={3} spacing={1}>
          <TextField
            style={{ margin: 8 }}
            select
            value={values.frequency}
            onChange={handleChange("frequency")}
            SelectProps={{
              native: true
            }}
            helperText="Payment frequency"
            margin="normal"
            variant="outlined"
          >
            {frequency.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
          <p>{result}</p>
        </Grid>
      </Grid>
      <Grid container className="repayment">
        <Grid item xs={10} md={5} spacing={1}>
          <p>Estimated monthly repayment: </p>
        </Grid>
        <Grid item xs={10} md={5} spacing={1}>
          <p>Total cost of loan (over {values.loanTime} years): </p>
        </Grid>
      </Grid>
    </>
  );
};

export default TopPanel;
