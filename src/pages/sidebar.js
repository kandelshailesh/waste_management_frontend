import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Layout, Menu, Input, Dropdown, Row, Col } from 'antd';
import { menu_list } from './menu_list';

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

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        style={{}}
      >
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          style={{ height: '100vh' }}
          mode='inline'
        >
          {menu_list.map((result, i) => {
            return result.type === 'menu' ? (
              <Menu.Item key={result.key} icon={result.icon}>
                <Link to={result.path}>{result.label}</Link>
              </Menu.Item>
            ) : (
              <SubMenu key={result.key} icon={result.icon} title={result.title}>
                {result.submenu_item.map((res, i) => {
                  return (
                    <Menu.Item key={res.key}>
                      <Link to={result.path}>{res.label}</Link>
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
