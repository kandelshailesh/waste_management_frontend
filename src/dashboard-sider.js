import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

// import "../../"
import { Layout, Menu, Input, Dropdown, Row, Col } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  DownOutlined,
  PlusOutlined,
  BarsOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import "./dashboard-home.css";

const { Search } = Input;
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class DashboardSider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        style={{ top: "62px" }}
      >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link
              to="#"
              onClick={(e) => this.props.activeComponent("PieChartOne")}
            >
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key="12" icon={<TeamOutlined />}>
            <Link to="#" onClick={(e) => this.props.activeComponent("users")}>
              Users
            </Link>
          </Menu.Item>
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="Products"> */}
          <Menu.Item key="3" icon={<CarryOutOutlined />}>
            <Link
              to="#"
              onClick={(e) => this.props.activeComponent("addProduct")}
            >
              Employee
            </Link>
          </Menu.Item>
          {/* </SubMenu> */}
          <Menu.Item key="33" icon={<BarsOutlined />}>
            <Link to="#" onClick={(e) => this.props.activeComponent("orders")}>
              Complaints
            </Link>
          </Menu.Item>
          {/* <SubMenu key="sub2" icon={<BarsOutlined />} title="Orders">
            <Menu.Item key="6">
              <Link
                to="#"
                onClick={(e) => this.props.activeComponent("orders")}
              >
                view orders
              </Link>
            </Menu.Item>
            <Menu.Item key="7">option</Menu.Item>
          </SubMenu> */}
          <SubMenu key="sub3" icon={<PlusOutlined />} title="create">
            <Menu.Item key="9">
              <Link
                to="#"
                onClick={(e) => this.props.activeComponent("Category")}
              >
                Category
              </Link>
            </Menu.Item>

            <Menu.Item key="10">
              <Link
                to="#"
                onClick={(e) => this.props.activeComponent("Subcategory")}
              >
                Subcategory
              </Link>
            </Menu.Item>

            <Menu.Item key="11">
              <Link to="#" onClick={(e) => this.props.activeComponent("Brand")}>
                Brand
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default DashboardSider;
