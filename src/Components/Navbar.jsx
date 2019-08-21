import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Tab, Tabs, Grid } from "@material-ui/core";

const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav>
        <AppBar position="static" style={{ background: "#673ab7" }}>
          <Toolbar>
            <Grid container>
              <Tabs aria-label="Nav Tabs">
                <Tab label="CashBack Incentive" component={NavLink} to="/" />
                <Tab
                  label="Zinq Caculator"
                  component={NavLink}
                  to="/caculator"
                />
                <Tab label="Insurance" component={NavLink} to="/insurance" />
              </Tabs>
            </Grid>
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  );
};

export default Navbar;
