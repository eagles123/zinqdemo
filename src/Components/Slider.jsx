import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Loanslider = props => {
  const { width } = props;
  const { value, onChange, name } = props;

  const handleChange = value => {
    onChange(value);
  };
  return (
    <React.Fragment>
      <div className="slider">
        <Slider
          style={{ width: width }}
          dots
          dotStyle={{ borderColor: "lightgrey" }}
          activeDotStyle={{ borderColor: "#673ab7" }}
          value={value}
          //bussiness rule min $250000
          min={250000}
          //bussiness rule min $2500000
          max={2500000}
          //assume step is $1000
          step={1000}
          onChange={handleChange}
          trackStyle={{ backgroundColor: "black", height: 5 }}
          handleStyle={{
            borderColor: "#f3e5f5",
            height: 16,
            width: 16,
            backgroundColor: "#673ab7"
          }}
          railStyle={{ backgroundColor: "white", height: 20 }}
        />
      </div>
    </React.Fragment>
  );
};

export default Loanslider;
