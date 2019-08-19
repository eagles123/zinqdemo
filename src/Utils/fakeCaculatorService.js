export function monthlyRepay(loanAmount, interestRate, loanTerm, frequency) {}

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
  }
}
