import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Layout } from "antd";

const { Footer } = Layout;

class DashboardFooter extends Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: "center",
          position: "fixed",
          width: "100vw",
          bottom: 0,
          background: "white",
          borderTop: "2px solid #eee",
          boxShadow: "0px -2px 5px 2px #eee",
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "sans-serif",
          marginLeft: -45,
        }}
      >
        © 2021 FOHOR MAILA
      </Footer>
    );
  }
}
export default DashboardFooter;
