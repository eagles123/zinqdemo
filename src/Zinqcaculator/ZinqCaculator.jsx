import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import TopPanel from "./TopPanel";
import ProgressChart from "./ProgressChart";
import {
  monthlyRepay,
  totalLoan,
  yearlyRepayment
} from "../Utils/fakeCaculatorService";

const ZinqCaculator = () => {
  const [loan, setLoan] = useState(250000);
  const [loanTime, setLoanTime] = useState("");
  const [interest, setInterest] = useState("");
  const [frequency, setFrequency] = useState("Weekly");
  const [repayment, setRepayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [totalCostofLoan, setCostofLoan] = useState("");
  const [years, setYears] = useState([]);
  const [closingBalance, setBalance] = useState([]);

  // const [values, setValues] = useState({
  //   loanTime: "",
  //   interest: "",
  //   frequency: "Weekly",
  //   repayment: 0,
  //   monthlyPayment: "",
  //   totalCostofLoan: "",
  //   years: [],
  //   closingBalance: []
  // });

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  //set year vector
  async function handleYearChange() {
    let temp = [];
    for (let i = 0; i <= loanTime; i++) {
      temp.push(i);
    }
    return temp;
  }

  function handlePaymentChange() {
    setMonthlyPayment(monthlyRepay(loan, interest, loanTime, frequency));
    setCostofLoan(totalLoan(loan, interest, loanTime, frequency));
    setRepayment(yearlyRepayment(loan, interest, loanTime, frequency));
  }

  // function handlePaymentChange() {
  //   setValues({
  //     ...values,
  //     ["monthlyPayment"]: monthlyRepay(
  //       loan,
  //       values.interest,
  //       values.loanTime,
  //       values.frequency
  //     ),
  //     ["totalCostofLoan"]: totalLoan(
  //       loan,
  //       values.interest,
  //       values.loanTime,
  //       values.frequency
  //     ),
  //     ["repayment"]: yearlyRepayment(
  //       loan,
  //       values.interest,
  //       values.loanTime,
  //       values.frequency
  //     )
  //   });
  // }

  //console.log(getClosingBalance(loan, interest, repayment, loanTime));

  function getClosingBalance(loanAmount, interestRate, repayment, loanTerm) {
    let closingBalance = [];
    let amount = loanAmount;
    for (let i = 0; i <= loanTerm; i++) {
      let interest = (amount * interestRate) / 100;
      let balance = Math.round(amount + interest - repayment);
      amount = balance;
      if (balance < 0) closingBalance.push(0);
      else closingBalance.push(balance);
    }
    return closingBalance;
  }

  // function paymentPercent(loanAmount, closingBalance){
  //   let paymentPercent =
  // }

  // balance(loan, values.interest / 100, values.repayment);
  //lifecycle hook to caculate monthly repayment and totoal cost of loan
  useEffect(() => {
    handlePaymentChange();
  }, [loan, loanTime, interest, frequency]);

  useEffect(() => {
    // setYears(handleYearChange());
    handleYearChange().then(result => setYears(result));
  }, [loanTime]);

  useEffect(() => {
    setBalance(getClosingBalance(loan, interest, repayment, loanTime));
  }, [loan, loanTime, interest, repayment]);

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

  return (
    <Container className="container caculator">
      <TopPanel
        loan={loan}
        handleLoan={setLoan}
        loanTime={loanTime}
        handleLoanTime={setLoanTime}
        interest={interest}
        handleInterest={setInterest}
        frequency={frequency}
        handelFrequency={setFrequency}
        totalCostofLoan={totalCostofLoan}
        monthlyPayment={monthlyPayment}
      />
      <ProgressChart
        loan={loan}
        monthlyPayment={monthlyPayment}
        years={years}
        closingBalance={closingBalance}
      />
    </Container>
  );
};

export default ZinqCaculator;
