import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Switch, Route } from "react-router-dom";
import ZinqCaculator from "./Zinqcaculator/ZinqCaculator";
import Insurance from "./Insurance/Insurance";
import CashBack from "./Cashback/Cashback";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/caculator" component={ZinqCaculator} />
        <Route path="/insurance" component={Insurance} />
        <Route path="/" component={CashBack} />
      </Switch>
    </div>
  );
}

export default App;
