import React, { useState, useEffect } from "react";
import { Container, Grid, Fab } from "@material-ui/core";
import TopPanel from "./TopPanel";
import {
  monthlyRepay,
  totalLoan,
  yearlyRepayment
} from "../Utils/fakeCaculatorService";

const ZinqCaculator = () => {
  const [loan, setLoan] = useState(250000);
  const [values, setValues] = useState({
    loanTime: "",
    interest: "",
    frequency: "Weekly",
    repayment: 0,
    monthlyPayment: "",
    totalCostofLoan: "",
    years: [],
    closingBalance: []
  });

  console.log(values);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  //set year vector
  function setYears() {
    let temp = [];
    for (let i = 0; i <= values.loanTime; i++) {
      temp.push(i);
    }
    setValues({ ...values, ["years"]: temp });
  }

  function handlePaymentChange() {
    setValues({
      ...values,
      ["monthlyPayment"]: monthlyRepay(
        loan,
        values.interest,
        values.loanTime,
        values.frequency
      ),
      ["totalCostofLoan"]: totalLoan(
        loan,
        values.interest,
        values.loanTime,
        values.frequency
      ),
      ["repayment"]: yearlyRepayment(
        loan,
        values.interest,
        values.loanTime,
        values.frequency
      )
    });
  }

  console.log(
    getClosingBalance(loan, values.interest, values.repayment, values.loanTime)
  );
  console.log(values);

  function getClosingBalance(loanAmount, interestRate, repayment, loanTerm) {
    let closingBalance = [];
    let amount = loanAmount;
    for (let i = 0; i <= loanTerm; i++) {
      let interest = (amount * interestRate) / 100;
      let balance = amount + interest - repayment;
      amount = balance;
      if (balance < 0) closingBalance.push(0);
      else closingBalance.push(balance);
    }
    return closingBalance;
  }

  // balance(loan, values.interest / 100, values.repayment);
  //lifecycle hook to caculate monthly repayment and totoal cost of loan
  useEffect(() => {
    handlePaymentChange();
  }, [loan, values.loanTime, values.interest, values.frequency]);

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     ["closingBalance"]: getClosingBalance(
  //       loan,
  //       values.interest,
  //       values.repayment,
  //       values.loanTime
  //     )
  //   });
  // }, [loan, values.loanTime, values.interest, values.frequency]);

  useEffect(() => {
    setYears();
  }, [values.loanTime]);

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
