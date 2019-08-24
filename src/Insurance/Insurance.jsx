import React, { useState } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { TextField, Grid, Container, Radio, Fab } from "@material-ui/core/";
import Slider from "../Components/Slider";
import { caculateQuote } from "./../Utils/fakeInsuranceService";
import { useFormInput } from "./../Utils/useFormInput";

const Insurance = () => {
  const income = useFormInput("");
  const dependent = useFormInput("");
  const assests = useFormInput("");
  const liabilities = useFormInput("");
  const firstName = useFormInput("");
  const surname = useFormInput("");
  const contact = useFormInput("");
  const email = useFormInput("");
  const [dateofbirth, setDob] = useState(new Date());
  const [youngestDepn, setYoungest] = useState(0);
  const [gender, setGender] = useState("");
  const [smoke, setSmoke] = useState("");
  const [partner, setPartner] = useState("");
  //check form error
  const [errors, setErrors] = useState({});
  const [radioErros, setRadioErrors] = useState({
    genderError: "",
    smokeError: "",
    partnerError: ""
  });
  const [result, setResult] = useState({});

  //function to get the quote onclick
  function getQuote() {
    return caculateQuote(
      income.value,
      dependent.value,
      assests.value,
      liabilities.value,
      getAge(dateofbirth),
      youngestDepn,
      smoke,
      partner
    );
  }

  //validate input
  function validateRequire(input) {
    if (input === "") return true;
    else return false;
  }

  //validate dependent number from 0-9
  function validateDependent(dependent) {
    if (dependent >= 0 && dependent <= 9) return true;
    else return false;
  }

  function validateYoungestDepn(youngestDepn, dependent) {
    if (
      (dependent === 0 && youngestDepn !== 0) ||
      (dependent > 0 && youngestDepn === 0)
    )
      return false;
    else return true;
  }

  //validate radio button is clicked
  async function checkRadio() {
    let genderError;
    let smokeError;
    let partnerError;
    gender ? (genderError = "") : (genderError = "* Choose your gender");
    smoke ? (smokeError = "") : (smokeError = "* Do you somke");
    partner
      ? (partnerError = "")
      : (partnerError = "* Do you have a Spouse/Partner");
    await setRadioErrors({
      genderError,
      smokeError,
      partnerError
    });
  }
  //function to check if required field is filled
  async function checkRequired() {
    let incomeError;
    let dependentError;
    let youngestDepnError;
    let assestsError;
    let liabilitiesError;
    let firstNameError;
    let surnameError;
    let contactError;
    let emailError;
    validateRequire(income.value)
      ? (incomeError = "Income is required")
      : (incomeError = "");

    if (validateRequire(dependent.value) === false) {
      validateDependent(dependent.value)
        ? (dependentError = "")
        : (dependentError = "Dependent range is 0-9");
    } else dependentError = "Dependent is required";
    validateYoungestDepn(youngestDepn, dependent.value)
      ? (youngestDepnError = "")
      : (youngestDepnError = "Please check the age");
    validateRequire(assests.value)
      ? (assestsError = "Assests is required")
      : (assestsError = "");
    validateRequire(liabilities.value)
      ? (liabilitiesError = "Liabilities is required")
      : (liabilitiesError = "");
    validateRequire(firstName.value)
      ? (firstNameError = "First name is required")
      : (firstNameError = "");
    validateRequire(surname.value)
      ? (surnameError = "Surname is required")
      : (surnameError = "");
    validateRequire(contact.value)
      ? (contactError = "Contact detail is required")
      : (contactError = "");
    validateRequire(email.value)
      ? (emailError = "Email is required")
      : (emailError = "");
    await setErrors({
      income: incomeError,
      dependent: dependentError,
      youngestDepn: youngestDepnError,
      assests: assestsError,
      liabilities: liabilitiesError,
      firstName: firstNameError,
      surname: surnameError,
      contact: contactError,
      email: emailError
    });
  }
  //check if there are any errors before submit
  function validateInput() {
    if (
      smoke &&
      partner &&
      gender &&
      income.value >= 0 &&
      dependent.value >= 0 &&
      dependent.value <= 9 &&
      youngestDepn >= 0 &&
      youngestDepn <= 25 &&
      assests.value >= 0 &&
      liabilities.value >= 0 &&
      validateYoungestDepn(youngestDepn, dependent.value) &&
      firstName.value &&
      surname.value &&
      contact.value &&
      email.value
    ) {
      return true;
    } else return false;
  }

  //function to validate the form is valide
  async function validateForm() {
    checkRequired();
    checkRadio();
  }
  function onSubmit() {
    validateForm();
    if (validateInput() === true) setResult(getQuote());
  }

  //convert date of birth to age
  function getAge(dateofbirth) {
    let diff = new Date() - dateofbirth;
    if (!isNaN(diff)) return Math.floor(diff / 31557600000);
    else return 0;
  }

  return (
    <Container className="container caculator">
      <h2>ZINQ-ULATE</h2>
      <p>
        We hate jargon, paperwork & really big words in really small print as
        much as you do. We'll give you the tools to make the right decisions for
        your self.{" "}
      </p>
      <p>
        Here's our personal insurance Zinq-ulator, if you want some solid
        numbers.
      </p>
      <Grid container className="zinq-culator">
        <Grid container xs={12} md={6} spacing={1}>
          <Grid item xs={10} md={4} spacing={1}>
            <p>Your date of birth* </p>
          </Grid>
          <Grid item xs={10} md={8} spacing={1}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                variant="inline"
                format="MM/dd/yyyy"
                margin="dense"
                value={dateofbirth}
                onChange={date => setDob(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
            <br />
          </Grid>
          <Grid item xs={10} md={4} spacing={1}>
            <p>Your gender* </p>
          </Grid>
          <Grid item xs={10} md={2} spacing={1}>
            <div style={{ marginTop: "0.5rem" }}>
              <Radio
                checked={gender === "Female"}
                onClick={() => setGender("Female")}
                color="primary"
              />
              <span>Female</span>
            </div>
          </Grid>
          <Grid item xs={10} md={2} spacing={1}>
            <div style={{ marginTop: "0.5rem" }}>
              <Radio
                checked={gender === "Male"}
                onClick={() => setGender("Male")}
                color="primary"
              />
              <span>Male</span>
            </div>
          </Grid>
          <Grid item xs={10} md={4} spacing={1}>
            {radioErros.genderError ? (
              <p className="radioCheck">{radioErros.genderError}</p>
            ) : null}
          </Grid>
          <br />
          <Grid item xs={10} md={4} spacing={1}>
            <p>Do you smoke* </p>
          </Grid>
          <Grid item xs={10} md={2} spacing={1}>
            <div style={{ marginTop: "0.5rem" }}>
              <Radio
                checked={smoke === "Yes"}
                onClick={() => setSmoke("Yes")}
                color="primary"
              />
              <span>Yes</span>
            </div>
          </Grid>
          <Grid item xs={10} md={2} spacing={1}>
            <div style={{ marginTop: "0.5rem" }}>
              <Radio
                checked={smoke === "No"}
                onClick={() => setSmoke("No")}
                color="primary"
              />
              <span>No</span>
            </div>
          </Grid>
          <Grid item xs={10} md={4} spacing={1}>
            {radioErros.smokeError ? (
              <p className="radioCheck">{radioErros.smokeError}</p>
            ) : null}
          </Grid>
          <br />
          <Grid item xs={10} md={4} spacing={1}>
            <p>Do you have a Spouse/Partner* </p>
          </Grid>
          <Grid item xs={10} md={2} spacing={1}>
            <div style={{ marginTop: "0.5rem" }}>
              <Radio
                checked={partner === "Yes"}
                onClick={() => setPartner("Yes")}
                color="primary"
              />
              <span>Yes</span>
            </div>
          </Grid>

          <Grid item xs={10} md={2} spacing={1}>
            <div style={{ marginTop: "0.5rem" }}>
              <Radio
                checked={partner === "No"}
                onClick={() => setPartner("No")}
                color="primary"
              />
              <span>No</span>
            </div>
          </Grid>
          <Grid item xs={10} md={4} spacing={1}>
            {radioErros.partnerError ? (
              <p className="radioCheck">{radioErros.partnerError}</p>
            ) : null}
          </Grid>
          <br />
          <Grid item xs={10} md={4} spacing={1}>
            <p>Your gross income* </p>
          </Grid>
          <Grid item xs={10} md={8} spacing={1}>
            <TextField
              required
              error={errors.income}
              helperText={errors.income}
              type="number"
              {...income}
              style={{ margin: 4 }}
              placeholder="Gross Income"
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <br />
          <Grid item xs={10} md={4} spacing={1}>
            <p>Number of dependent* </p>
          </Grid>
          <Grid item xs={10} md={8} spacing={1}>
            <TextField
              error={errors.dependent}
              helperText={errors.dependent}
              type="number"
              {...dependent}
              style={{ margin: 4 }}
              placeholder="Number of dependent"
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10} md={5} spacing={1}>
            <p>Age of Youngest Dependent: {youngestDepn}</p>
          </Grid>
          <Grid item xs={10} md={7} spacing={1}>
            <div className="insur-slider">
              <Slider
                value={youngestDepn}
                onChange={setYoungest}
                width={"80%"}
                min={0}
                max={25}
                step={1}
              />
              {errors.youngestDepn ? (
                <p className="radioCheck">{errors.youngestDepn}</p>
              ) : null}
            </div>
          </Grid>
          <Grid item xs={10} md={4} spacing={1}>
            <p>Your total assests* </p>
          </Grid>
          <Grid item xs={10} md={8} spacing={1}>
            <TextField
              error={errors.assests}
              helperText={errors.assests}
              type="number"
              {...assests}
              style={{ margin: 4 }}
              placeholder="Totoal Assests"
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10} md={4} spacing={1}>
            <p>Total liabilities* </p>
          </Grid>
          <Grid item xs={10} md={8} spacing={1}>
            <TextField
              error={errors.liabilities}
              helperText={errors.liabilities}
              type="number"
              {...liabilities}
              style={{ margin: 4 }}
              placeholder="Total liabilities"
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <br />
          <Grid item xs={10} md={4} spacing={1}>
            <p>Your name* </p>
          </Grid>
          <Grid item xs={10} md={4}>
            <TextField
              error={errors.firstName}
              helperText={errors.firstName}
              type="text"
              {...firstName}
              style={{ margin: 4 }}
              placeholder="Firt name"
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10} md={4}>
            <TextField
              error={errors.surname}
              helperText={errors.surname}
              type="text"
              {...surname}
              style={{ margin: 4 }}
              placeholder="Surname"
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <br />
          <Grid item xs={10} md={4} spacing={1}>
            <p>Contact* </p>
          </Grid>
          <Grid item xs={10} md={8} spacing={1}>
            <TextField
              error={errors.contact}
              helperText={errors.contact}
              type="text"
              {...contact}
              style={{ margin: 4 }}
              placeholder="Contact number"
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <br />
          <Grid item xs={10} md={4} spacing={1}>
            <p>Email* </p>
          </Grid>
          <Grid item xs={10} md={8} spacing={1}>
            <TextField
              error={errors.email}
              helperText={errors.email}
              type="email"
              {...email}
              style={{ margin: 4 }}
              placeholder="Email address"
              margin="dense"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} md={6} spacing={1}>
          {result.life_cover ? (
            <div className="result">
              <h3>
                Your life cover is:{" "}
                <span>${result.life_cover.toLocaleString()}</span>
              </h3>

              <h3>
                Your TPD cover is:{" "}
                <span>${result.tpd_cover.toLocaleString()}</span>
              </h3>

              <h3>
                Your Trauma cover is:{" "}
                <span>${result.trauma_cover.toLocaleString()}</span>
              </h3>

              <h3>
                Your IP cover is:{" "}
                <span>${result.ip_cover.toLocaleString()}</span>
              </h3>
            </div>
          ) : null}
        </Grid>
      </Grid>
      <Fab
        variant="extended"
        size="medium"
        className="quote"
        style={{
          textTransform: "none",
          backgroundColor: "#673ab7",
          color: "white",
          marginLeft: "40%",
          marginTop: "2rem",
          marginBottom: "1rem"
        }}
        onClick={onSubmit}
      >
        Get Quote
      </Fab>
    </Container>
  );
};

export default Insurance;
