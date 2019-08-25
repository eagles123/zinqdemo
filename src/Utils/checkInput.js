// util functions to check input
export function checkInput(input, errorMessage) {
  if (validateRequire(input) === true) return errorMessage;
  else return "";
}

function validateRequire(input) {
  if (input === "") return true;
  else return false;
}
