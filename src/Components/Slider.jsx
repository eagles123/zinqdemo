import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Loanslider = props => {
  const { value, onChange, width, min, max, step, label } = props;

  return (
    <React.Fragment>
      <div className="slider">
        <Slider
          tipProps={{ overlayClassName: "foo" }}
          style={{ width: width }}
          dotStyle={{ borderColor: "lightgrey" }}
          activeDotStyle={{ borderColor: "#673ab7" }}
          value={value}
          //bussiness rule min $250000
          min={min}
          //bussiness rule max $2500000
          max={max}
          //assume step is $1000
          step={step}
          onChange={value => onChange(label, value)}
          trackStyle={{ backgroundColor: "#673ab7", height: 5 }}
          handleStyle={{
            borderColor: "#f3e5f5",
            height: 16,
            width: 16,
            backgroundColor: "#673ab7"
          }}
          railStyle={{ backgroundColor: "lightgrey", height: 5 }}
        />
      </div>
    </React.Fragment>
  );
};

export default Loanslider;
