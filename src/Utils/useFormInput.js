import React, { useState } from "react";

//customer hook to get input
export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    if (!isNaN(parseInt(e.target.value))) setValue(parseInt(e.target.value));
    else setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  };
}
