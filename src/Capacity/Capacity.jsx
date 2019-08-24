import React from "react";
import { useFormInput } from "../Utils/useFormInput";
import { TextField, Grid, Container, Radio, Fab } from "@material-ui/core/";

const Capacity = () => {
  const type = useFormInput("Single");
  const dependents = useFormInput("");
  const purpose = useFormInput("Mian Residence");

  return (
    <Container className="container caculator">
      <div>
        <h2>Find out your loan capacity</h2>
        <p>
          Here's our personal loan Capacity capacity caculator, checkout how
          much you can borrow
        </p>
      </div>
    </Container>
  );
};

export default Capacity;
