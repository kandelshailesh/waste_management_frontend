import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Footer from '../pages/footer';
import Header from '../pages/header';
import Dashboard_Content from '../pages';
import { Row, Col } from 'antd';
import DashboardSider from '../pages/sidebar';
import LoginBG from '../images/login_bg.jpg';

export const PublicRoute = ({
  component: Component,
  path,
  keys,
  exact,
  header,
}) => {
  const [width, setWidth] = useState(4);
  if (path !== '/login') {
    return (
      <Route
        path={path}
        key={keys}
        exact={exact}
        render={props => {
          return (
            <div
              className='main_container'
              style={{
                width: '100%',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Row>
                <Col span={24}>
                  <Header />
                </Col>
                <Col span={width}>
                  <DashboardSider setWidth={setWidth} width={width} />
                </Col>
                <Col span={24 - width}>
                  <Dashboard_Content>
                    <Component {...props} />
                  </Dashboard_Content>
                  {/* <Footer /> */}
                </Col>
              </Row>
            </div>
          );
        }}
      />
    );
  } else {
    return (
      <Route
        path={path}
        key={keys}
        exact={exact}
        render={props => {
          return (
            <div
              className='main_container'
              style={{
                width: '100%',
                overflowX: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                backgroundImage:`url(${LoginBG})`,
                backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
backgroundPosition: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
              }}
            >
              <Component {...props} />
            </div>
          );
        }}
      />
    );
  }
};
