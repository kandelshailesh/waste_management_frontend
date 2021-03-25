import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout } from "antd";

const { Footer } = Layout;

class DashboardFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: "center" }}>
        ©2021 BOOTWAL Research and Development Pvt. Ltd.
      </Footer>
    );
  }
}
export default DashboardFooter;
