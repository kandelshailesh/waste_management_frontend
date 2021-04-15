import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Input, Dropdown, Row, Col } from "antd";
import { DownOutlined } from "@ant-design/icons";
import imgOne from "../../images/logo192.png";

const { Search } = Input;
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/">
        Logout
      </a>
    </Menu.Item>
  </Menu>
);

class DashboardTopNav extends React.Component {
  render() {
    return (
      <Header
        className="site-layout-background modified-ant-layout-header"
        style={{
          width: "100%",
          height: 60,
          background: "white",
          padding: 0,
          marginBottom: 3,
        }}
      >
        <Menu
          className="remove-hover-effect"
          style={{
            width: "100%",
            margin: 0,
            padding: 0,
            height: 60,
            boxShadow: "2px 2px 5px 3px #eee",
            display: "flex",
          }}
          mode="horizontal"
        >
          <Menu.Item className="remove-ant-menu-item" key="2">
            {/* <div className="logo" /> */}
            <img className="logo-img" src={imgOne} alt="" />
          </Menu.Item>

          <Menu.Item className="rm-ant-menu-item" key="3">
            <i
              style={{ fontSize: "1.2rem" }}
              class="fa fa-bell-o"
              aria-hidden="true"
            ></i>
          </Menu.Item>

          <Menu.Item
            style={{ marginLeft: "auto" }}
            className="rm-ant-menu-item custom-logout-section"
            key="7"
          >
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Admin <DownOutlined />
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default DashboardTopNav;
