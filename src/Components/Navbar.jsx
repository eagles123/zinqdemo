import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Tab, Tabs, Grid } from "@material-ui/core";

const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav>
        {/* navbar background color */}
        <AppBar position="static" style={{ background: "#673ab7" }}>
          <Toolbar>
            <Grid container>
              <Tabs value={2} aria-label="Nav Tabs">
                <Tab
                  value={2}
                  label="CashBack Incentive"
                  component={NavLink}
                  to="/"
                />
                <Tab
                  value={1}
                  label="Zinq Caculator"
                  component={NavLink}
                  to="/caculator"
                />
                <Tab
                  value={1}
                  label="Insurance"
                  component={NavLink}
                  to="/insurance"
                />
              </Tabs>
            </Grid>
          </Toolbar>
        </AppBar>
      </nav>
    </div>
  );
};

export default Navbar;
