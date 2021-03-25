import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Layout, Menu, Input, Dropdown, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./dashboard-home.css";

import DashboardTopNav from "./dashboard-topnav";
import DashboardSider from "./dashboard-sider";
import DashboardFooter from "./dashboard-footer";
import PieChartOne from "./PieChartOne";
import DashboardCard from "./Card";
import AddProduct from "./addProduct";
import Orders from "./Orders";
import Category from "./Category";
import Subcategory from "./subcategory";
import Users from "./Users";
import Brand from "./Brand";

const { Search } = Input;
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class DashboardHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addProduct: true,

      activeComponent: "PieChartOne",
    };
  }

  showProduct = () => {
    this.state.ViewProduct = true;
  };

  addProduct = () => {
    this.state.addProduct = true;
  };

  activeComponent = (activeComponent) => {
    // this.state.activeComponent = { activeComponent };
    this.state.activeComponent = activeComponent;
    let s = this.state.activeComponent;
    console.log("active", s);
  };

  // {activeComponent("addProduct")}
  render() {
    let actives = this.state.activeComponent;
    let activeComponentData;

    // if (actives == "addProduct") {
    //   activeComponentData = <AddProduct />;
    // } else if ((actives = "orders")) {
    //   activeComponentData = <Orders />;
    // }

    if (actives == "addProduct") {
      activeComponentData = <AddProduct />;
    } else if (actives == "orders") {
      activeComponentData = <Orders />;
    } else if (actives == "PieChartOne") {
      activeComponentData = <PieChartOne />;
    } else if (actives == "Category") {
      activeComponentData = <Category />;
    } else if (actives == "Subcategory") {
      activeComponentData = <Subcategory />;
    } else if (actives == "users") {
      activeComponentData = <Users />;
    } else if (actives == "Brand") {
      activeComponentData = <Brand />;
    } else {
      activeComponentData = "";
    }

    // {
    //   actives == "addProduct"
    //     ? (activeComponentData = <AddProduct />)
    //     : [
    //         (actives == "orders"
    //           ? (activeComponentData == <Orders />)
    //           : (activeComponentData = "")),
    //       ];
    // }

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <DashboardTopNav />
        <Layout>
          <DashboardSider activeComponent={this.activeComponent} />
          <Layout className="site-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: "95px 25px 15px 25px",
                padding: 24,
                minHeight: 280,
              }}
            >
              {activeComponentData}
              {console.log("active component is", this.state.activeComponent)}
              {/* <Brand /> */}

              {/* <Row>
                <Col span={12}>
                  <DashboardCard
                    title={"Product sales"}
                    cardSubTitle={"1000 sales"}
                    description={"Total 40% increase"}
                  />
                </Col>
                <Col span={12}>
                  <DashboardCard
                    title={"Monthly Earnings"}
                    cardSubTitle={"1000 sales"}
                    description={"Total 40% increase"}
                  />
                </Col>
                <Col span={6}>
                  <DashboardCard
                    title={"Customers"}
                    cardSubTitle={"1000 sales"}
                    description={"Total 40% increase"}
                  />
                </Col>
                <Col span={6}>
                  <DashboardCard
                    title={"Product sales"}
                    cardSubTitle={"1000 sales"}
                    description={"Total 40% increase"}
                  />
                </Col> */}
              {/* </Row> */}
            </Content>
            <DashboardFooter />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default DashboardHome;
