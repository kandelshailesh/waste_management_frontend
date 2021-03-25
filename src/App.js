import { render } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import DashboardHome from "./dashboard-home";

function App() {
  return (
    <Router>
      <switch>
        <Route exact path={"/"} component={DashboardHome} />
      </switch>
    </Router>
  );
}

export default App;
