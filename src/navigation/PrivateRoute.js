import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Footer from 'pages/footer';
import Header from 'pages/header';
import { message, notification } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from '../reducers/actionCreator';
import Dashboard_Content from '../pages';
import { Row, Col } from 'antd';
import DashboardSider from '../pages/sidebar';

const PrivateRoute = props => {
  const {
    authorized,
    component: Component,
    path,
    keys,
    exact,
    history,
  } = props;
  const [scroll, setscroll] = useState(0);
  const [access, set_access] = useState(false);
  const [message, set_message] = useState('');
  const [width, setWidth] = useState(4);


  if (set_access) {
    return (
      <Route
        path={path}
        key={keys}
        exact={exact}
        render={props => {
          //
          if (authorized) {
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
          } else {
            // notification.error({
            //   message: 'Unauthorized Access',
            //   description: 'Please Login to Access the Page !',
            // });
            history.push('/login');
            // window.location.href = '/';
          }
          // } else {
          //   //
          //   notification.error({
          //     message: 'Unauthorized Access',
          //     description: 'You have no rights to access this page!',
          //   });
          //   return <Redirect to='/' />;
          // }
          // return <Redirect to="/user/login" />
          // return <Redirect to='/' />;
        }}
      />
    );
  }
};

const mapStoreToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => ({});

export default connect(mapStoreToProps, mapDispatchToProps)(PrivateRoute);
