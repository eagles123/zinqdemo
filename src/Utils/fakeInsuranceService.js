export function caculateQuote(
  income,
  dependents,
  assests,
  liabilities,
  age,
  youngestDepn,
  smoke,
  partner
) {
  let tpd_expense = 80000;
  let traumaCoverExpenses = 80000;
  let Rate = 1.05 / 1.03 - 1;
  let discountfactor = 1 / (1 + Rate);
  let futureIncomeScale = 0.5 * income;
  let childrenExpenseScale = 0.1 * income;
  let TraumaChildrenExpenseScale = 0.05 * income;
  let lifeCoverExpense = 20000;
  let lifeCoverDebts = Math.max(liabilities - assests, 0);
  let tpd_CoverDebts = lifeCoverDebts;
  let life_cover = life_Cover(
    lifeCoverExpense,
    lifeCoverDebts,
    discountfactor,
    age,
    partner,
    futureIncomeScale,
    dependents,
    youngestDepn,
    childrenExpenseScale
  );
  let tpd_cover = tpd_Cover(
    income,
    tpd_expense,
    tpd_CoverDebts,
    tpd_futureIncome(smoke, discountfactor, age, partner, futureIncomeScale),
    tpd_futureIncomeChildren(
      smoke,
      dependents,
      youngestDepn,
      childrenExpenseScale
    )
  );
  let trauma_cover = trauma_Cover(
    traumaCoverExpenses,
    tempIncomeSupoortSpouse(age, futureIncomeScale),
    traumaFutureIncomeChildren(dependents, TraumaChildrenExpenseScale)
  );
  let ip_cover = ip_Cover(age, income);
  return {
    life_cover,
    tpd_cover,
    trauma_cover,
    ip_cover
  };
}

function life_Cover(
  lifeCoverExpense,
  lifeCoverDebts,
  discountfactor,
  age,
  partner,
  futureIncomeScale,
  dependents,
  youngestDepn,
  childrenExpenseScale
) {
  return Math.round(
    Math.max(
      aggregate1(
        lifeCoverExpense,
        lifeCoverDebts,
        discountfactor,
        age,
        partner,
        futureIncomeScale,
        dependents,
        youngestDepn,
        childrenExpenseScale
      ),
      30000
    )
  );
}

function tpd_Cover(
  income,
  tpd_expense,
  tpd_CoverDebts,
  tpd_futureIncome,
  tpd_futureIncomeChildren
) {
  if (income > 1000000) return 0;
  else if (
    aggregate2(
      tpd_expense,
      tpd_CoverDebts,
      tpd_futureIncome,
      tpd_futureIncomeChildren
    ) >= 5000000
  )
    return 5000000;
  else
    return Math.round(
      Math.max(
        aggregate2(
          tpd_expense,
          tpd_CoverDebts,
          tpd_futureIncome,
          tpd_futureIncomeChildren
        ),
        50000
      )
    );
}

function trauma_Cover(
  traumaCoverExpenses,
  tempIncomeSupoortSpouse,
  traumaFutureIncomeChildren
) {
  if (
    aggregate3(
      traumaCoverExpenses,
      tempIncomeSupoortSpouse,
      traumaFutureIncomeChildren
    ) >= 2000000
  )
    return 2000000;
  else
    return Math.round(
      Math.max(
        aggregate3(
          traumaCoverExpenses,
          tempIncomeSupoortSpouse,
          traumaFutureIncomeChildren
        ),
        100000
      )
    );
}

function ip_Cover(age, income) {
  if (age > 64) return 0;
  else if (aggreage4(income) >= 60000) return 60000;
  else return Math.round(Math.max(aggreage4(income), 500));
}

function lifeFurtureIncomeSpouse(
  discountfactor,
  age,
  partner,
  futureIncomeScale
) {
  if (age > 64 || partner === "No") return 0;
  else
    return (
      futureIncomeScale *
      ((1 - Math.pow(discountfactor, 65 - age)) / (1 - discountfactor))
    );
}

function lifeFutureIncomeChildren(
  dependents,
  youngestDepn,
  childrenExpenseScale
) {
  return (
    childrenExpenseScale * (0.5 * dependents * Math.max(25 - youngestDepn, 0))
  );
}

function tpd_futureIncome(
  smoke,
  discountfactor,
  age,
  partner,
  futureIncomeScale
) {
  if (smoke === "Yes")
    return lifeFurtureIncomeSpouse(
      discountfactor,
      age,
      partner,
      futureIncomeScale
    );
  else
    return (
      0.9 *
      lifeFurtureIncomeSpouse(discountfactor, age, partner, futureIncomeScale)
    );
}

function tpd_futureIncomeChildren(
  smoke,
  dependents,
  youngestDepn,
  childrenExpenseScale
) {
  if (smoke === "Yes")
    return lifeFutureIncomeChildren(
      dependents,
      youngestDepn,
      childrenExpenseScale
    );
  else
    return (
      0.9 *
      lifeFutureIncomeChildren(dependents, youngestDepn, childrenExpenseScale)
    );
}

function traumaFutureIncomeChildren(dependents, TraumaChildrenExpenseScale) {
  return dependents * TraumaChildrenExpenseScale;
}

function tempIncomeSupoortSpouse(age, futureIncomeScale) {
  if (age > 64) return 0;
  else return 0.5 * futureIncomeScale;
}

export function aggregate1(
  lifeCoverExpense,
  lifeCoverDebts,
  discountfactor,
  age,
  partner,
  futureIncomeScale,
  dependents,
  youngestDepn,
  childrenExpenseScale
) {
  return (
    lifeCoverExpense +
    lifeCoverDebts +
    lifeFurtureIncomeSpouse(discountfactor, age, partner, futureIncomeScale) +
    lifeFutureIncomeChildren(dependents, youngestDepn, childrenExpenseScale)
  );
}

function aggregate2(
  tpd_expense,
  tpd_CoverDebts,
  tpd_futureIncome,
  tpd_futureIncomeChildren
) {
  return (
    tpd_expense + tpd_CoverDebts + tpd_futureIncome + tpd_futureIncomeChildren
  );
}

function aggregate3(
  traumaCoverExpenses,
  tempIncomeSupoortSpouse,
  traumaFutureIncomeChildren
) {
  return (
    traumaCoverExpenses + tempIncomeSupoortSpouse + traumaFutureIncomeChildren
  );
}

function aggreage4(income) {
  return (0.75 * income) / 12;
}
