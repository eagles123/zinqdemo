//function to caculate repayment
function repayment(loanAmount, interestRate, loanTerm, frequency) {
  let newRate = interestRate / 100;
  return (
    ((newRate / frequecyConverter(frequency)) * loanAmount) /
    (1 -
      Math.pow(
        1 + newRate / frequecyConverter(frequency),
        -frequecyConverter(frequency) * loanTerm
      ))
  );
}
//convert repayment to monthly repayment
export function monthlyRepay(loanAmount, interestRate, loanTerm, frequency) {
  return (
    repayment(loanAmount, interestRate, loanTerm, frequency) *
    monthlyConverter(frequency)
  );
}

export function yearlyRepayment(loanAmount, interestRate, loanTerm, frequency) {
  return Math.round(
    repayment(loanAmount, interestRate, loanTerm, frequency) *
      frequecyConverter(frequency),
    2
  );
}
//function to caculate total cost os loan
export function totalLoan(loanAmount, interestRate, loanTerm, frequency) {
  //original formula dose not seem right
  // return Math.round(
  //   (monthlyRepay(loanAmount, interestRate, loanTerm, frequency) /
  //     (newRate / frequecyConverter(frequency))) *
  //     (Math.pow(
  //       1 + newRate / frequecyConverter(frequency),
  //       frequecyConverter(frequency) * loanTerm
  //     ) -
  //       1),
  //   2
  // );
  return Math.round(
    monthlyRepay(loanAmount, interestRate, loanTerm, frequency) * 12 * loanTerm
  );
}

//convert the payment frequency factor
export function frequecyConverter(frequency) {
  switch (frequency) {
    case "Weekly":
      return 52.17857;
    case "Fortnightly":
      return 26.08929;
    case "Monthly":
      return 12;
    case "Quarterly":
      return 4;
    case "HalfYearly":
      return 2;
    case "Yearly":
      return 1;
    default:
  }
}

//monthly payment convert factor
export function monthlyConverter(frequency) {
  switch (frequency) {
    case "Weekly":
      return 4.34524;
    case "Fortnightly":
      return 2.17262;
    case "Monthly":
      return 1;
    case "Quarterly":
      return 1 / 3;
    case "HalfYearly":
      return 1 / 6;
    case "Yearly":
      return 1 / 12;
    default:
  }
}
