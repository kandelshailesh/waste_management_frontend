import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Layout } from 'antd';

const { Footer } = Layout;

class DashboardFooter extends Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: 'center',
          position: 'fixed',
          width: '100%',
          bottom: 0,
          marginLeft: 5,
        }}
      >
        ©2021 SHAILESH KANDEL
      </Footer>
    );
  }
}
export default DashboardFooter;
