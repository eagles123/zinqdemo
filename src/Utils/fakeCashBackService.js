//function caculate the upfront cashback
export function upFront(loanAmount) {
  if (checkIsNumber(loanAmount)) {
    if (loanAmount >= 250000) return Math.round(loanAmount * 0.006 - 1318, 2);
    else if (loanAmount < 250000) throw new Error("minimum amount is 250000");
  } else throw new Error("not a number");
}
//function caculate trailing cashback
export function trailing(loanAmount) {
  if (checkIsNumber(loanAmount)) {
    if (loanAmount >= 250000)
      return Math.round(loanAmount * 0.03616027 - 3062.6, 2);
    else if (loanAmount < 250000) throw new Error("minimum amount is 250000");
  } else throw new Error("not a number");
}

export function checkIsNumber(number) {
  if (typeof number === "number") return true;
  else return false;
}
