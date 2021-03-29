import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Footer from '../pages/footer';
import Header from '../pages/header';
import Dashboard_Content from '../pages';
import { Row, Col } from 'antd';
import DashboardSider from '../pages/sidebar';

export const PublicRoute = ({
  component: Component,
  path,
  keys,
  exact,
  header,
}) => {
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
              <Col span={3}>
                <DashboardSider />
              </Col>
              <Col span={21}>
                <Dashboard_Content>
                  <Component {...props} />
                </Dashboard_Content>
                <Footer />
              </Col>
            </Row>
          </div>
        );
      }}
    />
  );
};
