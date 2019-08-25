export function getCapacity(
  type,
  dependents,
  purpose,
  mainIncome1,
  otherIncome1,
  mainIncome2,
  otherIncome2,
  livingExpense,
  currentRepayment,
  otherLoans,
  otherComitment,
  totalCreditCardLimit
) {
  let baseRate = 0.03;
  let stressRateTier1 = 0.045;
  let loanTerm = 30;
  let frequency = 12;
  let nonCoreIncomePenalty = 0.8;
  let otherLoanBaseRate = 0.15;
  let creditCardBaseRate = 0.45;
  let serviceRate = baseRate + stressRateTier1 + stressRateTier2(purpose);
  let childCarePenalty = Math.max(1, Math.sqrt(dependents));
  let r = serviceRate / frequency;
  let N = frequency * loanTerm;
  let adjustedIncome = totalAdjustedIncome(
    mainIncome1,
    mainIncome2,
    nonCoreIncomePenalty,
    otherIncome1,
    otherIncome2,
    jointMultiplier(type)
  );
  let adjustedExpense = totalAdjustedExpense(
    livingExpense,
    childCarePenalty,
    currentRepayment,
    totalCreditCardLimit,
    creditCardBaseRate,
    otherLoans,
    otherLoanBaseRate,
    otherComitment
  );
  let serviceIncome = netServiceIncome(
    adjustedIncome,
    frequency,
    adjustedExpense
  );
  return caculateCapacity(r, N, serviceIncome);
}

function totalAdjustedIncome(
  mainIncome1,
  mainIncome2,
  nonCoreIncomePenalty,
  otherIncome1,
  otherIncome2,
  jointMultiplier
) {
  return (
    (mainIncome1 +
      mainIncome2 +
      nonCoreIncomePenalty * (otherIncome1 + otherIncome2)) *
    jointMultiplier
  );
}

function totalAdjustedExpense(
  livingExpense,
  childCarePenalty,
  currentRepayment,
  totalCreditCardLimit,
  creditCardBaseRate,
  otherLoans,
  otherLoanBaseRate,
  otherComitment
) {
  return (
    livingExpense * childCarePenalty +
    currentRepayment +
    totalCreditCardLimit * creditCardBaseRate +
    otherLoans * otherLoanBaseRate +
    otherComitment
  );
}

function netServiceIncome(
  totalAdjustedIncome,
  frequency,
  totalAdjustedExpense
) {
  return Math.max(0, totalAdjustedIncome / frequency - totalAdjustedExpense);
}

function caculateCapacity(r, N, netServiceIncome) {
  return Math.round(
    Math.max(0, (netServiceIncome / r) * (1 - Math.pow(1 + r, -N)))
  );
}

function jointMultiplier(type) {
  if (type === "Single") return 1;
  else return 1.1;
}

function stressRateTier2(purpose) {
  if (purpose === "Main Residence") return 0;
  else return 0.01;
}
