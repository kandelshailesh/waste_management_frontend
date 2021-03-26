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
import { menu_list } from "./menu_list";

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
          {menu_list.map((result, i) => {
            return result.type === "menu" ? (
              <Menu.Item key={result.key} icon={result.icon}>
                <Link
                  to="#"
                  onClick={(e) => this.props.activeComponent(result.component)}
                >
                  {result.label}
                </Link>
              </Menu.Item>
            ) : (
              <SubMenu key={result.key} icon={result.icon} title={result.title}>
                {result.submenu_item.map((res, i) => {
                  return (
                    <Menu.Item key={res.key}>
                      <Link
                        to="#"
                        onClick={(e) =>
                          this.props.activeComponent(res.component)
                        }
                      >
                        {res.label}
                      </Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

export default DashboardSider;
