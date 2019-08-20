import React, { useState, useEffect } from "react";
import Slider from "../Components/Slider";
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

  function validateNumber() {
    let temp = parseInt(values.loanTime);
    if (typeof temp === "number" && !isNaN(temp)) return true;
    else return false;
  }
  //following function validate input within the defined range
  function validateTermInput() {
    let temp = parseInt(values.loanTime);
    if (temp > 0 && temp <= 30) return true;
    else return false;
  }
  function validateInterestInput() {
    let temp = parseInt(values.interest);
    if (temp > 0 && temp <= 99) return true;
    else return false;
  }
  //validate term of year between 1-30 years range
  function validateTerm() {
    if (validateNumber()) {
      if (validateTermInput() || values.loanTime === "") setTermError("");
      else setTermError("Term range must between 1-30 years");
    }
  }
  //validate interest rate between 0-99 years range
  function validateInterest() {
    if (validateNumber()) {
      if (validateInterestInput() || values.interest === "") setRateError("");
      else setRateError("Interest rate must be in 0-99% range");
    }
  }

  //lifecycle hook to validate term of year and interest rate
  useEffect(() => {
    validateTerm();
    validateInterest();
  }, [values.loanTime, values.interest]);

  return (
    <div className="top-panel">
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
        </Grid>
      </Grid>
      <Grid container className="repayment">
        <Grid item xs={10} md={5} spacing={1}>
          <p>
            Estimated monthly repayment:{" "}
            <span className="amount">
              {" "}
              {values.monthlyPayment > 0 &&
              values.monthlyPayment < 99999999 &&
              validateTermInput() &&
              validateInterestInput()
                ? `$ ${values.monthlyPayment.toLocaleString()}`
                : ""}
            </span>
          </p>
        </Grid>
        <Grid item xs={10} md={5} spacing={1}>
          <p>
            Total cost of loan (over {values.loanTime} years):{" "}
            <span className="amount">
              {values.totalCostofLoan > 0 &&
              values.totalCostofLoan < 99999999 &&
              validateTermInput() &&
              validateInterestInput()
                ? `$ ${values.totalCostofLoan.toLocaleString()}`
                : ""}
            </span>
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopPanel;
