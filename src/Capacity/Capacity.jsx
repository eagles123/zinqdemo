import React, { useState, useEffect } from "react";
import { useFormInput } from "../Utils/useFormInput";
import { TextField, Grid, Container, Fab } from "@material-ui/core/";
import Slider from "../Components/Slider";
import { getCapacity } from "./../Utils/fakeCapacityService";
import { checkInput } from "./../Utils/checkInput";
import CountUp from "react-countup";

const Capacity = () => {
  const type = useFormInput("Single");
  const [myCapacity, setMyCapacity] = useState("");
  const purpose = useFormInput("Main Residence");
  const livingExpense = useFormInput("");
  const currentRepayment = useFormInput("");
  const otherLoans = useFormInput("");
  const otherComitment = useFormInput("");
  const totalCreditCardLimit = useFormInput("");
  const [val, setVal] = useState({
    dependents: 0,
    mainIncome1: 0,
    otherIncome1: 0,
    mainIncome2: 0,
    otherIncome2: 0
  });
  const [errors, setErrors] = useState({
    livingExpenseError: "",
    currentRepaymentError: "",
    otherLaonError: "",
    otherCommitmentError: "",
    totalCreditCardLimitError: ""
  });
  //reset partner's income everytime the application type is changeed
  useEffect(() => {
    setVal({ ...val, mainIncome2: 0, otherIcome2: 0 });
  }, [type.value]);

  //check application type is single or joint
  function checkType() {
    if (type.value === "Joint") return true;
    else return false;
  }

  //generic function to hanlde slider value change
  function handleSliderChange(name, value) {
    setVal({ ...val, [name]: value });
  }

  function validateRange(input) {
    if (input >= 0 && input < 1500000) return "";
    else return "Must be in range 0 - 1500000";
  }

  //check if the required field is filled and if not set the error message
  function checkRequired() {
    let livingExpenseError;
    livingExpenseError = checkInput(
      livingExpense.value,
      "Living expense is required"
    );
    if (livingExpenseError == false) {
      livingExpenseError = validateRange(livingExpense.value);
    }
    let currentRepaymentError;
    currentRepaymentError = checkInput(
      currentRepayment.value,
      "Current repayment is required"
    );
    if (currentRepaymentError == false) {
      currentRepaymentError = validateRange(currentRepayment.value);
    }
    let otherLoanError;
    otherLoanError = checkInput(otherLoans.value, "Other loans is required");
    if (otherLoanError == false) {
      otherLoanError = validateRange(otherLoans.value);
    }
    let otherCommitmentError;
    otherCommitmentError = checkInput(
      otherComitment.value,
      "Other commitment is required"
    );
    if (otherCommitmentError == false) {
      otherCommitmentError = validateRange(otherComitment.value);
    }
    let totalCreditCardLimitError;
    totalCreditCardLimitError = checkInput(
      totalCreditCardLimit.value,
      "Totoal credit card limit is required"
    );
    if (totalCreditCardLimitError == false) {
      totalCreditCardLimitError = validateRange(totalCreditCardLimit.value);
    }
    setErrors({
      livingExpenseError,
      currentRepaymentError,
      otherLoanError,
      otherCommitmentError,
      totalCreditCardLimitError
    });
  }

  function validateInput() {
    if (
      livingExpense.value >= 0 &&
      livingExpense.value !== "" &&
      currentRepayment.value >= 0 &&
      currentRepayment.value !== "" &&
      otherLoans.value >= 0 &&
      otherLoans.value !== "" &&
      otherComitment.value >= 0 &&
      otherComitment.value !== "" &&
      totalCreditCardLimit.value >= 0 &&
      totalCreditCardLimit.value !== ""
    )
      return true;
  }

  // function validateInput() {
  //   for (let error in errors) {
  //     if (errors[error] !== "") return false;
  //   }
  //   return true;
  // }

  //caculate the borrowing capacity
  async function caculateCapacity() {
    checkRequired();
    if (validateInput() === true) {
      setMyCapacity(
        getCapacity(
          type,
          val.dependents,
          purpose,
          val.mainIncome1,
          val.otherIncome1,
          val.mainIncome2,
          val.otherIncome2,
          livingExpense.value,
          currentRepayment.value,
          otherLoans.value,
          otherComitment.value,
          totalCreditCardLimit.value
        ).toLocaleString()
      );
    }
  }
  return (
    <Container className="container caculator">
      <h2>Find out your loan capacity</h2>
      <p>
        Here's our personal loan Capacity capacity caculator, checkout how much
        you can borrow
      </p>
      <Grid container className="laon-capacity">
        <Grid container xs={12} md={7} spacing={1}>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Application type: </p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            <TextField
              style={{ margin: 4, width: "40%" }}
              select
              {...type}
              SelectProps={{
                native: true
              }}
              margin="dense"
              variant="outlined"
            >
              {["Single", "Joint"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Number of dependents: {val.dependents}</p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            <div className="capacity-slider">
              <Slider
                value={val.dependents}
                onChange={handleSliderChange}
                label={"dependents"}
                width={"85%"}
                min={0}
                max={10}
                step={1}
              />
            </div>
          </Grid>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Property purpose: </p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            <TextField
              style={{ margin: 4, width: "40%" }}
              select
              {...purpose}
              SelectProps={{
                native: true
              }}
              margin="dense"
              variant="outlined"
            >
              {["Main Residence", "Investment Property"].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={10} md={5} spacing={1}>
            <p>Your main income: ${val.mainIncome1.toLocaleString()} /Year</p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            <div className="capacity-slider">
              <Slider
                value={val.mainIncome1}
                onChange={handleSliderChange}
                label={"mainIncome1"}
                width={"85%"}
                min={0}
                max={1500000}
                step={5000}
              />
            </div>
          </Grid>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Your other income: ${val.otherIncome1.toLocaleString()} /Year</p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            <div className="capacity-slider">
              <Slider
                value={val.otherIncome1}
                onChange={handleSliderChange}
                label={"otherIncome1"}
                width={"85%"}
                min={0}
                max={1500000}
                step={5000}
              />
            </div>
          </Grid>
          {checkType() ? (
            <>
              {" "}
              <Grid item xs={10} md={5} spacing={1}>
                <p className="partner-field">
                  Partner's income: ${val.mainIncome2.toLocaleString()} /Year
                </p>
              </Grid>
              <Grid item xs={10} md={7} spacing={1}>
                <div className="capacity-slider partner-field">
                  <Slider
                    value={val.mainIncome2}
                    onChange={handleSliderChange}
                    label={"mainIncome2"}
                    width={"85%"}
                    min={0}
                    max={1500000}
                    step={5000}
                  />
                </div>
              </Grid>
              <Grid item xs={10} md={5} spacing={1}>
                <p className="partner-field">
                  Partner's other income: ${val.otherIcome2.toLocaleString()}{" "}
                  /Year
                </p>
              </Grid>
              <Grid item xs={10} md={7} spacing={1}>
                <div className="capacity-slider partner-field">
                  <Slider
                    value={val.otherIcome2}
                    onChange={handleSliderChange}
                    label={"otherIcome2"}
                    width={"85%"}
                    min={0}
                    max={1500000}
                    step={5000}
                  />
                </div>
              </Grid>
            </>
          ) : null}
          <Grid item xs={10} md={5} spacing={1}>
            <p>Living expense:</p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            {/* <div className="capacity-slider">
              <Slider
                value={val.livingExpense}
                onChange={handleSliderChange}
                label={"livingExpense"}
                width={"85%"}
                min={0}
                max={20000}
                step={500}
              />
            </div> */}
            <TextField
              error={errors.livingExpenseError}
              helperText={errors.livingExpenseError}
              type="number"
              {...livingExpense}
              style={{ margin: 4 }}
              placeholder="Living expense"
              margin="dense"
              variant="outlined"
            />
            <p style={{ display: "inline-block" }}> /Month</p>
          </Grid>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Current home loan repayment:</p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            {/* <div className="capacity-slider">
              <Slider
                value={val.currentRepayment}
                onChange={handleSliderChange}
                label={"currentRepayment"}
                width={"85%"}
                min={0}
                max={500000}
                step={1000}
              />
              </div> */}
            <TextField
              error={errors.currentRepaymentError}
              helperText={errors.currentRepaymentError}
              type="number"
              {...currentRepayment}
              style={{ margin: 4 }}
              placeholder="Currenet home loan repayment"
              margin="dense"
              variant="outlined"
            />
            <p style={{ display: "inline-block" }}> /Month</p>
          </Grid>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Other loans: </p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            {/* <div className="capacity-slider">
              <Slider
                value={val.otherLoans}
                onChange={handleSliderChange}
                label={"otherLoans"}
                width={"85%"}
                min={0}
                max={1500000}
                step={1000}
              />
              </div> */}
            <TextField
              error={errors.otherLoanError}
              helperText={errors.otherLoanError}
              type="number"
              {...otherLoans}
              style={{ margin: 4 }}
              placeholder="Other loans"
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Other commitments: </p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            {/* <div className="capacity-slider">
              <Slider
                value={val.otherComitment}
                onChange={handleSliderChange}
                label={"otherComitment"}
                width={"85%"}
                min={0}
                max={1500000}
                step={10000}
              />
            </div> */}
            <TextField
              error={errors.otherCommitmentError}
              helperText={errors.otherCommitmentError}
              type="number"
              {...otherComitment}
              style={{ margin: 4 }}
              placeholder="Other commitment"
              margin="dense"
              variant="outlined"
            />
            <p style={{ display: "inline-block" }}> /Month</p>
          </Grid>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Total credit card limits:</p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            {/* <div className="capacity-slider">
              <Slider
                value={val.totalCreditCardLimit}
                onChange={handleSliderChange}
                label={"totalCreditCardLimit"}
                width={"85%"}
                min={0}
                max={1500000}
                step={10000}
              />
            </div> */}
            <TextField
              error={errors.totalCreditCardLimitError}
              helperText={errors.totalCreditCardLimitError}
              type="number"
              {...totalCreditCardLimit}
              style={{ margin: 4 }}
              placeholder="Totoal credit card limit"
              margin="dense"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} md={4} spacing={1}>
          {myCapacity ? (
            <div className="result">
              <h3>
                Your Borrowing Capacity is : <span>${myCapacity}</span>
              </h3>
            </div>
          ) : null}
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        size="medium"
        className="quote"
        style={{
          textTransform: "none",
          backgroundColor: "#673ab7",
          color: "white",
          marginLeft: "40%",
          marginTop: "2rem",
          marginBottom: "1rem"
        }}
        onClick={caculateCapacity}
      >
        Get Your Capacity
      </Fab>
    </Container>
  );
};

export default Capacity;
